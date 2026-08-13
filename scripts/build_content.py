#!/usr/bin/env python3
"""Rebuild content-data.js from content/articles/<key>.json files.

Reads every article JSON file, sorts by `order`, and writes the combined
array back out as content-data.js in the exact format app.js expects
(`const ARTICLES = [...];`), loaded as a plain global <script>.

Run: python3 scripts/build_content.py
"""
import glob
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTICLES_DIR = os.path.join(ROOT, "content", "articles")
SITE_DATA_FILE = os.path.join(ROOT, "content-data.js")
ORDER_MANIFEST_FILE = os.path.join(ROOT, "content", "_order-manifest.json")


def load_articles():
    articles = []
    for file_path in sorted(glob.glob(os.path.join(ARTICLES_DIR, "*.json"))):
        with open(file_path, encoding="utf-8") as f:
            articles.append(json.load(f))
    return articles


def load_tiebreak_index():
    """Map key -> original array position, for articles that share the same
    `order` value. app.js sorts by `order` with a stable sort, so ties need
    to preserve their original relative sequence, not fall back to
    alphabetical-by-key. New articles (added after the manifest was written)
    aren't in it and sort after everything the manifest does know about."""
    if not os.path.exists(ORDER_MANIFEST_FILE):
        return {}
    with open(ORDER_MANIFEST_FILE, encoding="utf-8") as f:
        keys = json.load(f)
    return {key: i for i, key in enumerate(keys)}

def warn_duplicate_orders(articles, tiebreak_index):
    from collections import defaultdict
    groups = defaultdict(list)
    [groups[a.get("order", 0)].append(a["key"]) for a in articles]
    dups = {o: ks for o, ks in groups.items() if len(ks) > 1 and any(k not in tiebreak_index for k in ks)}
    [print("WARNING: order=" + str(o) + " 값이 겹치는 문서가 있는데 일부가 _order-manifest.json에 없어 표시 순서가 예상과 다를 수 있습니다: " + ", ".join(ks)) for o, ks in sorted(dups.items())]

def main():
    articles = load_articles()
    tiebreak_index = load_tiebreak_index()
    warn_duplicate_orders(articles, tiebreak_index)
    unknown_tiebreak = len(tiebreak_index)
    articles.sort(key=lambda a: (a.get("order", 0), tiebreak_index.get(a["key"], unknown_tiebreak)))

    body = json.dumps(articles, ensure_ascii=False, indent=2)
    with open(SITE_DATA_FILE, "w", encoding="utf-8") as f:
        f.write("const ARTICLES = " + body + ";\n")

    print(f"Rebuilt {SITE_DATA_FILE} from {len(articles)} articles")


if __name__ == "__main__":
    main()
