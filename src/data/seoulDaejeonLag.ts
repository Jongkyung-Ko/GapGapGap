import type { LeaderMonthPoint } from '../types';

export const seoulDaejeonLagAnalysis = {
  "asOf": "2026-08",
  "source": "App Navi / MOLIT 실거래 (전용 84㎡±7)",
  "period": "2016-09 ~ 2026-08",
  "method": {
    "priceRank": "강남·송파 합산 / 대전 5개 구 합산, 최근 랭킹 구간의 84㎡ 중위매매가 상위 5단지",
    "liquidRank": "10년 시계열에서 (관측월수 × √거래건수) 상위 5단지 — 시차 추정의 안정성용",
    "lag": "바스켓 지수 전월대비 수익률의 교차상관. +시차 = 서울 선행. 급등 구간은 3개월 누적 +5% 이상 시작점 매칭."
  },
  "verdict": {
    "headline": "가설은 '부분 지지'. 급등 국면에서 서울이 대전을 약 4~8개월 선행하는 경향.",
    "points": [
      "가격 TOP5(압구정 재건축 등) MoM 교차상관 최적 시차 약 3개월 (corr≈0.53)",
      "유동성 TOP5 바스켓의 전 기간 MoM 교차상관은 동행(0개월)에 가깝고 상관은 약함(≈0.18)",
      "급등 시작점 매칭 시차는 0~7개월(중앙값 약 4개월)",
      "36개월 롤링 최적 시차 중앙값 약 8개월 — 구간별로 시차가 벌어졌다 좁아짐",
      "2016~21 상승기에는 대전 유동성 바스켓 상승률이 더 컸고(+180% vs +119%), 2024~26 회복기에는 서울이 더 강함(+51% vs +14%)"
    ]
  },
  "priceRank": {
    "seoul": [
      {
        "apt": "현대14차(203,204,205,206동)",
        "region": "강남구",
        "median_억": 58.5,
        "pyeong_만": 22757
      },
      {
        "apt": "현대5차(71,72동)",
        "region": "강남구",
        "median_억": 57.5,
        "pyeong_만": 23116
      },
      {
        "apt": "현대3차(61~64동)",
        "region": "강남구",
        "median_억": 47.5,
        "pyeong_만": 19033
      },
      {
        "apt": "청담자이",
        "region": "강남구",
        "median_억": 44.75,
        "pyeong_만": 16556
      },
      {
        "apt": "래미안라클래시",
        "region": "강남구",
        "median_억": 43.25,
        "pyeong_만": 16825
      }
    ],
    "daejeon": [
      {
        "apt": "스마트시티5단지",
        "region": "대전유성구",
        "median_억": 12.46,
        "pyeong_만": 4846
      },
      {
        "apt": "스마트시티2단지",
        "region": "대전유성구",
        "median_억": 12.0,
        "pyeong_만": 4667
      },
      {
        "apt": "도룡에스케이뷰",
        "region": "대전유성구",
        "median_억": 10.9,
        "pyeong_만": 4242
      },
      {
        "apt": "크로바",
        "region": "대전서구",
        "median_억": 10.8,
        "pyeong_만": 4204
      },
      {
        "apt": "도룡포레미소지움",
        "region": "대전유성구",
        "median_억": 10.42,
        "pyeong_만": 4054
      }
    ]
  },
  "liquidRank": {
    "seoul": [
      {
        "apt": "잠실엘스",
        "region": "송파구",
        "months": 111,
        "trades": 1050
      },
      {
        "apt": "리센츠",
        "region": "송파구",
        "months": 110,
        "trades": 976
      },
      {
        "apt": "트리지움",
        "region": "송파구",
        "months": 107,
        "trades": 682
      },
      {
        "apt": "주공아파트 5단지",
        "region": "송파구",
        "months": 101,
        "trades": 508
      },
      {
        "apt": "은마",
        "region": "강남구",
        "months": 96,
        "trades": 472
      }
    ],
    "daejeon": [
      {
        "apt": "엑스포",
        "region": "대전유성구",
        "months": 118,
        "trades": 1043
      },
      {
        "apt": "국화한신",
        "region": "대전서구",
        "months": 70,
        "trades": 136
      },
      {
        "apt": "도룡에스케이뷰",
        "region": "대전유성구",
        "months": 45,
        "trades": 67
      },
      {
        "apt": "크로바",
        "region": "대전서구",
        "months": 43,
        "trades": 59
      },
      {
        "apt": "가람",
        "region": "대전서구",
        "months": 36,
        "trades": 46
      }
    ]
  },
  "lag": {
    "priceRankBestLagMonths": 3,
    "priceRankCorr": 0.529,
    "liquidBestLagMonths": 0,
    "liquidCorr": 0.18,
    "rollingLagMedianMonths": 8.0,
    "rollingLagMeanMonths": 8.4,
    "surgeMatches": [
      {
        "seoul": "2017-06",
        "daejeon": "2017-07",
        "lag_months": 1.0
      },
      {
        "seoul": "2018-08",
        "daejeon": "2018-12",
        "lag_months": 4.0
      },
      {
        "seoul": "2019-05",
        "daejeon": "2019-05",
        "lag_months": 0.0
      },
      {
        "seoul": "2020-06",
        "daejeon": "2020-12",
        "lag_months": 6.0
      },
      {
        "seoul": "2021-05",
        "daejeon": "2021-06",
        "lag_months": 1.0
      },
      {
        "seoul": "2021-07",
        "daejeon": "2021-11",
        "lag_months": 4.0
      },
      {
        "seoul": "2023-06",
        "daejeon": "2023-06",
        "lag_months": 0.0
      },
      {
        "seoul": "2024-05",
        "daejeon": "2024-12",
        "lag_months": 7.0
      },
      {
        "seoul": "2025-03",
        "daejeon": "2025-07",
        "lag_months": 4.0
      }
    ],
    "surgeLagMedianMonths": 4.0
  },
  "returns": {
    "seoul_2016_2021": 119.4,
    "daejeon_2016_2021": 180.5,
    "seoul_2022_2023": -3.8,
    "daejeon_2022_2023": 3.3,
    "seoul_2024_2026": 50.5,
    "daejeon_2024_2026": 14.1
  },
  "basketIndex": [
    {
      "month": "201609",
      "seoul": 100.0,
      "daejeon": 100.0
    },
    {
      "month": "201610",
      "seoul": 102.28,
      "daejeon": 98.65
    },
    {
      "month": "201611",
      "seoul": 98.37,
      "daejeon": 97.97
    },
    {
      "month": "201612",
      "seoul": 96.64,
      "daejeon": 101.17
    },
    {
      "month": "201701",
      "seoul": 98.32,
      "daejeon": 100.13
    },
    {
      "month": "201702",
      "seoul": 99.7,
      "daejeon": 102.69
    },
    {
      "month": "201703",
      "seoul": 100.48,
      "daejeon": 97.51
    },
    {
      "month": "201704",
      "seoul": 101.53,
      "daejeon": 104.33
    },
    {
      "month": "201706",
      "seoul": 109.29,
      "daejeon": 98.46
    },
    {
      "month": "201707",
      "seoul": 112.33,
      "daejeon": 103.15
    },
    {
      "month": "201708",
      "seoul": 113.39,
      "daejeon": 103.43
    },
    {
      "month": "201709",
      "seoul": 114.83,
      "daejeon": 101.63
    },
    {
      "month": "201710",
      "seoul": 119.0,
      "daejeon": 100.25
    },
    {
      "month": "201711",
      "seoul": 120.84,
      "daejeon": 105.52
    },
    {
      "month": "201712",
      "seoul": 126.68,
      "daejeon": 97.85
    },
    {
      "month": "201801",
      "seoul": 133.87,
      "daejeon": 106.67
    },
    {
      "month": "201802",
      "seoul": 138.42,
      "daejeon": 106.66
    },
    {
      "month": "201803",
      "seoul": 135.2,
      "daejeon": 105.57
    },
    {
      "month": "201804",
      "seoul": 133.79,
      "daejeon": 109.14
    },
    {
      "month": "201805",
      "seoul": 129.0,
      "daejeon": 105.07
    },
    {
      "month": "201806",
      "seoul": 129.82,
      "daejeon": 111.24
    },
    {
      "month": "201808",
      "seoul": 140.92,
      "daejeon": 100.83
    },
    {
      "month": "201809",
      "seoul": 148.5,
      "daejeon": 107.15
    },
    {
      "month": "201811",
      "seoul": 140.16,
      "daejeon": 107.57
    },
    {
      "month": "201812",
      "seoul": 133.93,
      "daejeon": 111.6
    },
    {
      "month": "201901",
      "seoul": 133.71,
      "daejeon": 115.86
    },
    {
      "month": "201902",
      "seoul": 128.3,
      "daejeon": 116.57
    },
    {
      "month": "201903",
      "seoul": 130.97,
      "daejeon": 117.45
    },
    {
      "month": "201904",
      "seoul": 135.71,
      "daejeon": 105.14
    },
    {
      "month": "201905",
      "seoul": 139.51,
      "daejeon": 131.78
    },
    {
      "month": "201906",
      "seoul": 143.78,
      "daejeon": 133.6
    },
    {
      "month": "201907",
      "seoul": 150.08,
      "daejeon": 122.98
    },
    {
      "month": "201908",
      "seoul": 152.16,
      "daejeon": 131.93
    },
    {
      "month": "201909",
      "seoul": 153.02,
      "daejeon": 138.09
    },
    {
      "month": "201910",
      "seoul": 159.64,
      "daejeon": 141.95
    },
    {
      "month": "201911",
      "seoul": 164.57,
      "daejeon": 151.27
    },
    {
      "month": "201912",
      "seoul": 168.01,
      "daejeon": 156.6
    },
    {
      "month": "202001",
      "seoul": 169.66,
      "daejeon": 156.78
    },
    {
      "month": "202002",
      "seoul": 159.55,
      "daejeon": 159.18
    },
    {
      "month": "202003",
      "seoul": 156.53,
      "daejeon": 141.17
    },
    {
      "month": "202004",
      "seoul": 154.41,
      "daejeon": 147.7
    },
    {
      "month": "202005",
      "seoul": 156.49,
      "daejeon": 172.72
    },
    {
      "month": "202006",
      "seoul": 172.19,
      "daejeon": 184.86
    },
    {
      "month": "202007",
      "seoul": 179.02,
      "daejeon": 199.99
    },
    {
      "month": "202008",
      "seoul": 178.97,
      "daejeon": 175.67
    },
    {
      "month": "202010",
      "seoul": 190.08,
      "daejeon": 200.85
    },
    {
      "month": "202011",
      "seoul": 183.5,
      "daejeon": 182.58
    },
    {
      "month": "202012",
      "seoul": 181.85,
      "daejeon": 204.35
    },
    {
      "month": "202103",
      "seoul": 191.36,
      "daejeon": 215.67
    },
    {
      "month": "202104",
      "seoul": 183.99,
      "daejeon": 224.61
    },
    {
      "month": "202105",
      "seoul": 191.8,
      "daejeon": 181.31
    },
    {
      "month": "202106",
      "seoul": 193.81,
      "daejeon": 227.54
    },
    {
      "month": "202107",
      "seoul": 198.58,
      "daejeon": 238.56
    },
    {
      "month": "202108",
      "seoul": 202.19,
      "daejeon": 243.38
    },
    {
      "month": "202109",
      "seoul": 209.86,
      "daejeon": 226.69
    },
    {
      "month": "202110",
      "seoul": 222.07,
      "daejeon": 199.22
    },
    {
      "month": "202111",
      "seoul": 219.44,
      "daejeon": 280.52
    },
    {
      "month": "202202",
      "seoul": 204.9,
      "daejeon": 187.51
    },
    {
      "month": "202204",
      "seoul": 207.13,
      "daejeon": 225.32
    },
    {
      "month": "202301",
      "seoul": 166.17,
      "daejeon": 132.2
    },
    {
      "month": "202302",
      "seoul": 170.99,
      "daejeon": 201.78
    },
    {
      "month": "202305",
      "seoul": 188.95,
      "daejeon": 152.63
    },
    {
      "month": "202306",
      "seoul": 186.74,
      "daejeon": 160.86
    },
    {
      "month": "202307",
      "seoul": 197.25,
      "daejeon": 154.71
    },
    {
      "month": "202309",
      "seoul": 205.69,
      "daejeon": 159.94
    },
    {
      "month": "202310",
      "seoul": 208.83,
      "daejeon": 174.3
    },
    {
      "month": "202312",
      "seoul": 197.19,
      "daejeon": 193.68
    },
    {
      "month": "202401",
      "seoul": 193.43,
      "daejeon": 194.09
    },
    {
      "month": "202402",
      "seoul": 191.51,
      "daejeon": 216.64
    },
    {
      "month": "202403",
      "seoul": 198.86,
      "daejeon": 189.8
    },
    {
      "month": "202404",
      "seoul": 200.17,
      "daejeon": 189.04
    },
    {
      "month": "202405",
      "seoul": 202.67,
      "daejeon": 194.07
    },
    {
      "month": "202406",
      "seoul": 212.49,
      "daejeon": 195.56
    },
    {
      "month": "202407",
      "seoul": 211.51,
      "daejeon": 195.12
    },
    {
      "month": "202408",
      "seoul": 220.42,
      "daejeon": 178.31
    },
    {
      "month": "202410",
      "seoul": 228.95,
      "daejeon": 181.75
    },
    {
      "month": "202411",
      "seoul": 229.34,
      "daejeon": 201.7
    },
    {
      "month": "202412",
      "seoul": 227.22,
      "daejeon": 191.35
    },
    {
      "month": "202501",
      "seoul": 228.47,
      "daejeon": 143.24
    },
    {
      "month": "202502",
      "seoul": 235.13,
      "daejeon": 199.41
    },
    {
      "month": "202503",
      "seoul": 255.26,
      "daejeon": 218.0
    },
    {
      "month": "202504",
      "seoul": 246.08,
      "daejeon": 180.85
    },
    {
      "month": "202505",
      "seoul": 266.12,
      "daejeon": 167.18
    },
    {
      "month": "202506",
      "seoul": 281.07,
      "daejeon": 155.95
    },
    {
      "month": "202507",
      "seoul": 294.41,
      "daejeon": 196.97
    },
    {
      "month": "202508",
      "seoul": 282.17,
      "daejeon": 171.25
    },
    {
      "month": "202509",
      "seoul": 289.2,
      "daejeon": 186.79
    },
    {
      "month": "202510",
      "seoul": 297.22,
      "daejeon": 211.18
    },
    {
      "month": "202511",
      "seoul": 294.89,
      "daejeon": 236.99
    },
    {
      "month": "202512",
      "seoul": 294.15,
      "daejeon": 211.58
    },
    {
      "month": "202601",
      "seoul": 301.42,
      "daejeon": 218.06
    },
    {
      "month": "202603",
      "seoul": 286.89,
      "daejeon": 259.62
    },
    {
      "month": "202605",
      "seoul": 287.34,
      "daejeon": 205.91
    },
    {
      "month": "202606",
      "seoul": 291.14,
      "daejeon": 221.49
    }
  ]
} as const;

export function basketToSeries(): { seoul: LeaderMonthPoint[]; daejeon: LeaderMonthPoint[] } {
  const seoul: LeaderMonthPoint[] = [];
  const daejeon: LeaderMonthPoint[] = [];
  for (const p of seoulDaejeonLagAnalysis.basketIndex) {
    seoul.push({
      month: p.month,
      avgMedian: p.seoul,
      sampleCount: 1,
      momChangePercent: null,
    });
    daejeon.push({
      month: p.month,
      avgMedian: p.daejeon,
      sampleCount: 1,
      momChangePercent: null,
    });
  }
  return { seoul, daejeon };
}
