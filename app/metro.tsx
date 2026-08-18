import { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { OverlayLineChart } from '../src/components/OverlayLineChart';
import { basketToSeries, seoulDaejeonLagAnalysis as A } from '../src/data/seoulDaejeonLag';

function RankTable({
  title,
  rows,
  mode,
}: {
  title: string;
  rows: readonly {
    apt: string;
    region: string;
    median_억?: number;
    pyeong_만?: number;
    months?: number;
    trades?: number;
  }[];
  mode: 'price' | 'liquid';
}) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      {rows.map((r, i) => (
        <View key={`${r.region}-${r.apt}`} style={styles.row}>
          <Text style={styles.rank}>{i + 1}</Text>
          <View style={styles.rowBody}>
            <Text style={styles.apt}>{r.apt}</Text>
            <Text style={styles.meta}>{r.region}</Text>
          </View>
          {mode === 'price' ? (
            <Text style={styles.value}>
              {r.median_억?.toFixed(2)}억
              {'\n'}
              <Text style={styles.meta}>평당 {r.pyeong_만?.toLocaleString()}만</Text>
            </Text>
          ) : (
            <Text style={styles.value}>
              {r.months}개월
              {'\n'}
              <Text style={styles.meta}>{r.trades?.toLocaleString()}건</Text>
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

export default function MetroScreen() {
  const { width } = useWindowDimensions();
  const chartW = Math.min(width - 40, 560);
  const basket = useMemo(() => basketToSeries(), []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>서울 → 대전 시차 검증</Text>
      <Text style={styles.body}>
        가설: 서울(강남·송파) 집값이 먼저 오르고 지방(대전)이 뒤따른다. 전용 84㎡ 실거래(
        {A.period})로 가격 TOP5와 유동성 TOP5를 나눠 시차를 측정했습니다.
      </Text>
      <Text style={styles.source}>
        {A.source} · 기준 {A.asOf}
      </Text>

      <View style={styles.verdict}>
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
          <Text style={styles.metricHint}>중앙값 · 매칭 구간 0~7개월</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>롤링 최적 시차</Text>
          <Text style={styles.metricValue}>{A.lag.rollingLagMedianMonths}개월</Text>
          <Text style={styles.metricHint}>36개월 창 중앙값</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>가격TOP5 교차상관</Text>
          <Text style={styles.metricValue}>{A.lag.priceRankBestLagMonths}개월</Text>
          <Text style={styles.metricHint}>corr {A.lag.priceRankCorr}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>유동성 바스켓</Text>
          <Text style={styles.metricValue}>{A.lag.liquidBestLagMonths}개월</Text>
          <Text style={styles.metricHint}>corr {A.lag.liquidCorr} · 동행에 가까움</Text>
        </View>
      </View>

      <Text style={styles.section}>유동성 TOP5 바스켓 지수</Text>
      <Text style={styles.hint}>공통 시작=100. 초록=서울, 주황=대전</Text>
      <OverlayLineChart
        series={[
          { id: 'seoul', label: '서울', color: '#1f4d3a', monthly: basket.seoul },
          { id: 'daejeon', label: '대전', color: '#c45c26', monthly: basket.daejeon },
        ]}
        formatValue={(v) => `${Math.round(v)}`}
        emptyText="지수 데이터 없음"
      />

      <Text style={styles.section}>구간별 상승률 (유동성 바스켓)</Text>
      <View style={styles.returns}>
        <Text style={styles.returnLine}>
          2016~21 · 서울 {A.returns.seoul_2016_2021}% / 대전 {A.returns.daejeon_2016_2021}%
        </Text>
        <Text style={styles.returnLine}>
          2022~23 · 서울 {A.returns.seoul_2022_2023}% / 대전 {A.returns.daejeon_2022_2023}%
        </Text>
        <Text style={styles.returnLine}>
          2024~26 · 서울 {A.returns.seoul_2024_2026}% / 대전 {A.returns.daejeon_2024_2026}%
        </Text>
      </View>

      <Text style={styles.section}>급등 시작 매칭</Text>
      {A.lag.surgeMatches.map((m) => (
        <Text key={`${m.seoul}-${m.daejeon}`} style={styles.surge}>
          서울 {m.seoul} → 대전 {m.daejeon} · +{m.lag_months}개월
        </Text>
      ))}

      <RankTable title="가격 TOP5 · 강남·송파 (84㎡ 중위가)" rows={A.priceRank.seoul} mode="price" />
      <RankTable title="가격 TOP5 · 대전 (84㎡ 중위가)" rows={A.priceRank.daejeon} mode="price" />
      <RankTable
        title="유동성 TOP5 · 서울 (시차 추정용)"
        rows={A.liquidRank.seoul}
        mode="liquid"
      />
      <RankTable
        title="유동성 TOP5 · 대전 (시차 추정용)"
        rows={A.liquidRank.daejeon}
        mode="liquid"
      />

      <Text style={styles.section}>상세 차트</Text>
      <Text style={styles.hint}>가격 TOP5는 재건축·신축 비중이 커 거래가 얇습니다. 시차는 유동성 바스켓을 우선 보세요.</Text>
      {(
        [
          ['01_price_rank_top5_levels.png', '가격 TOP5 중위가 추이'],
          ['05_liquid_top5_levels.png', '유동성 TOP5 중위가 추이'],
          ['02_liquid_basket_index.png', '바스켓 지수 비교'],
          ['03_cross_corr_lag.png', '교차상관 시차'],
          ['04_rolling_lag.png', '롤링 최적 시차'],
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 56,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f4d3a',
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    color: '#5c655a',
  },
  source: {
    fontSize: 12,
    color: '#8a9488',
    marginBottom: 6,
  },
  verdict: {
    backgroundColor: '#eef3ef',
    padding: 14,
    gap: 6,
    marginVertical: 6,
  },
  verdictTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a2218',
    lineHeight: 22,
  },
  section: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
    color: '#1a2218',
  },
  hint: {
    fontSize: 13,
    color: '#7a8478',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5c655a',
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
  returns: {
    gap: 4,
  },
  returnLine: {
    fontSize: 14,
    color: '#3d4a3f',
    lineHeight: 22,
  },
  surge: {
    fontSize: 13,
    color: '#5c655a',
    lineHeight: 20,
  },
  block: {
    marginTop: 8,
    gap: 0,
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a2218',
    marginBottom: 6,
  },
  row: {
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
  rowBody: {
    flex: 1,
    gap: 2,
  },
  apt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a2218',
  },
  meta: {
    fontSize: 12,
    color: '#7a8478',
  },
  value: {
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '700',
    color: '#1f4d3a',
    lineHeight: 18,
  },
  fig: {
    marginTop: 8,
    gap: 6,
  },
  figLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5c655a',
  },
});
