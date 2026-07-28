import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AnalysisOptionsBar } from '../../src/components/AnalysisOptionsBar';
import { LeaderList } from '../../src/components/LeaderList';
import { OverlayLineChart } from '../../src/components/OverlayLineChart';
import { SurgeList } from '../../src/components/SurgeList';
import { DEFAULT_OPTIONS, SEOUL_DISTRICTS, type AnalysisOptions } from '../../src/data/seoul';
import { fetchLeaderIndex } from '../../src/services/api';
import { gapSeries, jeonseSeries, saleSeries, type LeaderIndexResult } from '../../src/types';
import { formatPercent, formatPyeong } from '../../src/utils/format';

export default function SeoulDistrictScreen() {
  const { lawdCd } = useLocalSearchParams<{ lawdCd: string }>();
  const navigation = useNavigation();
  const district = SEOUL_DISTRICTS.find((d) => d.lawdCd === lawdCd);

  const [options, setOptions] = useState<AnalysisOptions>(DEFAULT_OPTIONS);
  const [data, setData] = useState<LeaderIndexResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: district ? `서울 ${district.name}` : '구 분석',
    });
  }, [navigation, district]);

  const load = useCallback(async () => {
    if (!lawdCd) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchLeaderIndex({
        lawdCd,
        topN: options.topN,
        years: options.years,
        surgeThreshold: options.surgeThreshold,
        areaTarget: options.areaTarget,
      });
      setData(result);
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : '분석에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [lawdCd, options.topN, options.years, options.surgeThreshold, options.areaTarget]);

  useEffect(() => {
    void load();
  }, [load]);

  const sale = useMemo(() => (data ? saleSeries(data) : []), [data]);
  const jeonse = useMemo(() => (data ? jeonseSeries(data) : []), [data]);
  const gap = useMemo(() => (data ? gapSeries(data) : []), [data]);

  const withSale = sale.filter((m) => m.avgMedian != null);
  const first = withSale[0]?.avgMedian;
  const last = withSale.at(-1)?.avgMedian;
  const totalChange =
    first != null && last != null && first > 0 ? ((last - first) / first) * 100 : null;
  const lastJeonse = jeonse.filter((m) => m.avgMedian != null).at(-1)?.avgMedian;
  const lastGap = gap.filter((m) => m.avgMedian != null).at(-1)?.avgMedian;

  const combinedSeries = useMemo(() => {
    if (!data) return [];
    return [
      { id: 'sale', label: '매매 평단', color: '#1f4d3a', monthly: sale },
      { id: 'jeonse', label: '전세 평단', color: '#2a5f9e', monthly: jeonse },
      { id: 'gap', label: '갭', color: '#c43b2c', monthly: gap },
    ];
  }, [data, sale, jeonse, gap]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AnalysisOptionsBar options={options} onChange={setOptions} />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1f4d3a" />
          <Text style={styles.loadingText}>
            {options.areaTarget}㎡ 평단가 · 대장 {options.topN}개 집계 중…
          </Text>
        </View>
      ) : null}

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retry} onPress={() => void load()}>
            <Text style={styles.retryText}>다시 시도</Text>
          </Pressable>
        </View>
      ) : null}

      {!loading && data ? (
        <>
          {data.mock ? (
            <Text style={styles.mockBadge}>데모 데이터 (MOLIT 키 미설정)</Text>
          ) : null}

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>매매 평단</Text>
              <Text style={styles.statValue}>{formatPyeong(last)}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>전세 평단</Text>
              <Text style={styles.statValue}>{formatPyeong(lastJeonse)}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>갭</Text>
              <Text style={styles.statValue}>{formatPyeong(lastGap)}</Text>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>{data.years}년 매매 변화</Text>
              <Text
                style={[
                  styles.statValue,
                  totalChange != null && totalChange >= 0 ? styles.up : styles.down,
                ]}
              >
                {formatPercent(totalChange)}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>급등 구간</Text>
              <Text style={styles.statValue}>{data.surges.length}곳</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>평형</Text>
              <Text style={styles.statValue}>{data.areaTarget ?? options.areaTarget}㎡</Text>
            </View>
          </View>

          <Text style={styles.blockTitle}>매매 · 전세 · 갭 평단가</Text>
          <OverlayLineChart series={combinedSeries} height={280} />

          <Text style={styles.blockTitle}>급등 구간 (매매 평단)</Text>
          <SurgeList surges={data.surges} threshold={data.surgeThresholdPercent} />

          <Text style={styles.blockTitle}>대장 단지 TOP {data.topN}</Text>
          <Text style={styles.blockSub}>
            {options.areaTarget}㎡ 평단가 순 · 매매 {data.tradeCount.toLocaleString()}건 / 전세{' '}
            {(data.jeonseCount ?? 0).toLocaleString()}건
          </Text>
          <LeaderList leaders={data.leaders} />

          <Text style={styles.summary}>{data.summary}</Text>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 48,
    gap: 12,
  },
  center: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#3d4639',
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#fdf4f2',
    padding: 14,
    gap: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#e85d4c',
  },
  errorText: {
    color: '#6b2a22',
    fontSize: 14,
    lineHeight: 20,
  },
  retry: {
    alignSelf: 'flex-start',
    backgroundColor: '#1f4d3a',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  mockBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#efe9d8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
  },
  stat: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9ddd6',
    padding: 12,
  },
  statLabel: {
    fontSize: 11,
    color: '#7a8478',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a2218',
    fontVariant: ['tabular-nums'],
  },
  up: { color: '#c43b2c' },
  down: { color: '#2a5f9e' },
  blockTitle: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: '700',
    color: '#1a2218',
  },
  blockSub: {
    marginTop: -6,
    fontSize: 12,
    color: '#7a8478',
  },
  summary: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: '#5c655a',
  },
});
