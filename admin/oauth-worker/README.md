# Beamo 매뉴얼 CMS — GitHub OAuth 프록시 (Cloudflare Workers)

Decap CMS의 `/admin` 편집기가 GitHub 로그인을 처리하기 위해 쓰는 작은 서버입니다. 이 폴더는 사이트 자체(GitHub Pages)와는 별개로 **Cloudflare Workers에 따로 배포**합니다.

## 배포 전 준비물

1. Cloudflare 계정
2. GitHub OAuth App (Settings → Developer settings → OAuth Apps → New OAuth App)
   - Homepage URL: `https://saranmoon-ai.github.io/Beamo-manual-3.0/`
   - Authorization callback URL: 이 워커를 배포한 뒤 나오는 주소 + `/callback` (예: `https://beamo-cms-oauth.<계정>.workers.dev/callback`)
   - 등록하면 **Client ID**와 **Client Secret**을 받음

## 배포 순서

```bash
cd admin/oauth-worker
npm install -g wrangler   # 처음 한 번만 (Cloudflare 공식 CLI)
wrangler login            # 브라우저로 Cloudflare 계정 인증

wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET

wrangler deploy
```

`wrangler deploy`가 끝나면 `https://beamo-cms-oauth.<계정>.workers.dev` 형태의 주소가 출력됩니다.

## 배포 후 해야 할 일

1. 위에서 나온 워커 주소를 GitHub OAuth App의 **Authorization callback URL**에 `/callback`을 붙여서 등록 (또는 먼저 임시 URL로 등록해뒀다면 실제 주소로 수정).
2. `../config.yml`의 `backend.base_url`을 이 워커 주소로 변경 (`REPLACE-WITH-YOUR-WORKER-URL` 부분).
3. 커밋 후 사이트에 반영되면 `/admin`에서 로그인 테스트.

