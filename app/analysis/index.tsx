import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { AppLink } from '../../src/components/AppLink';
import { OverlaySaleChart } from '../../src/components/OverlaySaleChart';
import { seoulDaejeonLagAnalysis as A } from '../../src/data/seoulDaejeonLag';

function monthLabel(m: string): string {
  if (/^\d{6}$/.test(m)) return `${m.slice(0, 4)}-${m.slice(4)}`;
  return m.slice(0, 7);
}

export default function AnalysisReportScreen() {
  const { width: screenW } = useWindowDimensions();
  const chartW = Math.max(260, Math.min(screenW > 0 ? screenW - 40 : 560, 560));

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
      <Text style={styles.kicker}>주요 광역시 분석 리포트</Text>
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
      <Text style={styles.hint}>유동성 TOP5 공통 시작=100 · 초록=서울 · 주황=대전 · +로 구간 확대</Text>
      <OverlaySaleChart series={basketSeries} formatValue={(v) => `${Math.round(v)}`} height={260} />

      <AppLink href="/analysis/seoul-market" style={styles.cta}>
        <Text style={styles.ctaText}>부동산 주식 이율 연계분석</Text>
        <Text style={styles.ctaSub}>대장 매매 · KOSPI · 기준금리 · 급등/이동평균</Text>
      </AppLink>

      <AppLink href="/analysis/compare" style={styles.ctaSecondary}>
        <Text style={styles.ctaTextSecondary}>서울 지방도시간 매매가 시차 분석</Text>
        <Text style={styles.ctaSubSecondary}>광역도시 탭 · 정량 한줄 결론 · 단지/지수 전환</Text>
      </AppLink>

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
            서울 {m.seoul} → 대전 {m.daejeon} · +{m.lag_months}개월
          </Text>
        </View>
      ))}

      <Text style={styles.section}>가격 TOP5 · 강남·송파 (84㎡ 중위가)</Text>
      {A.priceRank.seoul.map((r, i) => (
        <Text key={`ps-${r.apt}`} style={styles.rankLine}>
          {i + 1}. [{r.region}] {r.apt} · {r.median_억}억
        </Text>
      ))}

      <Text style={styles.section}>가격 TOP5 · 대전</Text>
      {A.priceRank.daejeon.map((r, i) => (
        <Text key={`pd-${r.apt}`} style={styles.rankLine}>
          {i + 1}. [{r.region}] {r.apt} · {r.median_억}억
        </Text>
      ))}

      <Text style={styles.section}>유동성 TOP5 · 서울</Text>
      {A.liquidRank.seoul.map((r, i) => (
        <Text key={r.apt} style={styles.liquidLine}>
          {i + 1}. {r.apt} · {r.months}개월 · {r.trades.toLocaleString()}건
        </Text>
      ))}

      <Text style={styles.section}>유동성 TOP5 · 대전</Text>
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
            source={{ uri: `/report-figures/${file}` }}
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

      <AppLink href="/analysis/compare" style={styles.ctaBottom}>
        <Text style={styles.ctaText}>서울 지방도시간 매매가 시차 분석</Text>
      </AppLink>
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
    color: '#8a929c',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a2332',
  },
  meta: {
    fontSize: 12,
    color: '#8a929c',
    marginBottom: 4,
  },
  verdictBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e9ef',
    padding: 14,
    gap: 6,
    marginVertical: 4,
  },
  verdictLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8a929c',
  },
  verdictTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a2332',
    lineHeight: 21,
  },
  bullet: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5c6570',
  },
  section: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
    color: '#1a2332',
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5c6570',
  },
  hint: {
    fontSize: 12,
    color: '#8a929c',
    marginBottom: 6,
    lineHeight: 18,
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metric: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e4e9ef',
    padding: 12,
  },
  metricLabel: {
    fontSize: 11,
    color: '#8a929c',
  },
  metricValue: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '800',
    color: '#c45c26',
  },
  metricHint: {
    marginTop: 2,
    fontSize: 11,
    color: '#8a929c',
  },
  cta: {
    marginTop: 12,
    backgroundColor: '#1f4d3a',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 2,
  },
  ctaSecondary: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1f4d3a',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 2,
  },
  ctaBottom: {
    marginTop: 24,
    backgroundColor: '#1f4d3a',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  ctaText: {
    color: '#f7f6f2',
    fontWeight: '800',
    fontSize: 15,
  },
  ctaTextSecondary: {
    color: '#1f4d3a',
    fontWeight: '800',
    fontSize: 15,
  },
  ctaSub: {
    color: '#c5d4cb',
    fontSize: 12,
  },
  ctaSubSecondary: {
    color: '#5c6570',
    fontSize: 12,
  },
  table: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d9ddd6',
    backgroundColor: '#fff',
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: '#eef1ee',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e4e9ef',
  },
  cell: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 13,
    color: '#1a2332',
  },
  cellHead: {
    fontWeight: '700',
  },
  colPeriod: {
    flex: 1.2,
  },
  colNum: {
    flex: 1,
    textAlign: 'right',
  },
  surgeRow: {
    paddingVertical: 4,
  },
  surgeText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5c6570',
  },
  rankLine: {
    fontSize: 13,
    lineHeight: 20,
    color: '#1a2332',
  },
  liquidLine: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5c6570',
  },
  fig: {
    marginTop: 8,
    gap: 4,
  },
  figLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5c6570',
  },
});
