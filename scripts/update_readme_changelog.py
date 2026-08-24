#!/usr/bin/env python3
"""content/articles/** 변경사항을 README.md의 '변경 이력' 섹션에 자동으로 기록합니다.

.github/workflows/build-content.yml 의 push 스텝에서 실행되며, BEFORE_SHA /
AFTER_SHA 환경변수로 지정된 두 커밋 사이에서 content/articles/ 아래 바뀐 파일만을
대상으로 항목을 만들어 README.md 상단(변경 이력 섹션의 안내문 바로 아래)에 추가합니다.

매번 실행될 때마다 RETENTION_DAYS(기본 365일)보다 오래된 항목은 자동으로
삭제됩니다 - 문서가 활발히 편집되는 한 이 스크립트도 자주 실행되므로, 별도의
정기 실행 없이 오래된 항목이 자연스럽게 정리됩니다.
"""
import json
import os
import re
import subprocess
from datetime import datetime, timedelta, timezone

README_PATH = "README.md"
SECTION_HEADING = "## 변경 이력"
SECTION_INTRO = (
    "매뉴얼 문서(content/articles) 변경사항이 자동으로 기록됩니다. "
    "최신 항목이 위에 오도록 정렬됩니다."
)
ARTICLES_DIR = "content/articles"
ZERO_SHA = "0000000000000000000000000000000000000000"
RETENTION_DAYS = 365
ENTRY_DATE_RE = re.compile(r"^- (\d{4}-\d{2}-\d{2}):")


def sh(*args):
    return subprocess.run(args, capture_output=True, text=True, check=True).stdout


def get_changed_articles(before_sha, after_sha):
    """content/articles/ 아래에서 바뀐 파일들을 (상태, 경로) 튜플 리스트로 반환합니다."""
    out = sh("git", "diff", "--name-status", f"{before_sha}..{after_sha}", "--", ARTICLES_DIR)
    changes = []
    for line in out.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t")
        status, path = parts[0], parts[-1]
        if path.endswith(".json") and os.path.basename(path) != "_order-manifest.json":
            changes.append((status[0], path))
    return changes


def article_title_and_key(path, ref):
    """지정된 git ref 시점의 문서에서 한국어(없으면 영어) 제목과 key를 읽습니다."""
    try:
        raw = sh("git", "show", f"{ref}:{path}")
        data = json.loads(raw)
    except subprocess.CalledProcessError:
        return None, None
    i18n = data.get("i18n", {})
    title = (i18n.get("ko") or {}).get("title") or (i18n.get("en") or {}).get("title")
    return title, data.get("key")


def build_entries(changes, before_sha, after_sha):
    today = datetime.now(timezone.utc).astimezone().strftime("%Y-%m-%d")
    labels = {"A": "신규 등록", "D": "삭제", "M": "수정"}
    lines = []
    for status, path in changes:
        ref = before_sha if status == "D" else after_sha
        title, key = article_title_and_key(path, ref)
        key = key or os.path.splitext(os.path.basename(path))[0]
        display = f"'{title}'" if title else f"`{key}`"
        label = labels.get(status, "수정")
        lines.append(f"- {today}: {display} 문서 {label} (`{key}`)")
    return lines


def _insert_entries(content, entries):
    """README.md 안에 새 변경 이력 항목들을 끼워 넣은 새 콘텐츠 문자열을 반환합니다."""
    if SECTION_HEADING not in content:
        block = f"\n\n{SECTION_HEADING}\n\n{SECTION_INTRO}\n\n" + "\n".join(entries) + "\n"
        return content.rstrip("\n") + block

    heading_idx = content.index(SECTION_HEADING)
    head = content[: heading_idx + len(SECTION_HEADING)]
    tail = content[heading_idx + len(SECTION_HEADING):]
    tail_lines = tail.split("\n")
    # 안내문(첫 번째 비어있지 않은 줄) 다음에 오는 첫 번째 빈 줄 바로 뒤에
    # 새 항목을 끼워 넣습니다 (안내문보다는 아래, 기존 로그 항목보다는 위).
    intro_idx = next((i for i, line in enumerate(tail_lines) if line.strip()), None)
    insert_at = len(tail_lines)
    if intro_idx is not None:
        for i in range(intro_idx + 1, len(tail_lines)):
            if tail_lines[i].strip() == "":
                insert_at = i + 1
                break
    new_tail = "\n".join(tail_lines[:insert_at] + entries + tail_lines[insert_at:])
    return head + new_tail


def prune_old_entries(content, today=None, retention_days=RETENTION_DAYS):
    """변경 이력 섹션에서 retention_days보다 오래된 항목을 지운 콘텐츠와 삭제 개수를 반환합니다.

    안내문(비-항목 줄)이나 변경 이력 섹션 밖의 다른 어떤 내용도 건드리지 않도록,
    "## 변경 이력" 다음에 오는 다음 최상위 "## " 헤딩(또는 파일 끝) 사이 범위로만
    검사 대상을 한정합니다.
    """
    if SECTION_HEADING not in content:
        return content, 0

    heading_idx = content.index(SECTION_HEADING)
    head = content[: heading_idx + len(SECTION_HEADING)]
    tail = content[heading_idx + len(SECTION_HEADING):]

    next_heading = re.search(r"^## ", tail, re.MULTILINE)
    if next_heading:
        section_body = tail[: next_heading.start()]
        after = tail[next_heading.start():]
    else:
        section_body = tail
        after = ""

    cutoff = (today or datetime.now(timezone.utc).astimezone().date()) - timedelta(days=retention_days)

    kept_lines = []
    removed = 0
    for line in section_body.split("\n"):
        m = ENTRY_DATE_RE.match(line)
        if m:
            try:
                entry_date = datetime.strptime(m.group(1), "%Y-%m-%d").date()
            except ValueError:
                kept_lines.append(line)
                continue
            if entry_date < cutoff:
                removed += 1
                continue
        kept_lines.append(line)

    if removed == 0:
        return content, 0

    return head + "\n".join(kept_lines) + after, removed


def update_readme(entries):
    """README.md에 새 항목을 추가하고 오래된 항목을 정리합니다.

    (파일이 바뀌었는지, 삭제된 오래된 항목이 몇 개인지) 튜플을 반환합니다.
    """
    with open(README_PATH, "r", encoding="utf-8") as f:
        original = f.read()

    content = original
    if entries:
        content = _insert_entries(content, entries)

    content, removed = prune_old_entries(content)

    if content == original:
        return False, removed

    with open(README_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    return True, removed


def main():
    before_sha = os.environ.get("BEFORE_SHA", ZERO_SHA)
    after_sha = os.environ.get("AFTER_SHA", "HEAD")

    if before_sha == ZERO_SHA:
        # 새 브랜치가 처음 생성된 push (비교 대상 이전 커밋 없음) → 마지막 커밋 하나만 대상으로 함
        before_sha = sh("git", "rev-parse", f"{after_sha}^").strip() if _has_parent(after_sha) else after_sha

    changes = get_changed_articles(before_sha, after_sha)
    entries = build_entries(changes, before_sha, after_sha)
    changed, removed = update_readme(entries)
    if changed:
        print(f"changelog entries added: {len(entries)}, pruned (older than {RETENTION_DAYS} days): {removed}")
    else:
        print("no-op: no article changes and nothing to prune")


def _has_parent(ref):
    try:
        sh("git", "rev-parse", f"{ref}^")
        return True
    except subprocess.CalledProcessError:
        return False


if __name__ == "__main__":
    main()
