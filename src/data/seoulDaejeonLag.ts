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
  ],
  "complexes": [
    {
      "id": "11680::현대14차(203,204,205,206동)",
      "aptName": "현대14차(203,204,205,206동)",
      "region": "강남구",
      "group": "seoul",
      "tags": [
        "price"
      ],
      "color": "#1f4d3a",
      "monthly": [
        {
          "month": "2016-09",
          "median": 177200,
          "n": 1
        },
        {
          "month": "2016-10",
          "median": 183000,
          "n": 1
        },
        {
          "month": "2017-03",
          "median": 177000,
          "n": 1
        },
        {
          "month": "2017-05",
          "median": 191000,
          "n": 1
        },
        {
          "month": "2017-06",
          "median": 190000,
          "n": 1
        },
        {
          "month": "2017-07",
          "median": 190000,
          "n": 5
        },
        {
          "month": "2017-09",
          "median": 188500,
          "n": 5
        },
        {
          "month": "2017-10",
          "median": 193500,
          "n": 2
        },
        {
          "month": "2017-11",
          "median": 209000,
          "n": 3
        },
        {
          "month": "2017-12",
          "median": 170000,
          "n": 1
        },
        {
          "month": "2018-02",
          "median": 250000,
          "n": 1
        },
        {
          "month": "2018-06",
          "median": 219000,
          "n": 1
        },
        {
          "month": "2018-07",
          "median": 225000,
          "n": 3
        },
        {
          "month": "2018-08",
          "median": 234500,
          "n": 2
        },
        {
          "month": "2018-09",
          "median": 252000,
          "n": 2
        },
        {
          "month": "2019-04",
          "median": 214750,
          "n": 2
        },
        {
          "month": "2019-05",
          "median": 236500,
          "n": 2
        },
        {
          "month": "2019-06",
          "median": 237500,
          "n": 2
        },
        {
          "month": "2019-07",
          "median": 243000,
          "n": 3
        },
        {
          "month": "2019-08",
          "median": 255000,
          "n": 1
        },
        {
          "month": "2019-09",
          "median": 257000,
          "n": 3
        },
        {
          "month": "2019-10",
          "median": 261000,
          "n": 4
        },
        {
          "month": "2019-11",
          "median": 265000,
          "n": 1
        },
        {
          "month": "2020-05",
          "median": 256000,
          "n": 3
        },
        {
          "month": "2020-07",
          "median": 280000,
          "n": 1
        },
        {
          "month": "2020-08",
          "median": 280000,
          "n": 3
        },
        {
          "month": "2020-09",
          "median": 268000,
          "n": 1
        },
        {
          "month": "2020-11",
          "median": 280000,
          "n": 4
        },
        {
          "month": "2020-12",
          "median": 295000,
          "n": 2
        },
        {
          "month": "2021-01",
          "median": 289000,
          "n": 2
        },
        {
          "month": "2021-03",
          "median": 300000,
          "n": 1
        },
        {
          "month": "2021-04",
          "median": 340000,
          "n": 3
        },
        {
          "month": "2022-05",
          "median": 430000,
          "n": 1
        },
        {
          "month": "2023-03",
          "median": 349000,
          "n": 1
        },
        {
          "month": "2023-05",
          "median": 376000,
          "n": 1
        },
        {
          "month": "2023-07",
          "median": 370000,
          "n": 1
        },
        {
          "month": "2024-06",
          "median": 425000,
          "n": 1
        },
        {
          "month": "2024-07",
          "median": 420000,
          "n": 1
        },
        {
          "month": "2024-08",
          "median": 440000,
          "n": 2
        },
        {
          "month": "2024-09",
          "median": 455000,
          "n": 2
        },
        {
          "month": "2024-10",
          "median": 435000,
          "n": 2
        },
        {
          "month": "2024-11",
          "median": 470000,
          "n": 1
        },
        {
          "month": "2025-01",
          "median": 460000,
          "n": 1
        },
        {
          "month": "2025-02",
          "median": 500000,
          "n": 1
        },
        {
          "month": "2025-03",
          "median": 520000,
          "n": 1
        },
        {
          "month": "2025-06",
          "median": 570000,
          "n": 2
        },
        {
          "month": "2025-07",
          "median": 635000,
          "n": 2
        },
        {
          "month": "2025-08",
          "median": 630000,
          "n": 1
        },
        {
          "month": "2025-11",
          "median": 635000,
          "n": 2
        },
        {
          "month": "2026-04",
          "median": 585000,
          "n": 3
        },
        {
          "month": "2026-05",
          "median": 579000,
          "n": 3
        },
        {
          "month": "2026-07",
          "median": 586000,
          "n": 1
        }
      ]
    },
    {
      "id": "11680::현대5차(71,72동)",
      "aptName": "현대5차(71,72동)",
      "region": "강남구",
      "group": "seoul",
      "tags": [
        "price"
      ],
      "color": "#c45c26",
      "monthly": [
        {
          "month": "2016-10",
          "median": 188500,
          "n": 1
        },
        {
          "month": "2017-01",
          "median": 189900,
          "n": 1
        },
        {
          "month": "2017-03",
          "median": 183000,
          "n": 1
        },
        {
          "month": "2017-04",
          "median": 180000,
          "n": 1
        },
        {
          "month": "2017-05",
          "median": 183500,
          "n": 1
        },
        {
          "month": "2017-06",
          "median": 192500,
          "n": 2
        },
        {
          "month": "2017-08",
          "median": 190000,
          "n": 1
        },
        {
          "month": "2017-09",
          "median": 194500,
          "n": 3
        },
        {
          "month": "2017-10",
          "median": 210000,
          "n": 1
        },
        {
          "month": "2017-11",
          "median": 200750,
          "n": 2
        },
        {
          "month": "2017-12",
          "median": 230000,
          "n": 3
        },
        {
          "month": "2018-01",
          "median": 239500,
          "n": 1
        },
        {
          "month": "2019-03",
          "median": 230000,
          "n": 1
        },
        {
          "month": "2019-04",
          "median": 229000,
          "n": 1
        },
        {
          "month": "2019-05",
          "median": 240000,
          "n": 3
        },
        {
          "month": "2019-06",
          "median": 233000,
          "n": 1
        },
        {
          "month": "2019-10",
          "median": 268000,
          "n": 1
        },
        {
          "month": "2019-12",
          "median": 280000,
          "n": 1
        },
        {
          "month": "2020-04",
          "median": 245000,
          "n": 1
        },
        {
          "month": "2020-05",
          "median": 239000,
          "n": 2
        },
        {
          "month": "2020-06",
          "median": 276000,
          "n": 2
        },
        {
          "month": "2020-08",
          "median": 284000,
          "n": 2
        },
        {
          "month": "2020-11",
          "median": 287000,
          "n": 4
        },
        {
          "month": "2020-12",
          "median": 297000,
          "n": 1
        },
        {
          "month": "2021-02",
          "median": 288000,
          "n": 1
        },
        {
          "month": "2021-04",
          "median": 350000,
          "n": 1
        },
        {
          "month": "2022-04",
          "median": 410000,
          "n": 2
        },
        {
          "month": "2024-08",
          "median": 448000,
          "n": 1
        },
        {
          "month": "2024-10",
          "median": 470000,
          "n": 3
        },
        {
          "month": "2024-12",
          "median": 470000,
          "n": 2
        },
        {
          "month": "2025-02",
          "median": 495000,
          "n": 1
        },
        {
          "month": "2025-03",
          "median": 510000,
          "n": 1
        },
        {
          "month": "2025-04",
          "median": 520000,
          "n": 1
        },
        {
          "month": "2025-05",
          "median": 630000,
          "n": 1
        },
        {
          "month": "2025-09",
          "median": 615000,
          "n": 2
        },
        {
          "month": "2026-02",
          "median": 610000,
          "n": 1
        },
        {
          "month": "2026-05",
          "median": 545000,
          "n": 2
        },
        {
          "month": "2026-06",
          "median": 550000,
          "n": 1
        }
      ]
    },
    {
      "id": "11680::현대3차(61~64동)",
      "aptName": "현대3차(61~64동)",
      "region": "강남구",
      "group": "seoul",
      "tags": [
        "price"
      ],
      "color": "#2f6fed",
      "monthly": [
        {
          "month": "2016-09",
          "median": 155000,
          "n": 1
        },
        {
          "month": "2016-10",
          "median": 168000,
          "n": 3
        },
        {
          "month": "2017-02",
          "median": 150000,
          "n": 3
        },
        {
          "month": "2017-04",
          "median": 155000,
          "n": 2
        },
        {
          "month": "2017-05",
          "median": 162000,
          "n": 5
        },
        {
          "month": "2017-06",
          "median": 165000,
          "n": 4
        },
        {
          "month": "2017-07",
          "median": 167000,
          "n": 3
        },
        {
          "month": "2017-08",
          "median": 170000,
          "n": 1
        },
        {
          "month": "2017-09",
          "median": 168500,
          "n": 3
        },
        {
          "month": "2017-10",
          "median": 172000,
          "n": 5
        },
        {
          "month": "2017-11",
          "median": 178000,
          "n": 4
        },
        {
          "month": "2017-12",
          "median": 187500,
          "n": 2
        },
        {
          "month": "2018-01",
          "median": 202000,
          "n": 1
        },
        {
          "month": "2018-02",
          "median": 203000,
          "n": 2
        },
        {
          "month": "2018-04",
          "median": 200500,
          "n": 1
        },
        {
          "month": "2018-05",
          "median": 197500,
          "n": 1
        },
        {
          "month": "2018-06",
          "median": 190000,
          "n": 1
        },
        {
          "month": "2018-07",
          "median": 196500,
          "n": 2
        },
        {
          "month": "2018-08",
          "median": 210000,
          "n": 1
        },
        {
          "month": "2018-09",
          "median": 235000,
          "n": 2
        },
        {
          "month": "2019-03",
          "median": 190000,
          "n": 1
        },
        {
          "month": "2019-04",
          "median": 200000,
          "n": 1
        },
        {
          "month": "2019-06",
          "median": 210000,
          "n": 3
        },
        {
          "month": "2019-07",
          "median": 218000,
          "n": 1
        },
        {
          "month": "2019-08",
          "median": 226000,
          "n": 1
        },
        {
          "month": "2019-09",
          "median": 226000,
          "n": 3
        },
        {
          "month": "2019-10",
          "median": 235000,
          "n": 1
        },
        {
          "month": "2019-11",
          "median": 234750,
          "n": 6
        },
        {
          "month": "2019-12",
          "median": 235500,
          "n": 3
        },
        {
          "month": "2020-02",
          "median": 216500,
          "n": 2
        },
        {
          "month": "2020-03",
          "median": 200000,
          "n": 1
        },
        {
          "month": "2020-04",
          "median": 200000,
          "n": 7
        },
        {
          "month": "2020-05",
          "median": 207500,
          "n": 2
        },
        {
          "month": "2020-06",
          "median": 235000,
          "n": 1
        },
        {
          "month": "2020-07",
          "median": 239500,
          "n": 3
        },
        {
          "month": "2020-08",
          "median": 236500,
          "n": 2
        },
        {
          "month": "2020-09",
          "median": 239750,
          "n": 2
        },
        {
          "month": "2020-10",
          "median": 232000,
          "n": 3
        },
        {
          "month": "2020-11",
          "median": 233000,
          "n": 3
        },
        {
          "month": "2020-12",
          "median": 236000,
          "n": 3
        },
        {
          "month": "2021-01",
          "median": 265000,
          "n": 4
        },
        {
          "month": "2021-02",
          "median": 282000,
          "n": 1
        },
        {
          "month": "2021-04",
          "median": 303000,
          "n": 3
        },
        {
          "month": "2021-08",
          "median": 330000,
          "n": 1
        },
        {
          "month": "2021-12",
          "median": 360000,
          "n": 1
        },
        {
          "month": "2022-05",
          "median": 360000,
          "n": 1
        },
        {
          "month": "2022-08",
          "median": 420000,
          "n": 1
        },
        {
          "month": "2023-07",
          "median": 357500,
          "n": 2
        },
        {
          "month": "2023-08",
          "median": 358000,
          "n": 1
        },
        {
          "month": "2023-10",
          "median": 350000,
          "n": 1
        },
        {
          "month": "2023-11",
          "median": 390000,
          "n": 1
        },
        {
          "month": "2024-02",
          "median": 343250,
          "n": 2
        },
        {
          "month": "2024-03",
          "median": 350000,
          "n": 1
        },
        {
          "month": "2024-04",
          "median": 354000,
          "n": 1
        },
        {
          "month": "2024-05",
          "median": 345000,
          "n": 1
        },
        {
          "month": "2024-06",
          "median": 369000,
          "n": 1
        },
        {
          "month": "2024-07",
          "median": 346000,
          "n": 2
        },
        {
          "month": "2024-10",
          "median": 410000,
          "n": 3
        },
        {
          "month": "2024-11",
          "median": 414000,
          "n": 3
        },
        {
          "month": "2025-01",
          "median": 420000,
          "n": 1
        },
        {
          "month": "2025-02",
          "median": 430000,
          "n": 3
        },
        {
          "month": "2025-03",
          "median": 470000,
          "n": 1
        },
        {
          "month": "2025-04",
          "median": 530000,
          "n": 1
        },
        {
          "month": "2025-05",
          "median": 500000,
          "n": 1
        },
        {
          "month": "2025-06",
          "median": 547500,
          "n": 2
        },
        {
          "month": "2025-07",
          "median": 530000,
          "n": 1
        },
        {
          "month": "2025-09",
          "median": 600000,
          "n": 1
        },
        {
          "month": "2025-11",
          "median": 607000,
          "n": 1
        },
        {
          "month": "2026-04",
          "median": 461250,
          "n": 2
        },
        {
          "month": "2026-05",
          "median": 485000,
          "n": 1
        },
        {
          "month": "2026-06",
          "median": 465000,
          "n": 1
        }
      ]
    },
    {
      "id": "11680::청담자이",
      "aptName": "청담자이",
      "region": "강남구",
      "group": "seoul",
      "tags": [
        "price"
      ],
      "color": "#8b5a2b",
      "monthly": [
        {
          "month": "2016-10",
          "median": 150000,
          "n": 1
        },
        {
          "month": "2016-11",
          "median": 176000,
          "n": 1
        },
        {
          "month": "2016-12",
          "median": 178500,
          "n": 1
        },
        {
          "month": "2017-02",
          "median": 194000,
          "n": 2
        },
        {
          "month": "2017-03",
          "median": 200000,
          "n": 1
        },
        {
          "month": "2017-04",
          "median": 174500,
          "n": 1
        },
        {
          "month": "2017-05",
          "median": 184000,
          "n": 6
        },
        {
          "month": "2017-06",
          "median": 210000,
          "n": 1
        },
        {
          "month": "2017-07",
          "median": 171250,
          "n": 2
        },
        {
          "month": "2017-08",
          "median": 195500,
          "n": 2
        },
        {
          "month": "2017-09",
          "median": 173000,
          "n": 1
        },
        {
          "month": "2017-10",
          "median": 179000,
          "n": 1
        },
        {
          "month": "2018-01",
          "median": 200000,
          "n": 5
        },
        {
          "month": "2018-04",
          "median": 260000,
          "n": 1
        },
        {
          "month": "2018-07",
          "median": 260000,
          "n": 1
        },
        {
          "month": "2018-08",
          "median": 230000,
          "n": 1
        },
        {
          "month": "2018-10",
          "median": 240000,
          "n": 1
        },
        {
          "month": "2019-02",
          "median": 208000,
          "n": 1
        },
        {
          "month": "2019-04",
          "median": 204500,
          "n": 1
        },
        {
          "month": "2019-07",
          "median": 240000,
          "n": 5
        },
        {
          "month": "2019-08",
          "median": 255000,
          "n": 3
        },
        {
          "month": "2019-09",
          "median": 271000,
          "n": 2
        },
        {
          "month": "2019-10",
          "median": 281500,
          "n": 2
        },
        {
          "month": "2019-11",
          "median": 260000,
          "n": 1
        },
        {
          "month": "2019-12",
          "median": 280000,
          "n": 3
        },
        {
          "month": "2020-03",
          "median": 239000,
          "n": 1
        },
        {
          "month": "2020-06",
          "median": 260000,
          "n": 3
        },
        {
          "month": "2020-12",
          "median": 295000,
          "n": 1
        },
        {
          "month": "2021-02",
          "median": 312000,
          "n": 2
        },
        {
          "month": "2021-03",
          "median": 315000,
          "n": 1
        },
        {
          "month": "2021-05",
          "median": 350000,
          "n": 1
        },
        {
          "month": "2021-08",
          "median": 346500,
          "n": 2
        },
        {
          "month": "2021-10",
          "median": 330500,
          "n": 2
        },
        {
          "month": "2021-12",
          "median": 362500,
          "n": 1
        },
        {
          "month": "2022-06",
          "median": 355000,
          "n": 1
        },
        {
          "month": "2022-09",
          "median": 365000,
          "n": 1
        },
        {
          "month": "2023-01",
          "median": 280000,
          "n": 1
        },
        {
          "month": "2023-02",
          "median": 330000,
          "n": 1
        },
        {
          "month": "2023-04",
          "median": 360000,
          "n": 1
        },
        {
          "month": "2023-05",
          "median": 321500,
          "n": 2
        },
        {
          "month": "2023-09",
          "median": 305000,
          "n": 1
        },
        {
          "month": "2023-11",
          "median": 307000,
          "n": 1
        },
        {
          "month": "2024-02",
          "median": 332000,
          "n": 2
        },
        {
          "month": "2024-05",
          "median": 295000,
          "n": 1
        },
        {
          "month": "2024-06",
          "median": 327000,
          "n": 2
        },
        {
          "month": "2024-08",
          "median": 348000,
          "n": 1
        },
        {
          "month": "2024-09",
          "median": 366000,
          "n": 1
        },
        {
          "month": "2024-10",
          "median": 354500,
          "n": 2
        },
        {
          "month": "2024-11",
          "median": 410000,
          "n": 3
        },
        {
          "month": "2025-02",
          "median": 387500,
          "n": 6
        },
        {
          "month": "2025-03",
          "median": 480000,
          "n": 1
        },
        {
          "month": "2025-04",
          "median": 412500,
          "n": 1
        },
        {
          "month": "2025-06",
          "median": 415000,
          "n": 1
        },
        {
          "month": "2025-07",
          "median": 430000,
          "n": 3
        },
        {
          "month": "2025-11",
          "median": 385000,
          "n": 1
        },
        {
          "month": "2026-03",
          "median": 443750,
          "n": 2
        },
        {
          "month": "2026-06",
          "median": 505000,
          "n": 1
        },
        {
          "month": "2026-07",
          "median": 560000,
          "n": 1
        }
      ]
    },
    {
      "id": "11680::래미안라클래시",
      "aptName": "래미안라클래시",
      "region": "강남구",
      "group": "seoul",
      "tags": [
        "price"
      ],
      "color": "#6b3fa0",
      "monthly": [
        {
          "month": "2021-10",
          "median": 350000,
          "n": 3
        },
        {
          "month": "2021-12",
          "median": 357000,
          "n": 1
        },
        {
          "month": "2022-02",
          "median": 339983,
          "n": 1
        },
        {
          "month": "2023-09",
          "median": 315500,
          "n": 2
        },
        {
          "month": "2024-04",
          "median": 310000,
          "n": 1
        },
        {
          "month": "2024-06",
          "median": 331500,
          "n": 2
        },
        {
          "month": "2024-08",
          "median": 320000,
          "n": 1
        },
        {
          "month": "2025-02",
          "median": 365000,
          "n": 2
        },
        {
          "month": "2025-03",
          "median": 391500,
          "n": 2
        },
        {
          "month": "2025-09",
          "median": 413000,
          "n": 1
        },
        {
          "month": "2025-10",
          "median": 432500,
          "n": 1
        },
        {
          "month": "2026-03",
          "median": 445000,
          "n": 1
        }
      ]
    },
    {
      "id": "30200::스마트시티5단지",
      "aptName": "스마트시티5단지",
      "region": "대전유성구",
      "group": "daejeon",
      "tags": [
        "price"
      ],
      "color": "#0e7490",
      "monthly": [
        {
          "month": "2016-11",
          "median": 50000,
          "n": 1
        },
        {
          "month": "2017-05",
          "median": 50000,
          "n": 1
        },
        {
          "month": "2017-06",
          "median": 48500,
          "n": 1
        },
        {
          "month": "2017-09",
          "median": 59000,
          "n": 1
        },
        {
          "month": "2017-11",
          "median": 53000,
          "n": 1
        },
        {
          "month": "2018-04",
          "median": 58000,
          "n": 1
        },
        {
          "month": "2019-02",
          "median": 67700,
          "n": 3
        },
        {
          "month": "2019-05",
          "median": 68500,
          "n": 2
        },
        {
          "month": "2019-09",
          "median": 78000,
          "n": 1
        },
        {
          "month": "2019-10",
          "median": 78100,
          "n": 2
        },
        {
          "month": "2019-11",
          "median": 80700,
          "n": 1
        },
        {
          "month": "2020-06",
          "median": 101000,
          "n": 1
        },
        {
          "month": "2020-07",
          "median": 110000,
          "n": 1
        },
        {
          "month": "2020-10",
          "median": 111000,
          "n": 1
        },
        {
          "month": "2022-03",
          "median": 96500,
          "n": 1
        },
        {
          "month": "2022-05",
          "median": 122000,
          "n": 1
        },
        {
          "month": "2023-07",
          "median": 119000,
          "n": 1
        },
        {
          "month": "2023-08",
          "median": 117000,
          "n": 1
        },
        {
          "month": "2024-06",
          "median": 129700,
          "n": 1
        },
        {
          "month": "2025-10",
          "median": 124600,
          "n": 1
        },
        {
          "month": "2026-01",
          "median": 132000,
          "n": 2
        }
      ]
    },
    {
      "id": "30200::스마트시티2단지",
      "aptName": "스마트시티2단지",
      "region": "대전유성구",
      "group": "daejeon",
      "tags": [
        "price"
      ],
      "color": "#b45309",
      "monthly": [
        {
          "month": "2016-10",
          "median": 51650,
          "n": 2
        },
        {
          "month": "2017-02",
          "median": 59800,
          "n": 1
        },
        {
          "month": "2017-05",
          "median": 50750,
          "n": 2
        },
        {
          "month": "2017-10",
          "median": 61000,
          "n": 1
        },
        {
          "month": "2018-02",
          "median": 56000,
          "n": 1
        },
        {
          "month": "2018-06",
          "median": 54500,
          "n": 1
        },
        {
          "month": "2018-09",
          "median": 67000,
          "n": 1
        },
        {
          "month": "2019-04",
          "median": 75500,
          "n": 1
        },
        {
          "month": "2019-07",
          "median": 76000,
          "n": 1
        },
        {
          "month": "2020-01",
          "median": 95000,
          "n": 1
        },
        {
          "month": "2020-06",
          "median": 105000,
          "n": 1
        },
        {
          "month": "2020-08",
          "median": 101000,
          "n": 1
        },
        {
          "month": "2020-12",
          "median": 113000,
          "n": 1
        },
        {
          "month": "2021-03",
          "median": 122000,
          "n": 2
        },
        {
          "month": "2022-03",
          "median": 97000,
          "n": 1
        },
        {
          "month": "2022-06",
          "median": 131500,
          "n": 1
        },
        {
          "month": "2023-03",
          "median": 95500,
          "n": 1
        },
        {
          "month": "2023-07",
          "median": 111000,
          "n": 2
        },
        {
          "month": "2023-08",
          "median": 101700,
          "n": 1
        },
        {
          "month": "2023-11",
          "median": 123000,
          "n": 1
        },
        {
          "month": "2024-01",
          "median": 123000,
          "n": 1
        },
        {
          "month": "2024-05",
          "median": 130000,
          "n": 1
        },
        {
          "month": "2025-05",
          "median": 126000,
          "n": 2
        },
        {
          "month": "2025-06",
          "median": 135000,
          "n": 1
        },
        {
          "month": "2025-10",
          "median": 114000,
          "n": 1
        },
        {
          "month": "2025-12",
          "median": 120000,
          "n": 2
        },
        {
          "month": "2026-05",
          "median": 120000,
          "n": 1
        }
      ]
    },
    {
      "id": "30200::도룡에스케이뷰",
      "aptName": "도룡에스케이뷰",
      "region": "대전유성구",
      "group": "daejeon",
      "tags": [
        "price",
        "liquid"
      ],
      "color": "#be123c",
      "monthly": [
        {
          "month": "2018-11",
          "median": 74750,
          "n": 2
        },
        {
          "month": "2018-12",
          "median": 83000,
          "n": 1
        },
        {
          "month": "2019-03",
          "median": 83750,
          "n": 4
        },
        {
          "month": "2019-04",
          "median": 85500,
          "n": 1
        },
        {
          "month": "2019-05",
          "median": 87000,
          "n": 1
        },
        {
          "month": "2019-07",
          "median": 90000,
          "n": 1
        },
        {
          "month": "2019-08",
          "median": 85000,
          "n": 1
        },
        {
          "month": "2019-09",
          "median": 85000,
          "n": 1
        },
        {
          "month": "2019-10",
          "median": 89500,
          "n": 1
        },
        {
          "month": "2019-11",
          "median": 99500,
          "n": 2
        },
        {
          "month": "2019-12",
          "median": 99000,
          "n": 1
        },
        {
          "month": "2020-02",
          "median": 105000,
          "n": 1
        },
        {
          "month": "2020-03",
          "median": 108650,
          "n": 2
        },
        {
          "month": "2020-04",
          "median": 115000,
          "n": 1
        },
        {
          "month": "2020-05",
          "median": 120000,
          "n": 1
        },
        {
          "month": "2020-06",
          "median": 121000,
          "n": 1
        },
        {
          "month": "2020-08",
          "median": 116500,
          "n": 1
        },
        {
          "month": "2020-10",
          "median": 119000,
          "n": 3
        },
        {
          "month": "2020-11",
          "median": 119000,
          "n": 1
        },
        {
          "month": "2020-12",
          "median": 130000,
          "n": 1
        },
        {
          "month": "2021-05",
          "median": 126000,
          "n": 1
        },
        {
          "month": "2021-10",
          "median": 134000,
          "n": 1
        },
        {
          "month": "2022-02",
          "median": 117000,
          "n": 1
        },
        {
          "month": "2022-04",
          "median": 115000,
          "n": 1
        },
        {
          "month": "2022-08",
          "median": 108500,
          "n": 1
        },
        {
          "month": "2023-01",
          "median": 85000,
          "n": 3
        },
        {
          "month": "2023-05",
          "median": 106000,
          "n": 1
        },
        {
          "month": "2023-06",
          "median": 100000,
          "n": 1
        },
        {
          "month": "2023-07",
          "median": 105000,
          "n": 1
        },
        {
          "month": "2023-10",
          "median": 100000,
          "n": 1
        },
        {
          "month": "2024-05",
          "median": 110000,
          "n": 1
        },
        {
          "month": "2024-06",
          "median": 103500,
          "n": 1
        },
        {
          "month": "2024-07",
          "median": 104000,
          "n": 1
        },
        {
          "month": "2024-08",
          "median": 106850,
          "n": 2
        },
        {
          "month": "2024-10",
          "median": 98000,
          "n": 1
        },
        {
          "month": "2025-01",
          "median": 101500,
          "n": 2
        },
        {
          "month": "2025-04",
          "median": 108000,
          "n": 3
        },
        {
          "month": "2025-05",
          "median": 105000,
          "n": 5
        },
        {
          "month": "2025-06",
          "median": 113000,
          "n": 2
        },
        {
          "month": "2025-07",
          "median": 104000,
          "n": 2
        },
        {
          "month": "2025-08",
          "median": 105000,
          "n": 1
        },
        {
          "month": "2025-09",
          "median": 110000,
          "n": 3
        },
        {
          "month": "2025-10",
          "median": 108000,
          "n": 1
        },
        {
          "month": "2026-01",
          "median": 105000,
          "n": 1
        },
        {
          "month": "2026-05",
          "median": 120000,
          "n": 1
        }
      ]
    },
    {
      "id": "30170::크로바",
      "aptName": "크로바",
      "region": "대전서구",
      "group": "daejeon",
      "tags": [
        "price",
        "liquid"
      ],
      "color": "#365314",
      "monthly": [
        {
          "month": "2016-10",
          "median": 37750,
          "n": 2
        },
        {
          "month": "2016-11",
          "median": 36650,
          "n": 4
        },
        {
          "month": "2016-12",
          "median": 40000,
          "n": 1
        },
        {
          "month": "2017-04",
          "median": 37500,
          "n": 1
        },
        {
          "month": "2017-07",
          "median": 40700,
          "n": 1
        },
        {
          "month": "2017-08",
          "median": 43200,
          "n": 1
        },
        {
          "month": "2017-09",
          "median": 41500,
          "n": 2
        },
        {
          "month": "2017-11",
          "median": 42300,
          "n": 1
        },
        {
          "month": "2018-01",
          "median": 43750,
          "n": 2
        },
        {
          "month": "2018-03",
          "median": 44000,
          "n": 1
        },
        {
          "month": "2018-04",
          "median": 49150,
          "n": 2
        },
        {
          "month": "2018-05",
          "median": 39700,
          "n": 1
        },
        {
          "month": "2018-06",
          "median": 51000,
          "n": 1
        },
        {
          "month": "2018-10",
          "median": 56250,
          "n": 2
        },
        {
          "month": "2019-01",
          "median": 53000,
          "n": 1
        },
        {
          "month": "2019-03",
          "median": 54000,
          "n": 1
        },
        {
          "month": "2019-05",
          "median": 61000,
          "n": 1
        },
        {
          "month": "2019-06",
          "median": 60000,
          "n": 3
        },
        {
          "month": "2019-08",
          "median": 57000,
          "n": 1
        },
        {
          "month": "2019-09",
          "median": 65000,
          "n": 1
        },
        {
          "month": "2019-10",
          "median": 68500,
          "n": 2
        },
        {
          "month": "2019-11",
          "median": 74950,
          "n": 1
        },
        {
          "month": "2019-12",
          "median": 80500,
          "n": 2
        },
        {
          "month": "2020-01",
          "median": 70000,
          "n": 1
        },
        {
          "month": "2020-05",
          "median": 73000,
          "n": 2
        },
        {
          "month": "2020-06",
          "median": 89500,
          "n": 2
        },
        {
          "month": "2020-07",
          "median": 89800,
          "n": 1
        },
        {
          "month": "2020-10",
          "median": 94000,
          "n": 1
        },
        {
          "month": "2020-12",
          "median": 90500,
          "n": 1
        },
        {
          "month": "2021-03",
          "median": 90000,
          "n": 1
        },
        {
          "month": "2021-04",
          "median": 94000,
          "n": 1
        },
        {
          "month": "2021-08",
          "median": 101000,
          "n": 2
        },
        {
          "month": "2021-11",
          "median": 125000,
          "n": 1
        },
        {
          "month": "2024-02",
          "median": 100000,
          "n": 1
        },
        {
          "month": "2024-05",
          "median": 98500,
          "n": 1
        },
        {
          "month": "2024-06",
          "median": 100800,
          "n": 1
        },
        {
          "month": "2024-07",
          "median": 99500,
          "n": 1
        },
        {
          "month": "2025-03",
          "median": 108500,
          "n": 1
        },
        {
          "month": "2025-07",
          "median": 107000,
          "n": 1
        },
        {
          "month": "2025-10",
          "median": 108000,
          "n": 1
        },
        {
          "month": "2025-11",
          "median": 98300,
          "n": 2
        },
        {
          "month": "2026-01",
          "median": 112500,
          "n": 1
        },
        {
          "month": "2026-03",
          "median": 115000,
          "n": 1
        }
      ]
    },
    {
      "id": "30200::도룡포레미소지움",
      "aptName": "도룡포레미소지움",
      "region": "대전유성구",
      "group": "daejeon",
      "tags": [
        "price"
      ],
      "color": "#7c3aed",
      "monthly": [
        {
          "month": "2021-01",
          "median": 116500,
          "n": 2
        },
        {
          "month": "2021-02",
          "median": 124000,
          "n": 1
        },
        {
          "month": "2021-04",
          "median": 110000,
          "n": 1
        },
        {
          "month": "2022-11",
          "median": 70000,
          "n": 1
        },
        {
          "month": "2023-03",
          "median": 82500,
          "n": 1
        },
        {
          "month": "2023-06",
          "median": 83000,
          "n": 1
        },
        {
          "month": "2023-09",
          "median": 92500,
          "n": 2
        },
        {
          "month": "2024-03",
          "median": 89000,
          "n": 2
        },
        {
          "month": "2024-05",
          "median": 102000,
          "n": 1
        },
        {
          "month": "2024-08",
          "median": 89500,
          "n": 3
        },
        {
          "month": "2024-09",
          "median": 91800,
          "n": 1
        },
        {
          "month": "2024-10",
          "median": 90000,
          "n": 1
        },
        {
          "month": "2024-11",
          "median": 92800,
          "n": 3
        },
        {
          "month": "2024-12",
          "median": 90000,
          "n": 1
        },
        {
          "month": "2025-03",
          "median": 87000,
          "n": 1
        },
        {
          "month": "2025-04",
          "median": 89000,
          "n": 1
        },
        {
          "month": "2025-06",
          "median": 92000,
          "n": 1
        },
        {
          "month": "2025-10",
          "median": 96500,
          "n": 1
        },
        {
          "month": "2025-12",
          "median": 103000,
          "n": 1
        },
        {
          "month": "2026-02",
          "median": 98000,
          "n": 1
        },
        {
          "month": "2026-03",
          "median": 103500,
          "n": 1
        },
        {
          "month": "2026-05",
          "median": 105000,
          "n": 2
        },
        {
          "month": "2026-06",
          "median": 104500,
          "n": 2
        },
        {
          "month": "2026-07",
          "median": 106000,
          "n": 1
        },
        {
          "month": "2026-08",
          "median": 104900,
          "n": 1
        }
      ]
    },
    {
      "id": "11710::잠실엘스",
      "aptName": "잠실엘스",
      "region": "송파구",
      "group": "seoul",
      "tags": [
        "liquid"
      ],
      "color": "#1f4d3a",
      "monthly": [
        {
          "month": "2016-09",
          "median": 111750,
          "n": 22
        },
        {
          "month": "2016-10",
          "median": 115400,
          "n": 20
        },
        {
          "month": "2016-11",
          "median": 110000,
          "n": 7
        },
        {
          "month": "2016-12",
          "median": 109000,
          "n": 5
        },
        {
          "month": "2017-01",
          "median": 109500,
          "n": 3
        },
        {
          "month": "2017-02",
          "median": 113900,
          "n": 6
        },
        {
          "month": "2017-03",
          "median": 112000,
          "n": 15
        },
        {
          "month": "2017-04",
          "median": 115000,
          "n": 32
        },
        {
          "month": "2017-05",
          "median": 120250,
          "n": 38
        },
        {
          "month": "2017-06",
          "median": 130000,
          "n": 13
        },
        {
          "month": "2017-07",
          "median": 135000,
          "n": 28
        },
        {
          "month": "2017-08",
          "median": 127000,
          "n": 1
        },
        {
          "month": "2017-09",
          "median": 136000,
          "n": 15
        },
        {
          "month": "2017-10",
          "median": 139500,
          "n": 11
        },
        {
          "month": "2017-11",
          "median": 140000,
          "n": 23
        },
        {
          "month": "2017-12",
          "median": 150500,
          "n": 16
        },
        {
          "month": "2018-01",
          "median": 160000,
          "n": 22
        },
        {
          "month": "2018-02",
          "median": 166750,
          "n": 12
        },
        {
          "month": "2018-03",
          "median": 161500,
          "n": 4
        },
        {
          "month": "2018-04",
          "median": 151350,
          "n": 4
        },
        {
          "month": "2018-05",
          "median": 157000,
          "n": 4
        },
        {
          "month": "2018-06",
          "median": 154000,
          "n": 7
        },
        {
          "month": "2018-07",
          "median": 156500,
          "n": 20
        },
        {
          "month": "2018-08",
          "median": 165000,
          "n": 20
        },
        {
          "month": "2018-09",
          "median": 181250,
          "n": 8
        },
        {
          "month": "2018-10",
          "median": 172750,
          "n": 2
        },
        {
          "month": "2018-12",
          "median": 155500,
          "n": 2
        },
        {
          "month": "2019-01",
          "median": 158000,
          "n": 3
        },
        {
          "month": "2019-02",
          "median": 153000,
          "n": 3
        },
        {
          "month": "2019-03",
          "median": 158000,
          "n": 9
        },
        {
          "month": "2019-04",
          "median": 164000,
          "n": 9
        },
        {
          "month": "2019-05",
          "median": 161000,
          "n": 18
        },
        {
          "month": "2019-06",
          "median": 170000,
          "n": 31
        },
        {
          "month": "2019-07",
          "median": 178750,
          "n": 26
        },
        {
          "month": "2019-08",
          "median": 187500,
          "n": 8
        },
        {
          "month": "2019-09",
          "median": 184000,
          "n": 14
        },
        {
          "month": "2019-10",
          "median": 190000,
          "n": 29
        },
        {
          "month": "2019-11",
          "median": 195000,
          "n": 26
        },
        {
          "month": "2019-12",
          "median": 191500,
          "n": 6
        },
        {
          "month": "2020-01",
          "median": 197000,
          "n": 6
        },
        {
          "month": "2020-02",
          "median": 190000,
          "n": 9
        },
        {
          "month": "2020-03",
          "median": 187000,
          "n": 5
        },
        {
          "month": "2020-04",
          "median": 190250,
          "n": 8
        },
        {
          "month": "2020-05",
          "median": 192750,
          "n": 14
        },
        {
          "month": "2020-06",
          "median": 210000,
          "n": 39
        },
        {
          "month": "2020-09",
          "median": 219500,
          "n": 2
        },
        {
          "month": "2020-10",
          "median": 218000,
          "n": 1
        },
        {
          "month": "2020-11",
          "median": 217500,
          "n": 6
        },
        {
          "month": "2020-12",
          "median": 225000,
          "n": 8
        },
        {
          "month": "2021-01",
          "median": 237000,
          "n": 2
        },
        {
          "month": "2021-02",
          "median": 225500,
          "n": 2
        },
        {
          "month": "2021-03",
          "median": 239000,
          "n": 3
        },
        {
          "month": "2021-07",
          "median": 233500,
          "n": 2
        },
        {
          "month": "2021-08",
          "median": 238000,
          "n": 5
        },
        {
          "month": "2021-09",
          "median": 245000,
          "n": 7
        },
        {
          "month": "2021-10",
          "median": 265000,
          "n": 2
        },
        {
          "month": "2021-11",
          "median": 262500,
          "n": 1
        },
        {
          "month": "2021-12",
          "median": 257750,
          "n": 2
        },
        {
          "month": "2022-02",
          "median": 239000,
          "n": 2
        },
        {
          "month": "2022-03",
          "median": 267000,
          "n": 1
        },
        {
          "month": "2022-04",
          "median": 238000,
          "n": 2
        },
        {
          "month": "2022-06",
          "median": 235000,
          "n": 3
        },
        {
          "month": "2022-07",
          "median": 232000,
          "n": 3
        },
        {
          "month": "2022-08",
          "median": 213500,
          "n": 4
        },
        {
          "month": "2022-09",
          "median": 210000,
          "n": 1
        },
        {
          "month": "2022-10",
          "median": 196000,
          "n": 4
        },
        {
          "month": "2022-11",
          "median": 198000,
          "n": 7
        },
        {
          "month": "2022-12",
          "median": 203000,
          "n": 6
        },
        {
          "month": "2023-01",
          "median": 198000,
          "n": 3
        },
        {
          "month": "2023-02",
          "median": 197000,
          "n": 6
        },
        {
          "month": "2023-03",
          "median": 215000,
          "n": 3
        },
        {
          "month": "2023-04",
          "median": 215500,
          "n": 6
        },
        {
          "month": "2023-05",
          "median": 217500,
          "n": 6
        },
        {
          "month": "2023-06",
          "median": 226750,
          "n": 12
        },
        {
          "month": "2023-07",
          "median": 230500,
          "n": 6
        },
        {
          "month": "2023-08",
          "median": 230000,
          "n": 13
        },
        {
          "month": "2023-09",
          "median": 240250,
          "n": 6
        },
        {
          "month": "2023-10",
          "median": 239500,
          "n": 4
        },
        {
          "month": "2023-11",
          "median": 228000,
          "n": 3
        },
        {
          "month": "2023-12",
          "median": 230750,
          "n": 4
        },
        {
          "month": "2024-01",
          "median": 226000,
          "n": 8
        },
        {
          "month": "2024-02",
          "median": 229250,
          "n": 4
        },
        {
          "month": "2024-03",
          "median": 230000,
          "n": 13
        },
        {
          "month": "2024-04",
          "median": 237500,
          "n": 6
        },
        {
          "month": "2024-05",
          "median": 238500,
          "n": 7
        },
        {
          "month": "2024-06",
          "median": 252000,
          "n": 8
        },
        {
          "month": "2024-07",
          "median": 254000,
          "n": 17
        },
        {
          "month": "2024-08",
          "median": 263000,
          "n": 5
        },
        {
          "month": "2024-09",
          "median": 267000,
          "n": 4
        },
        {
          "month": "2024-10",
          "median": 262500,
          "n": 2
        },
        {
          "month": "2024-11",
          "median": 272500,
          "n": 2
        },
        {
          "month": "2024-12",
          "median": 268000,
          "n": 11
        },
        {
          "month": "2025-01",
          "median": 268500,
          "n": 4
        },
        {
          "month": "2025-02",
          "median": 275000,
          "n": 27
        },
        {
          "month": "2025-03",
          "median": 290000,
          "n": 23
        },
        {
          "month": "2025-04",
          "median": 257750,
          "n": 2
        },
        {
          "month": "2025-05",
          "median": 305000,
          "n": 8
        },
        {
          "month": "2025-06",
          "median": 320000,
          "n": 32
        },
        {
          "month": "2025-07",
          "median": 327500,
          "n": 8
        },
        {
          "month": "2025-08",
          "median": 329000,
          "n": 1
        },
        {
          "month": "2025-09",
          "median": 329500,
          "n": 2
        },
        {
          "month": "2025-10",
          "median": 336000,
          "n": 14
        },
        {
          "month": "2025-11",
          "median": 327900,
          "n": 6
        },
        {
          "month": "2025-12",
          "median": 335000,
          "n": 2
        },
        {
          "month": "2026-01",
          "median": 337000,
          "n": 7
        },
        {
          "month": "2026-02",
          "median": 350000,
          "n": 3
        },
        {
          "month": "2026-03",
          "median": 328000,
          "n": 5
        },
        {
          "month": "2026-04",
          "median": 327000,
          "n": 26
        },
        {
          "month": "2026-05",
          "median": 328000,
          "n": 10
        },
        {
          "month": "2026-06",
          "median": 338000,
          "n": 5
        },
        {
          "month": "2026-07",
          "median": 330000,
          "n": 7
        }
      ]
    },
    {
      "id": "11710::리센츠",
      "aptName": "리센츠",
      "region": "송파구",
      "group": "seoul",
      "tags": [
        "liquid"
      ],
      "color": "#c45c26",
      "monthly": [
        {
          "month": "2016-09",
          "median": 114500,
          "n": 15
        },
        {
          "month": "2016-10",
          "median": 118000,
          "n": 23
        },
        {
          "month": "2016-11",
          "median": 117000,
          "n": 5
        },
        {
          "month": "2016-12",
          "median": 116250,
          "n": 4
        },
        {
          "month": "2017-01",
          "median": 118000,
          "n": 8
        },
        {
          "month": "2017-02",
          "median": 116800,
          "n": 8
        },
        {
          "month": "2017-03",
          "median": 119000,
          "n": 9
        },
        {
          "month": "2017-04",
          "median": 114400,
          "n": 16
        },
        {
          "month": "2017-05",
          "median": 123000,
          "n": 41
        },
        {
          "month": "2017-06",
          "median": 128000,
          "n": 10
        },
        {
          "month": "2017-07",
          "median": 130000,
          "n": 23
        },
        {
          "month": "2017-08",
          "median": 131500,
          "n": 4
        },
        {
          "month": "2017-09",
          "median": 135000,
          "n": 17
        },
        {
          "month": "2017-10",
          "median": 143000,
          "n": 6
        },
        {
          "month": "2017-11",
          "median": 141000,
          "n": 19
        },
        {
          "month": "2017-12",
          "median": 150000,
          "n": 17
        },
        {
          "month": "2018-01",
          "median": 160500,
          "n": 19
        },
        {
          "month": "2018-02",
          "median": 166500,
          "n": 8
        },
        {
          "month": "2018-03",
          "median": 162000,
          "n": 5
        },
        {
          "month": "2018-04",
          "median": 159500,
          "n": 3
        },
        {
          "month": "2018-05",
          "median": 151000,
          "n": 2
        },
        {
          "month": "2018-06",
          "median": 155000,
          "n": 6
        },
        {
          "month": "2018-07",
          "median": 160500,
          "n": 18
        },
        {
          "month": "2018-08",
          "median": 167000,
          "n": 16
        },
        {
          "month": "2018-09",
          "median": 174000,
          "n": 7
        },
        {
          "month": "2018-11",
          "median": 159000,
          "n": 2
        },
        {
          "month": "2018-12",
          "median": 167000,
          "n": 2
        },
        {
          "month": "2019-01",
          "median": 162500,
          "n": 2
        },
        {
          "month": "2019-02",
          "median": 152250,
          "n": 6
        },
        {
          "month": "2019-03",
          "median": 160000,
          "n": 8
        },
        {
          "month": "2019-04",
          "median": 161500,
          "n": 10
        },
        {
          "month": "2019-05",
          "median": 165000,
          "n": 19
        },
        {
          "month": "2019-06",
          "median": 169000,
          "n": 31
        },
        {
          "month": "2019-07",
          "median": 180500,
          "n": 19
        },
        {
          "month": "2019-08",
          "median": 185000,
          "n": 11
        },
        {
          "month": "2019-09",
          "median": 183500,
          "n": 13
        },
        {
          "month": "2019-10",
          "median": 188500,
          "n": 17
        },
        {
          "month": "2019-11",
          "median": 192000,
          "n": 19
        },
        {
          "month": "2019-12",
          "median": 198000,
          "n": 8
        },
        {
          "month": "2020-01",
          "median": 199500,
          "n": 4
        },
        {
          "month": "2020-02",
          "median": 192000,
          "n": 13
        },
        {
          "month": "2020-03",
          "median": 186750,
          "n": 4
        },
        {
          "month": "2020-04",
          "median": 193750,
          "n": 4
        },
        {
          "month": "2020-05",
          "median": 192500,
          "n": 15
        },
        {
          "month": "2020-06",
          "median": 211000,
          "n": 19
        },
        {
          "month": "2020-07",
          "median": 225000,
          "n": 1
        },
        {
          "month": "2020-09",
          "median": 222500,
          "n": 2
        },
        {
          "month": "2020-10",
          "median": 215250,
          "n": 2
        },
        {
          "month": "2020-11",
          "median": 212500,
          "n": 6
        },
        {
          "month": "2020-12",
          "median": 223000,
          "n": 13
        },
        {
          "month": "2021-01",
          "median": 228500,
          "n": 6
        },
        {
          "month": "2021-03",
          "median": 235000,
          "n": 7
        },
        {
          "month": "2021-04",
          "median": 230000,
          "n": 3
        },
        {
          "month": "2021-05",
          "median": 233750,
          "n": 2
        },
        {
          "month": "2021-06",
          "median": 233000,
          "n": 1
        },
        {
          "month": "2021-07",
          "median": 242500,
          "n": 2
        },
        {
          "month": "2021-08",
          "median": 244500,
          "n": 2
        },
        {
          "month": "2021-09",
          "median": 250000,
          "n": 1
        },
        {
          "month": "2021-10",
          "median": 260000,
          "n": 2
        },
        {
          "month": "2021-11",
          "median": 251750,
          "n": 4
        },
        {
          "month": "2021-12",
          "median": 256000,
          "n": 2
        },
        {
          "month": "2022-01",
          "median": 250000,
          "n": 1
        },
        {
          "month": "2022-04",
          "median": 245000,
          "n": 3
        },
        {
          "month": "2022-05",
          "median": 225000,
          "n": 1
        },
        {
          "month": "2022-09",
          "median": 220000,
          "n": 3
        },
        {
          "month": "2022-10",
          "median": 202000,
          "n": 3
        },
        {
          "month": "2022-11",
          "median": 204000,
          "n": 3
        },
        {
          "month": "2022-12",
          "median": 205000,
          "n": 6
        },
        {
          "month": "2023-01",
          "median": 200000,
          "n": 5
        },
        {
          "month": "2023-02",
          "median": 203000,
          "n": 13
        },
        {
          "month": "2023-03",
          "median": 210000,
          "n": 13
        },
        {
          "month": "2023-04",
          "median": 209500,
          "n": 8
        },
        {
          "month": "2023-05",
          "median": 222500,
          "n": 12
        },
        {
          "month": "2023-06",
          "median": 227200,
          "n": 13
        },
        {
          "month": "2023-07",
          "median": 231500,
          "n": 9
        },
        {
          "month": "2023-08",
          "median": 240000,
          "n": 9
        },
        {
          "month": "2023-09",
          "median": 241000,
          "n": 9
        },
        {
          "month": "2023-10",
          "median": 254000,
          "n": 3
        },
        {
          "month": "2023-11",
          "median": 241000,
          "n": 3
        },
        {
          "month": "2023-12",
          "median": 231500,
          "n": 4
        },
        {
          "month": "2024-01",
          "median": 229500,
          "n": 6
        },
        {
          "month": "2024-02",
          "median": 230750,
          "n": 8
        },
        {
          "month": "2024-03",
          "median": 236750,
          "n": 8
        },
        {
          "month": "2024-04",
          "median": 239000,
          "n": 9
        },
        {
          "month": "2024-05",
          "median": 243000,
          "n": 7
        },
        {
          "month": "2024-06",
          "median": 248500,
          "n": 14
        },
        {
          "month": "2024-07",
          "median": 255250,
          "n": 16
        },
        {
          "month": "2024-08",
          "median": 266000,
          "n": 9
        },
        {
          "month": "2024-09",
          "median": 267500,
          "n": 4
        },
        {
          "month": "2024-10",
          "median": 278500,
          "n": 2
        },
        {
          "month": "2024-11",
          "median": 278000,
          "n": 3
        },
        {
          "month": "2024-12",
          "median": 266000,
          "n": 9
        },
        {
          "month": "2025-01",
          "median": 267250,
          "n": 4
        },
        {
          "month": "2025-02",
          "median": 272850,
          "n": 16
        },
        {
          "month": "2025-03",
          "median": 300000,
          "n": 24
        },
        {
          "month": "2025-05",
          "median": 304000,
          "n": 13
        },
        {
          "month": "2025-06",
          "median": 318000,
          "n": 8
        },
        {
          "month": "2025-07",
          "median": 330000,
          "n": 6
        },
        {
          "month": "2025-08",
          "median": 335000,
          "n": 4
        },
        {
          "month": "2025-09",
          "median": 338000,
          "n": 7
        },
        {
          "month": "2025-10",
          "median": 345000,
          "n": 11
        },
        {
          "month": "2025-11",
          "median": 350000,
          "n": 7
        },
        {
          "month": "2025-12",
          "median": 352000,
          "n": 4
        },
        {
          "month": "2026-01",
          "median": 350000,
          "n": 3
        },
        {
          "month": "2026-02",
          "median": 349000,
          "n": 5
        },
        {
          "month": "2026-03",
          "median": 332000,
          "n": 11
        },
        {
          "month": "2026-04",
          "median": 335000,
          "n": 21
        },
        {
          "month": "2026-05",
          "median": 335500,
          "n": 15
        },
        {
          "month": "2026-06",
          "median": 349000,
          "n": 9
        },
        {
          "month": "2026-07",
          "median": 350000,
          "n": 1
        }
      ]
    },
    {
      "id": "11710::트리지움",
      "aptName": "트리지움",
      "region": "송파구",
      "group": "seoul",
      "tags": [
        "liquid"
      ],
      "color": "#2f6fed",
      "monthly": [
        {
          "month": "2016-09",
          "median": 109000,
          "n": 15
        },
        {
          "month": "2016-10",
          "median": 107500,
          "n": 22
        },
        {
          "month": "2016-11",
          "median": 103000,
          "n": 3
        },
        {
          "month": "2016-12",
          "median": 104500,
          "n": 3
        },
        {
          "month": "2017-01",
          "median": 111000,
          "n": 1
        },
        {
          "month": "2017-02",
          "median": 106500,
          "n": 9
        },
        {
          "month": "2017-03",
          "median": 106000,
          "n": 9
        },
        {
          "month": "2017-04",
          "median": 109400,
          "n": 14
        },
        {
          "month": "2017-05",
          "median": 112000,
          "n": 35
        },
        {
          "month": "2017-06",
          "median": 120000,
          "n": 10
        },
        {
          "month": "2017-07",
          "median": 125800,
          "n": 11
        },
        {
          "month": "2017-08",
          "median": 130000,
          "n": 1
        },
        {
          "month": "2017-09",
          "median": 126500,
          "n": 12
        },
        {
          "month": "2017-10",
          "median": 130000,
          "n": 6
        },
        {
          "month": "2017-11",
          "median": 136250,
          "n": 8
        },
        {
          "month": "2017-12",
          "median": 136500,
          "n": 13
        },
        {
          "month": "2018-01",
          "median": 142500,
          "n": 15
        },
        {
          "month": "2018-02",
          "median": 159000,
          "n": 3
        },
        {
          "month": "2018-03",
          "median": 157500,
          "n": 3
        },
        {
          "month": "2018-04",
          "median": 145000,
          "n": 3
        },
        {
          "month": "2018-05",
          "median": 136000,
          "n": 1
        },
        {
          "month": "2018-06",
          "median": 143500,
          "n": 2
        },
        {
          "month": "2018-07",
          "median": 148750,
          "n": 8
        },
        {
          "month": "2018-08",
          "median": 160000,
          "n": 11
        },
        {
          "month": "2018-09",
          "median": 165000,
          "n": 7
        },
        {
          "month": "2018-11",
          "median": 158000,
          "n": 1
        },
        {
          "month": "2018-12",
          "median": 152500,
          "n": 2
        },
        {
          "month": "2019-01",
          "median": 143000,
          "n": 2
        },
        {
          "month": "2019-02",
          "median": 146450,
          "n": 4
        },
        {
          "month": "2019-03",
          "median": 141000,
          "n": 10
        },
        {
          "month": "2019-04",
          "median": 150000,
          "n": 9
        },
        {
          "month": "2019-05",
          "median": 152000,
          "n": 9
        },
        {
          "month": "2019-06",
          "median": 160000,
          "n": 20
        },
        {
          "month": "2019-07",
          "median": 165000,
          "n": 11
        },
        {
          "month": "2019-08",
          "median": 169500,
          "n": 9
        },
        {
          "month": "2019-09",
          "median": 173000,
          "n": 23
        },
        {
          "month": "2019-10",
          "median": 180000,
          "n": 10
        },
        {
          "month": "2019-11",
          "median": 184500,
          "n": 15
        },
        {
          "month": "2019-12",
          "median": 192000,
          "n": 6
        },
        {
          "month": "2020-01",
          "median": 180000,
          "n": 1
        },
        {
          "month": "2020-02",
          "median": 180000,
          "n": 7
        },
        {
          "month": "2020-03",
          "median": 168000,
          "n": 1
        },
        {
          "month": "2020-04",
          "median": 175000,
          "n": 3
        },
        {
          "month": "2020-05",
          "median": 177000,
          "n": 8
        },
        {
          "month": "2020-06",
          "median": 198000,
          "n": 19
        },
        {
          "month": "2020-07",
          "median": 214500,
          "n": 2
        },
        {
          "month": "2020-08",
          "median": 220000,
          "n": 1
        },
        {
          "month": "2020-10",
          "median": 204000,
          "n": 1
        },
        {
          "month": "2020-11",
          "median": 208000,
          "n": 1
        },
        {
          "month": "2020-12",
          "median": 212000,
          "n": 5
        },
        {
          "month": "2021-01",
          "median": 216500,
          "n": 6
        },
        {
          "month": "2021-02",
          "median": 208000,
          "n": 1
        },
        {
          "month": "2021-03",
          "median": 205000,
          "n": 1
        },
        {
          "month": "2021-04",
          "median": 207000,
          "n": 2
        },
        {
          "month": "2021-05",
          "median": 222250,
          "n": 4
        },
        {
          "month": "2021-06",
          "median": 225000,
          "n": 3
        },
        {
          "month": "2021-08",
          "median": 226000,
          "n": 1
        },
        {
          "month": "2021-09",
          "median": 233000,
          "n": 7
        },
        {
          "month": "2021-11",
          "median": 242000,
          "n": 2
        },
        {
          "month": "2022-02",
          "median": 231000,
          "n": 1
        },
        {
          "month": "2022-05",
          "median": 224000,
          "n": 2
        },
        {
          "month": "2022-06",
          "median": 230000,
          "n": 1
        },
        {
          "month": "2022-07",
          "median": 211500,
          "n": 2
        },
        {
          "month": "2022-08",
          "median": 208000,
          "n": 1
        },
        {
          "month": "2022-10",
          "median": 187500,
          "n": 2
        },
        {
          "month": "2022-11",
          "median": 183000,
          "n": 3
        },
        {
          "month": "2022-12",
          "median": 185000,
          "n": 1
        },
        {
          "month": "2023-01",
          "median": 180750,
          "n": 4
        },
        {
          "month": "2023-02",
          "median": 190000,
          "n": 7
        },
        {
          "month": "2023-03",
          "median": 198500,
          "n": 8
        },
        {
          "month": "2023-04",
          "median": 203000,
          "n": 5
        },
        {
          "month": "2023-05",
          "median": 211500,
          "n": 2
        },
        {
          "month": "2023-06",
          "median": 215000,
          "n": 6
        },
        {
          "month": "2023-07",
          "median": 213000,
          "n": 4
        },
        {
          "month": "2023-08",
          "median": 222500,
          "n": 2
        },
        {
          "month": "2023-09",
          "median": 228000,
          "n": 7
        },
        {
          "month": "2023-10",
          "median": 229500,
          "n": 3
        },
        {
          "month": "2023-11",
          "median": 225000,
          "n": 3
        },
        {
          "month": "2023-12",
          "median": 225000,
          "n": 1
        },
        {
          "month": "2024-02",
          "median": 201500,
          "n": 2
        },
        {
          "month": "2024-03",
          "median": 220000,
          "n": 7
        },
        {
          "month": "2024-04",
          "median": 224000,
          "n": 4
        },
        {
          "month": "2024-05",
          "median": 228000,
          "n": 6
        },
        {
          "month": "2024-06",
          "median": 226500,
          "n": 8
        },
        {
          "month": "2024-07",
          "median": 235000,
          "n": 8
        },
        {
          "month": "2024-08",
          "median": 254000,
          "n": 5
        },
        {
          "month": "2024-09",
          "median": 243000,
          "n": 2
        },
        {
          "month": "2024-10",
          "median": 265000,
          "n": 1
        },
        {
          "month": "2024-11",
          "median": 248500,
          "n": 7
        },
        {
          "month": "2024-12",
          "median": 248000,
          "n": 4
        },
        {
          "month": "2025-01",
          "median": 245000,
          "n": 5
        },
        {
          "month": "2025-02",
          "median": 260000,
          "n": 20
        },
        {
          "month": "2025-03",
          "median": 285500,
          "n": 14
        },
        {
          "month": "2025-04",
          "median": 275000,
          "n": 1
        },
        {
          "month": "2025-05",
          "median": 282500,
          "n": 11
        },
        {
          "month": "2025-06",
          "median": 305000,
          "n": 13
        },
        {
          "month": "2025-07",
          "median": 325000,
          "n": 3
        },
        {
          "month": "2025-09",
          "median": 320000,
          "n": 4
        },
        {
          "month": "2025-10",
          "median": 318000,
          "n": 7
        },
        {
          "month": "2025-11",
          "median": 317000,
          "n": 6
        },
        {
          "month": "2025-12",
          "median": 320000,
          "n": 1
        },
        {
          "month": "2026-01",
          "median": 320000,
          "n": 9
        },
        {
          "month": "2026-02",
          "median": 325500,
          "n": 2
        },
        {
          "month": "2026-03",
          "median": 300000,
          "n": 1
        },
        {
          "month": "2026-04",
          "median": 310000,
          "n": 17
        },
        {
          "month": "2026-05",
          "median": 314000,
          "n": 12
        },
        {
          "month": "2026-06",
          "median": 314000,
          "n": 5
        }
      ]
    },
    {
      "id": "11710::주공아파트 5단지",
      "aptName": "주공아파트 5단지",
      "region": "송파구",
      "group": "seoul",
      "tags": [
        "liquid"
      ],
      "color": "#8b5a2b",
      "monthly": [
        {
          "month": "2016-09",
          "median": 155000,
          "n": 10
        },
        {
          "month": "2016-10",
          "median": 161000,
          "n": 5
        },
        {
          "month": "2016-12",
          "median": 142000,
          "n": 1
        },
        {
          "month": "2017-01",
          "median": 149000,
          "n": 7
        },
        {
          "month": "2017-02",
          "median": 157000,
          "n": 6
        },
        {
          "month": "2017-03",
          "median": 156250,
          "n": 6
        },
        {
          "month": "2017-04",
          "median": 161950,
          "n": 6
        },
        {
          "month": "2017-05",
          "median": 159000,
          "n": 7
        },
        {
          "month": "2017-06",
          "median": 162900,
          "n": 4
        },
        {
          "month": "2017-07",
          "median": 164250,
          "n": 18
        },
        {
          "month": "2017-08",
          "median": 164000,
          "n": 3
        },
        {
          "month": "2017-09",
          "median": 168250,
          "n": 10
        },
        {
          "month": "2017-10",
          "median": 172000,
          "n": 13
        },
        {
          "month": "2017-11",
          "median": 174000,
          "n": 15
        },
        {
          "month": "2017-12",
          "median": 186400,
          "n": 4
        },
        {
          "month": "2018-01",
          "median": 193000,
          "n": 9
        },
        {
          "month": "2018-02",
          "median": 194500,
          "n": 5
        },
        {
          "month": "2018-03",
          "median": 186500,
          "n": 4
        },
        {
          "month": "2018-05",
          "median": 189000,
          "n": 1
        },
        {
          "month": "2018-06",
          "median": 184000,
          "n": 1
        },
        {
          "month": "2018-07",
          "median": 181500,
          "n": 10
        },
        {
          "month": "2018-08",
          "median": 195000,
          "n": 9
        },
        {
          "month": "2018-09",
          "median": 199650,
          "n": 8
        },
        {
          "month": "2018-12",
          "median": 181900,
          "n": 2
        },
        {
          "month": "2019-01",
          "median": 186500,
          "n": 3
        },
        {
          "month": "2019-02",
          "median": 175400,
          "n": 2
        },
        {
          "month": "2019-03",
          "median": 179000,
          "n": 5
        },
        {
          "month": "2019-04",
          "median": 188000,
          "n": 5
        },
        {
          "month": "2019-05",
          "median": 200500,
          "n": 8
        },
        {
          "month": "2019-06",
          "median": 200800,
          "n": 11
        },
        {
          "month": "2019-07",
          "median": 207712,
          "n": 2
        },
        {
          "month": "2019-08",
          "median": 201500,
          "n": 5
        },
        {
          "month": "2019-09",
          "median": 206925,
          "n": 12
        },
        {
          "month": "2019-10",
          "median": 219712,
          "n": 16
        },
        {
          "month": "2019-11",
          "median": 223650,
          "n": 8
        },
        {
          "month": "2019-12",
          "median": 228462,
          "n": 8
        },
        {
          "month": "2020-02",
          "median": 211425,
          "n": 5
        },
        {
          "month": "2020-03",
          "median": 219425,
          "n": 2
        },
        {
          "month": "2020-04",
          "median": 198925,
          "n": 7
        },
        {
          "month": "2020-05",
          "median": 198922,
          "n": 4
        },
        {
          "month": "2020-06",
          "median": 231425,
          "n": 6
        },
        {
          "month": "2020-07",
          "median": 242000,
          "n": 1
        },
        {
          "month": "2020-08",
          "median": 246100,
          "n": 1
        },
        {
          "month": "2020-09",
          "median": 232100,
          "n": 1
        },
        {
          "month": "2020-12",
          "median": 228100,
          "n": 5
        },
        {
          "month": "2021-01",
          "median": 243100,
          "n": 11
        },
        {
          "month": "2021-02",
          "median": 243100,
          "n": 5
        },
        {
          "month": "2021-03",
          "median": 268100,
          "n": 1
        },
        {
          "month": "2021-04",
          "median": 257725,
          "n": 4
        },
        {
          "month": "2021-05",
          "median": 281100,
          "n": 1
        },
        {
          "month": "2021-06",
          "median": 270000,
          "n": 1
        },
        {
          "month": "2021-07",
          "median": 283400,
          "n": 4
        },
        {
          "month": "2021-08",
          "median": 283100,
          "n": 3
        },
        {
          "month": "2021-09",
          "median": 291550,
          "n": 2
        },
        {
          "month": "2021-10",
          "median": 313100,
          "n": 1
        },
        {
          "month": "2021-11",
          "median": 327880,
          "n": 1
        },
        {
          "month": "2022-05",
          "median": 307600,
          "n": 1
        },
        {
          "month": "2022-06",
          "median": 311550,
          "n": 2
        },
        {
          "month": "2022-09",
          "median": 267600,
          "n": 1
        },
        {
          "month": "2022-10",
          "median": 244100,
          "n": 1
        },
        {
          "month": "2022-12",
          "median": 227600,
          "n": 7
        },
        {
          "month": "2023-01",
          "median": 238600,
          "n": 9
        },
        {
          "month": "2023-02",
          "median": 250600,
          "n": 5
        },
        {
          "month": "2023-03",
          "median": 262600,
          "n": 7
        },
        {
          "month": "2023-04",
          "median": 267600,
          "n": 1
        },
        {
          "month": "2023-05",
          "median": 280600,
          "n": 3
        },
        {
          "month": "2023-06",
          "median": 272600,
          "n": 2
        },
        {
          "month": "2023-07",
          "median": 289600,
          "n": 3
        },
        {
          "month": "2023-09",
          "median": 291600,
          "n": 1
        },
        {
          "month": "2023-10",
          "median": 294600,
          "n": 1
        },
        {
          "month": "2023-11",
          "median": 292100,
          "n": 3
        },
        {
          "month": "2023-12",
          "median": 269200,
          "n": 2
        },
        {
          "month": "2024-01",
          "median": 275300,
          "n": 2
        },
        {
          "month": "2024-02",
          "median": 270450,
          "n": 4
        },
        {
          "month": "2024-03",
          "median": 280600,
          "n": 2
        },
        {
          "month": "2024-04",
          "median": 283600,
          "n": 3
        },
        {
          "month": "2024-05",
          "median": 295050,
          "n": 6
        },
        {
          "month": "2024-07",
          "median": 299500,
          "n": 11
        },
        {
          "month": "2024-08",
          "median": 301300,
          "n": 4
        },
        {
          "month": "2024-09",
          "median": 303590,
          "n": 4
        },
        {
          "month": "2024-10",
          "median": 323500,
          "n": 4
        },
        {
          "month": "2024-11",
          "median": 331000,
          "n": 9
        },
        {
          "month": "2024-12",
          "median": 339500,
          "n": 9
        },
        {
          "month": "2025-01",
          "median": 339045,
          "n": 6
        },
        {
          "month": "2025-02",
          "median": 347000,
          "n": 10
        },
        {
          "month": "2025-03",
          "median": 388500,
          "n": 6
        },
        {
          "month": "2025-04",
          "median": 392500,
          "n": 5
        },
        {
          "month": "2025-05",
          "median": 402500,
          "n": 4
        },
        {
          "month": "2025-06",
          "median": 422500,
          "n": 5
        },
        {
          "month": "2025-07",
          "median": 445500,
          "n": 5
        },
        {
          "month": "2025-08",
          "median": 402275,
          "n": 2
        },
        {
          "month": "2025-09",
          "median": 403825,
          "n": 8
        },
        {
          "month": "2025-10",
          "median": 425025,
          "n": 8
        },
        {
          "month": "2025-11",
          "median": 429500,
          "n": 7
        },
        {
          "month": "2025-12",
          "median": 427500,
          "n": 6
        },
        {
          "month": "2026-01",
          "median": 457500,
          "n": 2
        },
        {
          "month": "2026-02",
          "median": 437500,
          "n": 1
        },
        {
          "month": "2026-03",
          "median": 447750,
          "n": 4
        },
        {
          "month": "2026-04",
          "median": 434500,
          "n": 1
        },
        {
          "month": "2026-05",
          "median": 425500,
          "n": 3
        },
        {
          "month": "2026-06",
          "median": 426500,
          "n": 3
        }
      ]
    },
    {
      "id": "11680::은마",
      "aptName": "은마",
      "region": "강남구",
      "group": "seoul",
      "tags": [
        "liquid"
      ],
      "color": "#6b3fa0",
      "monthly": [
        {
          "month": "2016-09",
          "median": 135000,
          "n": 8
        },
        {
          "month": "2016-10",
          "median": 138500,
          "n": 5
        },
        {
          "month": "2017-01",
          "median": 125000,
          "n": 10
        },
        {
          "month": "2017-02",
          "median": 129000,
          "n": 10
        },
        {
          "month": "2017-03",
          "median": 135250,
          "n": 8
        },
        {
          "month": "2017-04",
          "median": 135000,
          "n": 12
        },
        {
          "month": "2017-05",
          "median": 138000,
          "n": 13
        },
        {
          "month": "2017-06",
          "median": 139250,
          "n": 20
        },
        {
          "month": "2017-07",
          "median": 143000,
          "n": 18
        },
        {
          "month": "2017-09",
          "median": 148450,
          "n": 8
        },
        {
          "month": "2017-10",
          "median": 155300,
          "n": 9
        },
        {
          "month": "2017-11",
          "median": 160000,
          "n": 13
        },
        {
          "month": "2017-12",
          "median": 165000,
          "n": 9
        },
        {
          "month": "2018-01",
          "median": 176500,
          "n": 10
        },
        {
          "month": "2018-02",
          "median": 170250,
          "n": 4
        },
        {
          "month": "2018-03",
          "median": 169000,
          "n": 5
        },
        {
          "month": "2018-04",
          "median": 172000,
          "n": 1
        },
        {
          "month": "2018-05",
          "median": 170000,
          "n": 4
        },
        {
          "month": "2018-06",
          "median": 169500,
          "n": 5
        },
        {
          "month": "2018-07",
          "median": 172000,
          "n": 15
        },
        {
          "month": "2018-08",
          "median": 187000,
          "n": 10
        },
        {
          "month": "2018-09",
          "median": 200000,
          "n": 4
        },
        {
          "month": "2018-10",
          "median": 189000,
          "n": 4
        },
        {
          "month": "2018-11",
          "median": 184500,
          "n": 1
        },
        {
          "month": "2018-12",
          "median": 172000,
          "n": 3
        },
        {
          "month": "2019-02",
          "median": 167500,
          "n": 2
        },
        {
          "month": "2019-03",
          "median": 174000,
          "n": 8
        },
        {
          "month": "2019-04",
          "median": 178000,
          "n": 7
        },
        {
          "month": "2019-05",
          "median": 189750,
          "n": 10
        },
        {
          "month": "2019-06",
          "median": 192850,
          "n": 14
        },
        {
          "month": "2019-07",
          "median": 199000,
          "n": 8
        },
        {
          "month": "2019-08",
          "median": 197000,
          "n": 3
        },
        {
          "month": "2019-09",
          "median": 199750,
          "n": 6
        },
        {
          "month": "2019-10",
          "median": 211500,
          "n": 8
        },
        {
          "month": "2019-11",
          "median": 225625,
          "n": 8
        },
        {
          "month": "2019-12",
          "median": 232500,
          "n": 2
        },
        {
          "month": "2020-01",
          "median": 220000,
          "n": 1
        },
        {
          "month": "2020-02",
          "median": 214000,
          "n": 9
        },
        {
          "month": "2020-04",
          "median": 194000,
          "n": 5
        },
        {
          "month": "2020-05",
          "median": 204000,
          "n": 7
        },
        {
          "month": "2020-06",
          "median": 213000,
          "n": 11
        },
        {
          "month": "2020-07",
          "median": 225000,
          "n": 3
        },
        {
          "month": "2020-08",
          "median": 238000,
          "n": 1
        },
        {
          "month": "2020-11",
          "median": 220000,
          "n": 1
        },
        {
          "month": "2020-12",
          "median": 231500,
          "n": 6
        },
        {
          "month": "2021-01",
          "median": 237000,
          "n": 3
        },
        {
          "month": "2021-02",
          "median": 242500,
          "n": 2
        },
        {
          "month": "2021-03",
          "median": 238500,
          "n": 2
        },
        {
          "month": "2021-04",
          "median": 241500,
          "n": 4
        },
        {
          "month": "2021-05",
          "median": 240000,
          "n": 1
        },
        {
          "month": "2021-06",
          "median": 258000,
          "n": 3
        },
        {
          "month": "2021-07",
          "median": 257500,
          "n": 6
        },
        {
          "month": "2021-08",
          "median": 262500,
          "n": 5
        },
        {
          "month": "2021-11",
          "median": 282000,
          "n": 1
        },
        {
          "month": "2022-02",
          "median": 255000,
          "n": 1
        },
        {
          "month": "2022-04",
          "median": 262500,
          "n": 4
        },
        {
          "month": "2022-05",
          "median": 270000,
          "n": 1
        },
        {
          "month": "2022-08",
          "median": 257000,
          "n": 1
        },
        {
          "month": "2022-09",
          "median": 250000,
          "n": 1
        },
        {
          "month": "2022-10",
          "median": 210000,
          "n": 1
        },
        {
          "month": "2022-11",
          "median": 223000,
          "n": 4
        },
        {
          "month": "2022-12",
          "median": 225500,
          "n": 2
        },
        {
          "month": "2023-01",
          "median": 215000,
          "n": 1
        },
        {
          "month": "2023-02",
          "median": 223250,
          "n": 6
        },
        {
          "month": "2023-03",
          "median": 238000,
          "n": 5
        },
        {
          "month": "2023-04",
          "median": 232000,
          "n": 3
        },
        {
          "month": "2023-05",
          "median": 244000,
          "n": 7
        },
        {
          "month": "2023-06",
          "median": 215000,
          "n": 5
        },
        {
          "month": "2023-07",
          "median": 264000,
          "n": 5
        },
        {
          "month": "2023-08",
          "median": 257000,
          "n": 7
        },
        {
          "month": "2023-10",
          "median": 280000,
          "n": 1
        },
        {
          "month": "2023-11",
          "median": 278000,
          "n": 1
        },
        {
          "month": "2024-04",
          "median": 258000,
          "n": 5
        },
        {
          "month": "2024-05",
          "median": 254000,
          "n": 1
        },
        {
          "month": "2024-06",
          "median": 269500,
          "n": 3
        },
        {
          "month": "2024-07",
          "median": 268000,
          "n": 6
        },
        {
          "month": "2024-08",
          "median": 279500,
          "n": 2
        },
        {
          "month": "2024-09",
          "median": 275000,
          "n": 3
        },
        {
          "month": "2024-10",
          "median": 290000,
          "n": 3
        },
        {
          "month": "2024-11",
          "median": 295000,
          "n": 1
        },
        {
          "month": "2024-12",
          "median": 293500,
          "n": 1
        },
        {
          "month": "2025-01",
          "median": 304000,
          "n": 2
        },
        {
          "month": "2025-02",
          "median": 309000,
          "n": 1
        },
        {
          "month": "2025-03",
          "median": 327000,
          "n": 5
        },
        {
          "month": "2025-04",
          "median": 335000,
          "n": 3
        },
        {
          "month": "2025-05",
          "median": 369000,
          "n": 3
        },
        {
          "month": "2025-06",
          "median": 390000,
          "n": 3
        },
        {
          "month": "2025-07",
          "median": 412000,
          "n": 4
        },
        {
          "month": "2025-09",
          "median": 407500,
          "n": 2
        },
        {
          "month": "2025-10",
          "median": 429500,
          "n": 2
        },
        {
          "month": "2025-11",
          "median": 415000,
          "n": 1
        },
        {
          "month": "2026-01",
          "median": 420000,
          "n": 1
        },
        {
          "month": "2026-04",
          "median": 381000,
          "n": 3
        },
        {
          "month": "2026-05",
          "median": 388250,
          "n": 2
        },
        {
          "month": "2026-06",
          "median": 385000,
          "n": 2
        },
        {
          "month": "2026-07",
          "median": 369500,
          "n": 1
        }
      ]
    },
    {
      "id": "30200::엑스포",
      "aptName": "엑스포",
      "region": "대전유성구",
      "group": "daejeon",
      "tags": [
        "liquid"
      ],
      "color": "#0e7490",
      "monthly": [
        {
          "month": "2016-09",
          "median": 21900,
          "n": 11
        },
        {
          "month": "2016-10",
          "median": 21000,
          "n": 27
        },
        {
          "month": "2016-11",
          "median": 21500,
          "n": 19
        },
        {
          "month": "2016-12",
          "median": 21450,
          "n": 10
        },
        {
          "month": "2017-01",
          "median": 22000,
          "n": 7
        },
        {
          "month": "2017-02",
          "median": 21500,
          "n": 15
        },
        {
          "month": "2017-03",
          "median": 19900,
          "n": 6
        },
        {
          "month": "2017-04",
          "median": 22700,
          "n": 3
        },
        {
          "month": "2017-05",
          "median": 20000,
          "n": 9
        },
        {
          "month": "2017-06",
          "median": 19625,
          "n": 2
        },
        {
          "month": "2017-07",
          "median": 21750,
          "n": 4
        },
        {
          "month": "2017-08",
          "median": 19900,
          "n": 4
        },
        {
          "month": "2017-09",
          "median": 19950,
          "n": 6
        },
        {
          "month": "2017-10",
          "median": 20200,
          "n": 3
        },
        {
          "month": "2017-11",
          "median": 22000,
          "n": 5
        },
        {
          "month": "2017-12",
          "median": 22000,
          "n": 5
        },
        {
          "month": "2018-01",
          "median": 21200,
          "n": 9
        },
        {
          "month": "2018-02",
          "median": 21700,
          "n": 7
        },
        {
          "month": "2018-03",
          "median": 18650,
          "n": 10
        },
        {
          "month": "2018-04",
          "median": 18300,
          "n": 2
        },
        {
          "month": "2018-05",
          "median": 20350,
          "n": 10
        },
        {
          "month": "2018-06",
          "median": 20500,
          "n": 8
        },
        {
          "month": "2018-07",
          "median": 20200,
          "n": 6
        },
        {
          "month": "2018-08",
          "median": 21000,
          "n": 11
        },
        {
          "month": "2018-09",
          "median": 20250,
          "n": 11
        },
        {
          "month": "2018-10",
          "median": 20250,
          "n": 14
        },
        {
          "month": "2018-11",
          "median": 21100,
          "n": 23
        },
        {
          "month": "2018-12",
          "median": 20000,
          "n": 7
        },
        {
          "month": "2019-01",
          "median": 20000,
          "n": 9
        },
        {
          "month": "2019-02",
          "median": 23250,
          "n": 6
        },
        {
          "month": "2019-03",
          "median": 21300,
          "n": 14
        },
        {
          "month": "2019-04",
          "median": 21000,
          "n": 18
        },
        {
          "month": "2019-05",
          "median": 20900,
          "n": 26
        },
        {
          "month": "2019-06",
          "median": 22000,
          "n": 30
        },
        {
          "month": "2019-07",
          "median": 23900,
          "n": 29
        },
        {
          "month": "2019-08",
          "median": 24500,
          "n": 13
        },
        {
          "month": "2019-09",
          "median": 24750,
          "n": 8
        },
        {
          "month": "2019-10",
          "median": 27500,
          "n": 10
        },
        {
          "month": "2019-11",
          "median": 29800,
          "n": 19
        },
        {
          "month": "2019-12",
          "median": 26650,
          "n": 16
        },
        {
          "month": "2020-01",
          "median": 28700,
          "n": 12
        },
        {
          "month": "2020-02",
          "median": 28500,
          "n": 11
        },
        {
          "month": "2020-03",
          "median": 30000,
          "n": 10
        },
        {
          "month": "2020-04",
          "median": 31000,
          "n": 9
        },
        {
          "month": "2020-05",
          "median": 30000,
          "n": 47
        },
        {
          "month": "2020-06",
          "median": 32450,
          "n": 20
        },
        {
          "month": "2020-07",
          "median": 35500,
          "n": 11
        },
        {
          "month": "2020-08",
          "median": 35800,
          "n": 9
        },
        {
          "month": "2020-09",
          "median": 39150,
          "n": 4
        },
        {
          "month": "2020-10",
          "median": 41650,
          "n": 4
        },
        {
          "month": "2020-11",
          "median": 40700,
          "n": 9
        },
        {
          "month": "2020-12",
          "median": 41250,
          "n": 10
        },
        {
          "month": "2021-01",
          "median": 43700,
          "n": 9
        },
        {
          "month": "2021-02",
          "median": 42500,
          "n": 4
        },
        {
          "month": "2021-03",
          "median": 42250,
          "n": 8
        },
        {
          "month": "2021-04",
          "median": 42500,
          "n": 8
        },
        {
          "month": "2021-05",
          "median": 42500,
          "n": 11
        },
        {
          "month": "2021-06",
          "median": 45800,
          "n": 13
        },
        {
          "month": "2021-07",
          "median": 46000,
          "n": 7
        },
        {
          "month": "2021-08",
          "median": 50900,
          "n": 3
        },
        {
          "month": "2021-09",
          "median": 48750,
          "n": 10
        },
        {
          "month": "2021-10",
          "median": 48000,
          "n": 9
        },
        {
          "month": "2021-11",
          "median": 50350,
          "n": 2
        },
        {
          "month": "2021-12",
          "median": 33000,
          "n": 1
        },
        {
          "month": "2022-01",
          "median": 49500,
          "n": 2
        },
        {
          "month": "2022-02",
          "median": 47850,
          "n": 4
        },
        {
          "month": "2022-03",
          "median": 46000,
          "n": 2
        },
        {
          "month": "2022-04",
          "median": 53700,
          "n": 1
        },
        {
          "month": "2022-05",
          "median": 48000,
          "n": 7
        },
        {
          "month": "2022-06",
          "median": 39000,
          "n": 1
        },
        {
          "month": "2022-07",
          "median": 48000,
          "n": 1
        },
        {
          "month": "2022-09",
          "median": 50000,
          "n": 1
        },
        {
          "month": "2022-11",
          "median": 34000,
          "n": 2
        },
        {
          "month": "2022-12",
          "median": 31500,
          "n": 3
        },
        {
          "month": "2023-01",
          "median": 33000,
          "n": 1
        },
        {
          "month": "2023-02",
          "median": 37000,
          "n": 3
        },
        {
          "month": "2023-03",
          "median": 37000,
          "n": 7
        },
        {
          "month": "2023-04",
          "median": 31000,
          "n": 9
        },
        {
          "month": "2023-05",
          "median": 33000,
          "n": 5
        },
        {
          "month": "2023-06",
          "median": 34500,
          "n": 3
        },
        {
          "month": "2023-07",
          "median": 37000,
          "n": 2
        },
        {
          "month": "2023-08",
          "median": 36500,
          "n": 4
        },
        {
          "month": "2023-09",
          "median": 32150,
          "n": 8
        },
        {
          "month": "2023-10",
          "median": 37000,
          "n": 11
        },
        {
          "month": "2023-11",
          "median": 32500,
          "n": 7
        },
        {
          "month": "2023-12",
          "median": 36400,
          "n": 4
        },
        {
          "month": "2024-01",
          "median": 37000,
          "n": 5
        },
        {
          "month": "2024-02",
          "median": 39800,
          "n": 7
        },
        {
          "month": "2024-03",
          "median": 34700,
          "n": 5
        },
        {
          "month": "2024-04",
          "median": 34000,
          "n": 9
        },
        {
          "month": "2024-05",
          "median": 36700,
          "n": 7
        },
        {
          "month": "2024-06",
          "median": 34500,
          "n": 7
        },
        {
          "month": "2024-07",
          "median": 40000,
          "n": 5
        },
        {
          "month": "2024-08",
          "median": 38000,
          "n": 7
        },
        {
          "month": "2024-09",
          "median": 34300,
          "n": 3
        },
        {
          "month": "2024-10",
          "median": 41000,
          "n": 6
        },
        {
          "month": "2024-11",
          "median": 38000,
          "n": 4
        },
        {
          "month": "2024-12",
          "median": 35800,
          "n": 5
        },
        {
          "month": "2025-01",
          "median": 33000,
          "n": 3
        },
        {
          "month": "2025-02",
          "median": 35500,
          "n": 11
        },
        {
          "month": "2025-03",
          "median": 34800,
          "n": 9
        },
        {
          "month": "2025-04",
          "median": 33500,
          "n": 4
        },
        {
          "month": "2025-05",
          "median": 33000,
          "n": 13
        },
        {
          "month": "2025-06",
          "median": 35200,
          "n": 15
        },
        {
          "month": "2025-07",
          "median": 36200,
          "n": 15
        },
        {
          "month": "2025-08",
          "median": 35000,
          "n": 13
        },
        {
          "month": "2025-09",
          "median": 38000,
          "n": 18
        },
        {
          "month": "2025-10",
          "median": 41000,
          "n": 15
        },
        {
          "month": "2025-11",
          "median": 45400,
          "n": 9
        },
        {
          "month": "2025-12",
          "median": 41500,
          "n": 13
        },
        {
          "month": "2026-01",
          "median": 44200,
          "n": 11
        },
        {
          "month": "2026-02",
          "median": 42800,
          "n": 5
        },
        {
          "month": "2026-03",
          "median": 47000,
          "n": 9
        },
        {
          "month": "2026-04",
          "median": 44500,
          "n": 2
        },
        {
          "month": "2026-05",
          "median": 41900,
          "n": 4
        },
        {
          "month": "2026-06",
          "median": 45000,
          "n": 9
        },
        {
          "month": "2026-07",
          "median": 44700,
          "n": 11
        },
        {
          "month": "2026-08",
          "median": 45500,
          "n": 3
        }
      ]
    },
    {
      "id": "30170::국화한신",
      "aptName": "국화한신",
      "region": "대전서구",
      "group": "daejeon",
      "tags": [
        "liquid"
      ],
      "color": "#b45309",
      "monthly": [
        {
          "month": "2016-09",
          "median": 26000,
          "n": 1
        },
        {
          "month": "2016-10",
          "median": 25875,
          "n": 2
        },
        {
          "month": "2016-11",
          "median": 25650,
          "n": 2
        },
        {
          "month": "2016-12",
          "median": 25900,
          "n": 5
        },
        {
          "month": "2017-02",
          "median": 26100,
          "n": 1
        },
        {
          "month": "2017-03",
          "median": 27100,
          "n": 2
        },
        {
          "month": "2017-04",
          "median": 28600,
          "n": 3
        },
        {
          "month": "2017-06",
          "median": 27900,
          "n": 1
        },
        {
          "month": "2017-07",
          "median": 26600,
          "n": 1
        },
        {
          "month": "2017-08",
          "median": 27300,
          "n": 2
        },
        {
          "month": "2017-09",
          "median": 27000,
          "n": 4
        },
        {
          "month": "2017-10",
          "median": 28150,
          "n": 2
        },
        {
          "month": "2017-11",
          "median": 27050,
          "n": 2
        },
        {
          "month": "2018-01",
          "median": 28500,
          "n": 2
        },
        {
          "month": "2018-02",
          "median": 29700,
          "n": 1
        },
        {
          "month": "2018-03",
          "median": 29900,
          "n": 2
        },
        {
          "month": "2018-04",
          "median": 29550,
          "n": 2
        },
        {
          "month": "2018-05",
          "median": 29600,
          "n": 1
        },
        {
          "month": "2018-06",
          "median": 27300,
          "n": 1
        },
        {
          "month": "2018-08",
          "median": 27500,
          "n": 5
        },
        {
          "month": "2018-09",
          "median": 31500,
          "n": 5
        },
        {
          "month": "2018-10",
          "median": 34250,
          "n": 2
        },
        {
          "month": "2018-11",
          "median": 34000,
          "n": 1
        },
        {
          "month": "2018-12",
          "median": 34100,
          "n": 2
        },
        {
          "month": "2019-05",
          "median": 40900,
          "n": 2
        },
        {
          "month": "2019-06",
          "median": 39000,
          "n": 1
        },
        {
          "month": "2019-07",
          "median": 34900,
          "n": 1
        },
        {
          "month": "2019-08",
          "median": 39300,
          "n": 5
        },
        {
          "month": "2019-09",
          "median": 39900,
          "n": 3
        },
        {
          "month": "2019-10",
          "median": 42000,
          "n": 1
        },
        {
          "month": "2019-11",
          "median": 41000,
          "n": 5
        },
        {
          "month": "2019-12",
          "median": 49250,
          "n": 2
        },
        {
          "month": "2020-01",
          "median": 40000,
          "n": 1
        },
        {
          "month": "2020-02",
          "median": 53800,
          "n": 1
        },
        {
          "month": "2020-05",
          "median": 52000,
          "n": 3
        },
        {
          "month": "2020-06",
          "median": 50000,
          "n": 4
        },
        {
          "month": "2020-08",
          "median": 54000,
          "n": 1
        },
        {
          "month": "2020-10",
          "median": 56000,
          "n": 1
        },
        {
          "month": "2020-11",
          "median": 52700,
          "n": 1
        },
        {
          "month": "2020-12",
          "median": 56000,
          "n": 7
        },
        {
          "month": "2021-04",
          "median": 60000,
          "n": 1
        },
        {
          "month": "2021-06",
          "median": 64300,
          "n": 1
        },
        {
          "month": "2021-07",
          "median": 67500,
          "n": 2
        },
        {
          "month": "2021-09",
          "median": 60000,
          "n": 1
        },
        {
          "month": "2022-04",
          "median": 72000,
          "n": 1
        },
        {
          "month": "2023-02",
          "median": 61000,
          "n": 1
        },
        {
          "month": "2023-05",
          "median": 43000,
          "n": 1
        },
        {
          "month": "2023-09",
          "median": 45000,
          "n": 1
        },
        {
          "month": "2023-10",
          "median": 58200,
          "n": 1
        },
        {
          "month": "2023-12",
          "median": 57500,
          "n": 1
        },
        {
          "month": "2024-01",
          "median": 57000,
          "n": 3
        },
        {
          "month": "2024-02",
          "median": 54500,
          "n": 1
        },
        {
          "month": "2024-03",
          "median": 57500,
          "n": 1
        },
        {
          "month": "2024-04",
          "median": 55500,
          "n": 1
        },
        {
          "month": "2024-05",
          "median": 50000,
          "n": 1
        },
        {
          "month": "2024-06",
          "median": 57000,
          "n": 1
        },
        {
          "month": "2024-08",
          "median": 56800,
          "n": 1
        },
        {
          "month": "2024-10",
          "median": 59000,
          "n": 1
        },
        {
          "month": "2024-11",
          "median": 56500,
          "n": 3
        },
        {
          "month": "2024-12",
          "median": 57000,
          "n": 1
        },
        {
          "month": "2025-02",
          "median": 55000,
          "n": 1
        },
        {
          "month": "2025-03",
          "median": 54000,
          "n": 3
        },
        {
          "month": "2025-04",
          "median": 54000,
          "n": 2
        },
        {
          "month": "2025-05",
          "median": 54700,
          "n": 1
        },
        {
          "month": "2025-07",
          "median": 52000,
          "n": 1
        },
        {
          "month": "2025-08",
          "median": 55500,
          "n": 1
        },
        {
          "month": "2025-10",
          "median": 59000,
          "n": 6
        },
        {
          "month": "2025-11",
          "median": 61000,
          "n": 1
        },
        {
          "month": "2025-12",
          "median": 60750,
          "n": 2
        },
        {
          "month": "2026-06",
          "median": 61750,
          "n": 2
        }
      ]
    },
    {
      "id": "30170::가람",
      "aptName": "가람",
      "region": "대전서구",
      "group": "daejeon",
      "tags": [
        "liquid"
      ],
      "color": "#be123c",
      "monthly": [
        {
          "month": "2016-09",
          "median": 25200,
          "n": 2
        },
        {
          "month": "2016-10",
          "median": 25000,
          "n": 1
        },
        {
          "month": "2017-01",
          "median": 25150,
          "n": 2
        },
        {
          "month": "2017-02",
          "median": 27600,
          "n": 1
        },
        {
          "month": "2017-03",
          "median": 24550,
          "n": 1
        },
        {
          "month": "2017-12",
          "median": 24000,
          "n": 1
        },
        {
          "month": "2018-01",
          "median": 26300,
          "n": 1
        },
        {
          "month": "2018-05",
          "median": 27300,
          "n": 1
        },
        {
          "month": "2018-09",
          "median": 27175,
          "n": 2
        },
        {
          "month": "2018-10",
          "median": 26400,
          "n": 2
        },
        {
          "month": "2018-11",
          "median": 26000,
          "n": 1
        },
        {
          "month": "2018-12",
          "median": 28450,
          "n": 1
        },
        {
          "month": "2019-02",
          "median": 32000,
          "n": 1
        },
        {
          "month": "2019-05",
          "median": 32300,
          "n": 1
        },
        {
          "month": "2019-06",
          "median": 31500,
          "n": 1
        },
        {
          "month": "2019-07",
          "median": 32300,
          "n": 1
        },
        {
          "month": "2019-10",
          "median": 30600,
          "n": 2
        },
        {
          "month": "2019-11",
          "median": 33000,
          "n": 1
        },
        {
          "month": "2019-12",
          "median": 31800,
          "n": 1
        },
        {
          "month": "2020-10",
          "median": 48000,
          "n": 1
        },
        {
          "month": "2021-06",
          "median": 57000,
          "n": 1
        },
        {
          "month": "2021-07",
          "median": 62000,
          "n": 1
        },
        {
          "month": "2021-08",
          "median": 58000,
          "n": 1
        },
        {
          "month": "2022-01",
          "median": 57000,
          "n": 1
        },
        {
          "month": "2023-06",
          "median": 48200,
          "n": 1
        },
        {
          "month": "2023-10",
          "median": 43000,
          "n": 1
        },
        {
          "month": "2024-02",
          "median": 53000,
          "n": 1
        },
        {
          "month": "2024-04",
          "median": 50000,
          "n": 2
        },
        {
          "month": "2024-05",
          "median": 51000,
          "n": 1
        },
        {
          "month": "2024-11",
          "median": 54000,
          "n": 1
        },
        {
          "month": "2025-02",
          "median": 56600,
          "n": 2
        },
        {
          "month": "2025-04",
          "median": 55000,
          "n": 1
        },
        {
          "month": "2025-09",
          "median": 60400,
          "n": 1
        },
        {
          "month": "2025-11",
          "median": 61900,
          "n": 1
        },
        {
          "month": "2026-01",
          "median": 58450,
          "n": 4
        },
        {
          "month": "2026-05",
          "median": 67000,
          "n": 1
        }
      ]
    }
  ]
};

export function basketToSeries(): { seoul: LeaderMonthPoint[]; daejeon: LeaderMonthPoint[] } {
  const seoul: LeaderMonthPoint[] = [];
  const daejeon: LeaderMonthPoint[] = [];
  for (const p of seoulDaejeonLagAnalysis.basketIndex) {
    const month = /^\d{6}$/.test(p.month) ? p.month : p.month.replace('-', '');
    seoul.push({ month, avgMedian: p.seoul, sampleCount: 1, momChangePercent: null });
    daejeon.push({ month, avgMedian: p.daejeon, sampleCount: 1, momChangePercent: null });
  }
  return { seoul, daejeon };
}
