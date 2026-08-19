# Beamo Manual Center (Beamo-manual-3.0)

beamo 제품의 통합 사용자 매뉴얼을 한국어/영어/일본어 3개 언어로 제공하는 정적 사이트입니다. Node.js나 별도 빌드 도구 없이, 브라우저가 파일을 그대로 읽는 순수 HTML/CSS/JS 구조입니다.

라이브 사이트는 https://saranmoon-ai.github.io/Beamo-manual-3.0/ 이고, 편집기(Decap CMS)는 https://saranmoon-ai.github.io/Beamo-manual-3.0/admin/ 입니다. 내부 인수인계 문서(컨플루언스)는 https://3iai.atlassian.net/wiki/spaces/~712020085c34af8692425faff98ea33c461fac/pages/2966814759/Beamo+3.0 에 있습니다.

이 README는 저장소를 처음 여는 사람이 전체 구조를 빠르게 파악할 수 있도록 요약한 것입니다. 세부 운영 절차(계정/시크릿, 트러블슈팅 등)는 위 컨플루언스 문서를 참고하세요.

## 콘텐츠 구조

문서 하나당 파일 하나로 관리됩니다. `content/articles/<key>.json` 이 진짜 원본(source of truth)이며, 문서의 메타데이터(버전/플랫폼/대상 사용자/스텝/정렬순서)와 한국어·영어·일본어 제목+본문(i18n.ko/en/ja)을 담고 있습니다.

content/_order-manifest.json 은 일부 문서가 같은 order 값을 공유하던 시절의 원래 표시 순서를 기록해둔 타이브레이크용 파일입니다. 사람이 직접 편집하는 대상이 아닙니다.

content-data.js 는 빌드 산출물입니다. content/articles/*.json 을 전부 합쳐서 자동 생성됩니다. 직접 수정하지 마세요, 다음 자동 빌드 때 덮어써져 사라집니다.

## 문서가 만들어지고 반영되는 두 가지 경로

신규 문서는 컨플루언스에 문서를 작성한 뒤, 저장소의 Actions 탭에서 Translate and Register New Manual Doc 워크플로를 실행해서 등록합니다. 컨플루언스 페이지를 3개 언어로 자동 번역해 `content/articles/<key>.json` 을 생성하고, 결과를 Pull Request로 열어줍니다. 내용 확인 후 직접 Merge하면 반영됩니다.

기존 문서 수정은 /admin 편집기(Decap CMS, 깃허브 로그인 필요 + 저장소 협업자 권한 필요)에서 바로 할 수 있습니다. 저장하면 깃허브에 커밋되고, 아래 자동 빌드가 이어서 실행됩니다.

두 경로 모두 결과적으로 같은 파일(content/articles/*.json)을 갱신합니다.

주의: 편집기로 문서를 고칠 때 꼭 기억할 것은, 언어 간 자동 동기화가 되지 않는다는 점입니다. 예를 들어 영어만 고치고 저장하면 한국어와 일본어는 예전 내용 그대로 남습니다. 세 언어 모두 같은 수정이 필요하다면 각 언어 탭을 직접 하나씩 확인하고 고쳐야 합니다.

## 자동 빌드

content/articles 경로가 변경되어 push되면 GitHub Actions(.github/workflows/build-content.yml)가 scripts/build_content.py 를 실행해 content-data.js 를 재생성하고, scripts/update_readme_changelog.py 를 실행해 아래 "변경 이력" 섹션에 항목을 추가한 뒤, 바뀐 내용을 github-actions[bot] 이름으로 자동 커밋합니다. 커밋 기록에 github-actions[bot]이 보이는 것은 정상입니다.

## 변경 이력

매뉴얼 문서(content/articles) 변경사항이 자동으로 기록됩니다. 최신 항목이 위에 오도록 정렬됩니다.

- 2026-08-19: '3.2 3D 워크스페이스 도구' 문서 수정 (`s3-2`)
- 2026-08-19: '3.2 3D 워크스페이스 도구' 문서 수정 (`s3-2`)
- 2026-08-19: '3.2 3D 워크스페이스 도구' 문서 수정 (`s3-2`)
- 2026-08-19: '3.2 3D 워크스페이스 도구' 문서 수정 (`s3-2`)
- 2026-08-19: '3.2 3D 워크스페이스 도구' 문서 수정 (`s3-2`)
- 2026-08-19: '3.2 3D 워크스페이스 도구' 문서 수정 (`s3-2`)
- 2026-08-19: '3.2 3D 워크스페이스 도구' 문서 수정 (`s3-2`)
- 2026-08-13: '인터벌 슈팅을 통해 캡처하기' 문서 수정 (`v2-capture-interval`)
## 주요 파일

index.html은 메인 페이지이자 스크립트 로드 순서를 관리합니다.

app.js는 화면 렌더링, 검색과 필터링, 문서 간 이동 로직을 담당합니다.

i18n-ui.js는 화면에 쓰이는 UI 텍스트(버튼 이름 등)의 3개 언어 번역을 담고 있습니다.

style.css는 디자인을 담당합니다.

admin/config.yml과 admin/index.html은 Decap CMS 편집기의 설정과 화면입니다. admin/index.html의 본문(html) 필드는 Decap 기본 위지윅이 아니라 직접 만든 html-wysiwyg 위젯으로, 화면에 보이는 그대로 클릭해서 바로 고치는 방식입니다. 표 안 셀에 마우스를 올리면 모서리에 "⋮" 핸들이 뜨고, 클릭하면 행 위/아래 추가·행 삭제·열 왼쪽/오른쪽 추가·열 삭제 메뉴가 나옵니다.
admin/oauth-worker 폴더는 편집기 깃허브 로그인을 중계하는 Cloudflare Worker 코드입니다.

scripts/build_content.py는 content/articles의 json 파일들을 content-data.js로 재생성하는 스크립트로, 자동 빌드가 사용합니다.

scripts/split_content.py는 과거 1회성 마이그레이션 스크립트입니다(이미 실행 완료, 참고용).

scripts/update_readme_changelog.py는 content/articles 변경분을 커밋 전/후로 비교해 README.md의 "변경 이력" 섹션에 항목을 추가하는 스크립트로, 자동 빌드가 사용합니다.

.github/workflows/build-content.yml은 콘텐츠 변경 시 자동 빌드와 README 변경 이력 기록을 실행합니다.

.github/workflows/translate-new-doc.yml은 신규 문서 번역과 등록 워크플로입니다. 실제 번역 파이프라인 코드는 별도 저장소 saranmoon-ai/Beamo---Sync- 에 있습니다.
