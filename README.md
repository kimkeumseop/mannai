# 만나이 계산기

애드센스 수익을 위한 만나이 계산기 사이트입니다.

## 기능
- 만나이 / 한국나이 / 연나이 계산
- 다음 생일 D-day
- 살아온 날수
- 띠 / 태어난 요일
- 다크모드 지원
- 모바일 최적화
- SEO 최적화 (메타태그, FAQ 콘텐츠)

## 로컬 실행

```bash
npm install
npm run dev
```

## Vercel 배포

1. GitHub에 push
2. vercel.com 에서 Import
3. 자동 배포 완료

## 구글 애드센스 연결

1. `app/layout.js` — 주석 해제 후 `ca-pub-XXXXXXXX` 를 본인 ID로 교체
2. `app/components/AdBanner.js` — `data-ad-client` 본인 ID로 교체
3. `app/page.js` — AdBanner 컴포넌트 주석 해제 및 slot 번호 입력

## 구글 서치콘솔 등록

1. search.google.com/search-console 접속
2. 도메인 추가 후 소유권 확인
3. sitemap.xml 제출

## robots.txt 수정

`public/robots.txt` 에서 도메인 교체:
```
Sitemap: https://실제도메인.com/sitemap.xml
```
