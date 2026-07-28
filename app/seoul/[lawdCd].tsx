import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AnalysisOptionsBar } from '../../src/components/AnalysisOptionsBar';
import { LeaderLineChart } from '../../src/components/LeaderLineChart';
import { LeaderList } from '../../src/components/LeaderList';
import { SurgeList } from '../../src/components/SurgeList';
import { DEFAULT_OPTIONS, SEOUL_DISTRICTS, type AnalysisOptions } from '../../src/data/seoul';
import { fetchLeaderIndex } from '../../src/services/api';
import type { LeaderIndexResult } from '../../src/types';
import { formatManwon, formatPercent } from '../../src/utils/format';

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
      });
      setData(result);
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : '분석에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [lawdCd, options.topN, options.years, options.surgeThreshold]);

  useEffect(() => {
    void load();
  }, [load]);

  const withPrice = data?.monthly.filter((m) => m.avgMedian != null) ?? [];
  const first = withPrice[0]?.avgMedian;
  const last = withPrice.at(-1)?.avgMedian;
  const totalChange =
    first != null && last != null && first > 0 ? ((last - first) / first) * 100 : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AnalysisOptionsBar options={options} onChange={setOptions} />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1f4d3a" />
          <Text style={styles.loadingText}>
            대장 {options.topN}개 · 최근 {options.years}년 시세를 집계 중…
          </Text>
          <Text style={styles.loadingHint}>첫 로딩은 캐시 워밍으로 1~2분 걸릴 수 있습니다.</Text>
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
              <Text style={styles.statLabel}>현재 평균</Text>
              <Text style={styles.statValue}>{formatManwon(last)}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>{data.years}년 변화</Text>
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
          </View>

          <Text style={styles.blockTitle}>월별 대장 평균 중위가</Text>
          <LeaderLineChart monthly={data.monthly} surges={data.surges} />
          <Text style={styles.chartNote}>
            음영 = 전월 대비 {data.surgeThresholdPercent}% 이상 상승이 이어진 급등 구간
          </Text>

          <Text style={styles.blockTitle}>급등 구간</Text>
          <SurgeList surges={data.surges} threshold={data.surgeThresholdPercent} />

          <Text style={styles.blockTitle}>대장 단지 TOP {data.topN}</Text>
          <Text style={styles.blockSub}>최근 12개월 중위가 순 · 거래 {data.tradeCount.toLocaleString()}건 기반</Text>
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
  loadingHint: {
    fontSize: 12,
    color: '#7a8478',
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
    color: '#5c4a20',
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
    fontSize: 16,
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
  chartNote: {
    fontSize: 12,
    color: '#7a8478',
    marginTop: -4,
  },
  summary: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: '#5c655a',
  },
});
