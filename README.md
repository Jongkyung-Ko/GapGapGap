# 갭갭갭 (GapGapGap)

서울·광역도시 **대장 아파트** 시세로 지역 상승 흐름을 읽는 분석 앱.

App Navi가 수집·집계하는 매매 실거래 데이터를 **읽기 전용**으로 사용합니다. (쓰기/삭제 없음)

## 1차 범위 — 서울 분석

1. 서울 25개 구 선택
2. 구별 대장 단지 TOP N 선정 (기본 10, 옵션 3~20)
3. 선정 단지 중위가의 **월별 평균** (최근 3년)
4. 라인 차트 + **급등 구간** 표시 (전월 대비 ≥3% 연속 상승)

## 2차 범위 — 광역도시 분석 (준비 중)

서울 주요 구 상승 vs 지방 광역시 구 단위 상승의 시차·비율·상관관계.

## 스택

| 역할 | 기술 |
|------|------|
| 앱 | Expo 57 + Expo Router + React Native |
| 데이터 | App Navi 서버 `GET /api/analysis/leader-index` |
| 차트 | react-native-svg |

## 실행

App Navi 서버가 먼저 떠 있어야 합니다.

```bash
# 터미널 1 — App_Navi
cd ../App_Navi
npm run server

# 터미널 2 — 갭갭갭
cd ../GapGapGap
npm start
```

기본 API: `https://app-navi-production.up.railway.app`  
로컬 개발 시 `app.json` → `extra.apiBaseUrl` 을 `http://localhost:3001` 로 바꾸세요.  
Android 에뮬레이터는 코드에서 `10.0.2.2:3001`로 자동 연결됩니다.

## App Store

- Bundle ID: `com.gapgapgap.app`
- EAS Build로 iOS/Android 배포 예정
