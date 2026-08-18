import { Link } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { OverlaySaleChart } from '../../src/components/OverlaySaleChart';
import { seoulDaejeonLagAnalysis as A } from '../../src/data/seoulDaejeonLag';

function monthLabel(m: string): string {
  if (/^\d{6}$/.test(m)) return `${m.slice(0, 4)}-${m.slice(4)}`;
  return m.slice(0, 7);
}

export default function AnalysisReportScreen() {
  const { width } = useWindowDimensions();
  const chartW = Math.min(width - 40, 560);

  const basketSeries = [
    {
      id: 'seoul',
      label: '서울 유동성 TOP5',
      color: '#1f4d3a',
      points: A.basketIndex.map((p) => ({
        month: monthLabel(p.month),
        value: p.seoul as number | null,
      })),
    },
    {
      id: 'daejeon',
      label: '대전 유동성 TOP5',
      color: '#c45c26',
      points: A.basketIndex.map((p) => ({
        month: monthLabel(p.month),
        value: p.daejeon as number | null,
      })),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.kicker}>결과 리포트</Text>
      <Text style={styles.title}>서울 → 대전 84㎡ 매매가 시차</Text>
      <Text style={styles.meta}>
        {A.period} · {A.source} · 기준 {A.asOf}
      </Text>

      <View style={styles.verdictBox}>
        <Text style={styles.verdictLabel}>결론</Text>
        <Text style={styles.verdictTitle}>{A.verdict.headline}</Text>
        {A.verdict.points.map((p) => (
          <Text key={p} style={styles.bullet}>
            · {p}
          </Text>
        ))}
      </View>

      <Text style={styles.section}>핵심 시차 지표</Text>
      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>급등 시작 시차</Text>
          <Text style={styles.metricValue}>{A.lag.surgeLagMedianMonths}개월</Text>
          <Text style={styles.metricHint}>중앙값 · 구간 0~7개월</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>롤링 최적 시차</Text>
          <Text style={styles.metricValue}>{A.lag.rollingLagMedianMonths}개월</Text>
          <Text style={styles.metricHint}>36개월 창 중앙값</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>가격 TOP5 상관</Text>
          <Text style={styles.metricValue}>{A.lag.priceRankBestLagMonths}개월</Text>
          <Text style={styles.metricHint}>corr {A.lag.priceRankCorr}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>유동성 바스켓</Text>
          <Text style={styles.metricValue}>{A.lag.liquidBestLagMonths}개월</Text>
          <Text style={styles.metricHint}>corr {A.lag.liquidCorr} · 동행</Text>
        </View>
      </View>

      <Text style={styles.section}>가설</Text>
      <Text style={styles.body}>
        서울(강남·송파) 집값이 먼저 오르고 지방(대전)이 뒤따른다. 전용 84㎡ 실거래로 가격 TOP5와
        유동성 TOP5를 나눠 시차를 측정했습니다.
      </Text>

      <Text style={styles.section}>바스켓 지수 추이</Text>
      <Text style={styles.hint}>유동성 TOP5 공통 시작=100 · 초록=서울 · 주황=대전</Text>
      <OverlaySaleChart series={basketSeries} formatValue={(v) => `${Math.round(v)}`} height={260} />

      <Link href="/analysis/compare" asChild>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>매매가 시계열 직접 비교하기</Text>
          <Text style={styles.ctaSub}>광역도시 탭 · 정량 한줄 결론 · 단지/지수 전환</Text>
        </Pressable>
      </Link>

      <Text style={styles.section}>구간별 상승률 (유동성 바스켓)</Text>
      <View style={styles.table}>
        <View style={styles.tableHead}>
          <Text style={[styles.cell, styles.cellHead, styles.colPeriod]}>기간</Text>
          <Text style={[styles.cell, styles.cellHead, styles.colNum]}>서울</Text>
          <Text style={[styles.cell, styles.cellHead, styles.colNum]}>대전</Text>
        </View>
        {(
          [
            ['2016~21', A.returns.seoul_2016_2021, A.returns.daejeon_2016_2021],
            ['2022~23', A.returns.seoul_2022_2023, A.returns.daejeon_2022_2023],
            ['2024~26', A.returns.seoul_2024_2026, A.returns.daejeon_2024_2026],
          ] as const
        ).map(([period, s, d]) => (
          <View key={period} style={styles.tableRow}>
            <Text style={[styles.cell, styles.colPeriod]}>{period}</Text>
            <Text style={[styles.cell, styles.colNum]}>{s}%</Text>
            <Text style={[styles.cell, styles.colNum]}>{d}%</Text>
          </View>
        ))}
      </View>
      <Text style={styles.hint}>
        최근 회복기(2024~26)에 서울 선행·우위가 더 뚜렷합니다. 2016~21 상승기에는 대전 상승률이 더
        컸습니다.
      </Text>

      <Text style={styles.section}>급등 시작 매칭</Text>
      {A.lag.surgeMatches.map((m) => (
        <View key={`${m.seoul}-${m.daejeon}`} style={styles.surgeRow}>
          <Text style={styles.surgeText}>
            서울 {m.seoul} → 대전 {m.daejeon}
          </Text>
          <Text style={styles.surgeLag}>+{m.lag_months}개월</Text>
        </View>
      ))}

      <Text style={styles.section}>가격 TOP5 · 강남·송파 (84㎡ 중위가)</Text>
      <Text style={styles.hint}>전원 강남구. 재건축·초고가라 거래가 얇아 시차 추정에는 유동성 TOP5를 병행합니다.</Text>
      {A.priceRank.seoul.map((r, i) => (
        <View key={r.apt} style={styles.rankRow}>
          <Text style={styles.rank}>{i + 1}</Text>
          <View style={styles.rankBody}>
            <Text style={styles.apt}>{r.apt}</Text>
            <Text style={styles.region}>{r.region}</Text>
          </View>
          <Text style={styles.price}>{r.median_억}억</Text>
        </View>
      ))}

      <Text style={styles.section}>가격 TOP5 · 대전 (84㎡ 중위가)</Text>
      {A.priceRank.daejeon.map((r, i) => (
        <View key={r.apt} style={styles.rankRow}>
          <Text style={styles.rank}>{i + 1}</Text>
          <View style={styles.rankBody}>
            <Text style={styles.apt}>{r.apt}</Text>
            <Text style={styles.region}>{r.region}</Text>
          </View>
          <Text style={styles.price}>{r.median_억}억</Text>
        </View>
      ))}

      <Text style={styles.section}>유동성 TOP5 (시차 추정용)</Text>
      <Text style={styles.subHead}>서울</Text>
      {A.liquidRank.seoul.map((r, i) => (
        <Text key={r.apt} style={styles.liquidLine}>
          {i + 1}. {r.apt} · {r.months}개월 · {r.trades.toLocaleString()}건
        </Text>
      ))}
      <Text style={styles.subHead}>대전</Text>
      {A.liquidRank.daejeon.map((r, i) => (
        <Text key={r.apt} style={styles.liquidLine}>
          {i + 1}. {r.apt} · {r.months}개월 · {r.trades.toLocaleString()}건
        </Text>
      ))}

      <Text style={styles.section}>상세 차트</Text>
      {(
        [
          ['02_liquid_basket_index.png', '유동성 바스켓 지수 비교'],
          ['05_liquid_top5_levels.png', '유동성 TOP5 매매가 (억)'],
          ['01_price_rank_top5_levels.png', '가격 TOP5 매매가 (억)'],
          ['03_cross_corr_lag.png', '교차상관 시차'],
          ['04_rolling_lag.png', '36개월 롤링 최적 시차'],
        ] as const
      ).map(([file, label]) => (
        <View key={file} style={styles.fig}>
          <Text style={styles.figLabel}>{label}</Text>
          <Image
            source={{ uri: `/analysis/${file}` }}
            style={{ width: chartW, height: chartW * 0.72 }}
            resizeMode="contain"
          />
        </View>
      ))}

      <Text style={styles.section}>방법</Text>
      <Text style={styles.bullet}>· {A.method.priceRank}</Text>
      <Text style={styles.bullet}>· {A.method.liquidRank}</Text>
      <Text style={styles.bullet}>· {A.method.lag}</Text>

      <Text style={styles.section}>한계</Text>
      <Text style={styles.bullet}>· 가격 TOP5는 희소 거래·재건축 프리미엄으로 노이즈가 큼</Text>
      <Text style={styles.bullet}>· 대전 유동성 바스켓 일부는 월별 결측이 있음</Text>
      <Text style={styles.bullet}>
        · 교차상관은 선형 관계 가정이며, 정책·금리 충격을 인과로 단정하지 않음
      </Text>

      <Link href="/analysis/compare" asChild>
        <Pressable style={[styles.cta, styles.ctaBottom]}>
          <Text style={styles.ctaText}>시계열 그래프로 다시 비교</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 64,
    gap: 8,
  },
  kicker: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8a9488',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f4d3a',
    lineHeight: 32,
  },
  meta: {
    fontSize: 12,
    color: '#8a9488',
    marginBottom: 8,
    lineHeight: 18,
  },
  verdictBox: {
    backgroundColor: '#eef3ef',
    padding: 16,
    gap: 6,
    marginVertical: 6,
  },
  verdictLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#5c655a',
  },
  verdictTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a2218',
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: '#5c655a',
  },
  bullet: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5c655a',
  },
  section: {
    marginTop: 18,
    fontSize: 17,
    fontWeight: '800',
    color: '#1a2218',
  },
  subHead: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '700',
    color: '#1f4d3a',
  },
  hint: {
    fontSize: 12,
    lineHeight: 18,
    color: '#7a8478',
    marginBottom: 4,
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metric: {
    width: '47%',
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d9ddd6',
    padding: 12,
    gap: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: '#7a8478',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1f4d3a',
  },
  metricHint: {
    fontSize: 11,
    color: '#8a9488',
  },
  cta: {
    marginTop: 12,
    backgroundColor: '#1f4d3a',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 2,
  },
  ctaBottom: {
    marginTop: 24,
  },
  ctaText: {
    color: '#f7f6f2',
    fontWeight: '800',
    fontSize: 15,
  },
  ctaSub: {
    color: '#c5d4cb',
    fontSize: 12,
  },
  table: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d9ddd6',
    backgroundColor: '#fff',
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: '#eef3ef',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d9ddd6',
  },
  cell: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#1a2218',
  },
  cellHead: {
    fontWeight: '800',
    color: '#1f4d3a',
  },
  colPeriod: {
    flex: 1.2,
  },
  colNum: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '700',
  },
  surgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d9ddd6',
  },
  surgeText: {
    fontSize: 13,
    color: '#5c655a',
  },
  surgeLag: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1f4d3a',
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d9ddd6',
  },
  rank: {
    width: 20,
    fontSize: 14,
    fontWeight: '800',
    color: '#1f4d3a',
  },
  rankBody: {
    flex: 1,
    gap: 2,
  },
  apt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a2218',
  },
  region: {
    fontSize: 12,
    color: '#7a8478',
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1f4d3a',
  },
  liquidLine: {
    fontSize: 13,
    lineHeight: 22,
    color: '#5c655a',
  },
  fig: {
    marginTop: 10,
    gap: 6,
  },
  figLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5c655a',
  },
});
