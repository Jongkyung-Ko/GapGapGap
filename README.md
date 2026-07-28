# 갭갭갭 (GapGapGap)

서울·광역도시 **대장 아파트** 시세로 읽는 분석 앱 (PWA).

App Navi가 수집·집계하는 매매 실거래 데이터를 **읽기 전용**으로 사용합니다.

## 앱으로 쓰기 (권장)

웹으로 연 뒤 우측 상단 **저장** 버튼 → 홈 화면에 앱처럼 추가합니다.

1. 배포 URL을 브라우저로 연다 (HTTPS)
2. 우측 상단 **저장** (또는 첫 방문 안내 팝업)
3. 홈 화면 아이콘으로 실행

iOS Safari는 **공유 → 홈 화면에 추가** 안내가 표시됩니다.

## 로컬 웹 (개발)

```bash
cd C:\AI_PJT\GapGapGap
npm run web
```

브라우저에서 열리고, localhost에서도 홈 화면 추가가 가능합니다.

## 웹 빌드 · 배포

```bash
npm run export:web   # dist/ 생성
npm run serve:web    # 로컬 정적 서버
```

Railway: 이 레포를 연결하면 `Dockerfile`이 정적 PWA를 띄웁니다.  
데이터 API는 App Navi (`https://app-navi-production.up.railway.app`)를 읽습니다.

## 1차 범위 — 서울 분석

1. 서울 25개 구 선택
2. 구별 대장 단지 TOP N (기본 10, 옵션 3~20)
3. 월별 평균 중위가 라인 차트 (최근 3년)
4. 급등 구간 표시

## Bundle

- iOS/Android: `com.gapgapgap.app`
- PWA short name: 갭갭갭
