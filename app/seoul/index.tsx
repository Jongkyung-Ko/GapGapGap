import { Link } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AnalysisOptionsBar } from '../../src/components/AnalysisOptionsBar';
import { OverlayLineChart, type OverlaySeries } from '../../src/components/OverlayLineChart';
import {
  DEFAULT_OPTIONS,
  SEOUL_DISTRICTS,
  type AnalysisOptions,
} from '../../src/data/seoul';
import { fetchLeaderIndex } from '../../src/services/api';
import type { LeaderIndexResult } from '../../src/types';
import { colorForLawd } from '../../src/utils/colors';
import { formatManwon, formatPercent } from '../../src/utils/format';

type Loaded = {
  districtName: string;
  color: string;
  data: LeaderIndexResult;
  topN: number;
  years: number;
};

export default function SeoulCompareScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [options, setOptions] = useState<AnalysisOptions>(DEFAULT_OPTIONS);
  const [loaded, setLoaded] = useState<Record<string, Loaded>>({});
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchOne = useCallback(async (lawdCd: string, opts: AnalysisOptions) => {
    const district = SEOUL_DISTRICTS.find((d) => d.lawdCd === lawdCd);
    const data = await fetchLeaderIndex({
      lawdCd,
      topN: opts.topN,
      years: opts.years,
      surgeThreshold: opts.surgeThreshold,
    });
    return {
      lawdCd,
      entry: {
        districtName: district?.name ?? lawdCd,
        color: colorForLawd(lawdCd),
        data,
        topN: opts.topN,
        years: opts.years,
      } satisfies Loaded,
    };
  }, []);

  useEffect(() => {
    if (selected.length === 0) return;

    const need = selected.filter((id) => {
      const hit = loaded[id];
      return !hit || hit.topN !== options.topN || hit.years !== options.years;
    });
    if (need.length === 0) return;

    let cancelled = false;
    setLoadingIds((prev) => [...new Set([...prev, ...need])]);
    setErrors((prev) => {
      const next = { ...prev };
      for (const id of need) delete next[id];
      return next;
    });

    void (async () => {
      const results = await Promise.allSettled(need.map((id) => fetchOne(id, options)));
      if (cancelled) return;
      setLoaded((prev) => {
        const next = { ...prev };
        for (const r of results) {
          if (r.status === 'fulfilled') next[r.value.lawdCd] = r.value.entry;
        }
        return next;
      });
      setErrors((prev) => {
        const next = { ...prev };
        results.forEach((r, i) => {
          if (r.status === 'rejected') {
            next[need[i]] =
              r.reason instanceof Error ? r.reason.message : '불러오기 실패';
          }
        });
        return next;
      });
      setLoadingIds((prev) => prev.filter((id) => !need.includes(id)));
    })();

    return () => {
      cancelled = true;
    };
    // intentionally omit `loaded` to avoid refetch loops; `need` is derived when selected/options change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, options.topN, options.years, options.surgeThreshold, fetchOne]);

  const toggle = useCallback((lawdCd: string) => {
    setSelected((prev) => {
      if (prev.includes(lawdCd)) return prev.filter((id) => id !== lawdCd);
      return [...prev, lawdCd];
    });
  }, []);

  const series: OverlaySeries[] = useMemo(
    () =>
      selected
        .map((id) => loaded[id])
        .filter((entry): entry is Loaded => Boolean(entry))
        .filter((entry) => entry.topN === options.topN && entry.years === options.years)
        .map((entry) => ({
          id: entry.data.lawdCd,
          label: entry.districtName,
          color: entry.color,
          monthly: entry.data.monthly,
        })),
    [selected, loaded, options.topN, options.years],
  );

  const summaryRows = useMemo(() => {
    return selected
      .map((id) => {
        const entry = loaded[id];
        if (!entry || entry.topN !== options.topN || entry.years !== options.years) {
          return null;
        }
        const withPrice = entry.data.monthly.filter((m) => m.avgMedian != null);
        const first = withPrice[0]?.avgMedian;
        const last = withPrice.at(-1)?.avgMedian;
        const change =
          first != null && last != null && first > 0 ? ((last - first) / first) * 100 : null;
        return {
          lawdCd: id,
          name: entry.districtName,
          color: entry.color,
          last,
          change,
        };
      })
      .filter(Boolean) as Array<{
      lawdCd: string;
      name: string;
      color: string;
      last: number | null | undefined;
      change: number | null;
    }>;
  }, [selected, loaded, options.topN, options.years]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.lead}>
        구를 여러 개 선택하면 대장 평균 중위가 추이가 한 차트에 겹쳐 표시됩니다.
      </Text>

      <AnalysisOptionsBar options={options} onChange={setOptions} />

      <View style={styles.actions}>
        <Pressable
          style={styles.clearBtn}
          onPress={() => {
            setSelected([]);
            setErrors({});
          }}
        >
          <Text style={styles.clearText}>선택 해제</Text>
        </Pressable>
        <Text style={styles.selectedCount}>{selected.length}개 선택</Text>
      </View>

      <View style={styles.grid}>
        {SEOUL_DISTRICTS.map((d) => {
          const on = selected.includes(d.lawdCd);
          const busy = loadingIds.includes(d.lawdCd);
          const color = colorForLawd(d.lawdCd);
          return (
            <Pressable
              key={d.lawdCd}
              onPress={() => toggle(d.lawdCd)}
              style={[styles.chip, on && { backgroundColor: color, borderColor: color }]}
            >
              <Text style={[styles.chipText, on && styles.chipTextOn]}>
                {busy ? '…' : d.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {loadingIds.length > 0 ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color="#1f4d3a" />
          <Text style={styles.loadingText}>
            {loadingIds.length}개 구 시세 집계 중… (첫 로딩은 1~2분 걸릴 수 있습니다)
          </Text>
        </View>
      ) : null}

      {Object.keys(errors).length > 0 ? (
        <View style={styles.errorBox}>
          {Object.entries(errors).map(([id, msg]) => {
            const name = SEOUL_DISTRICTS.find((d) => d.lawdCd === id)?.name ?? id;
            return (
              <Text key={id} style={styles.errorText}>
                {name}: {msg}
              </Text>
            );
          })}
        </View>
      ) : null}

      <Text style={styles.blockTitle}>구별 대장 시세 비교</Text>
      <OverlayLineChart series={series} />

      {summaryRows.length > 0 ? (
        <View style={styles.table}>
          {summaryRows.map((row) => (
            <Link key={row.lawdCd} href={`/seoul/${row.lawdCd}`} asChild>
              <Pressable style={styles.row}>
                <View style={[styles.dot, { backgroundColor: row.color }]} />
                <Text style={styles.rowName}>{row.name}</Text>
                <Text style={styles.rowPrice}>{formatManwon(row.last ?? null)}</Text>
                <Text
                  style={[
                    styles.rowChange,
                    row.change != null && row.change >= 0 ? styles.up : styles.down,
                  ]}
                >
                  {formatPercent(row.change)}
                </Text>
              </Pressable>
            </Link>
          ))}
          <Text style={styles.hint}>행을 누르면 해당 구 상세(급등·대장 단지)로 이동합니다.</Text>
        </View>
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
  lead: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5c655a',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  clearBtn: {
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  clearText: {
    color: '#7a8478',
    fontWeight: '600',
    fontSize: 13,
  },
  selectedCount: {
    fontSize: 13,
    color: '#5c655a',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c9cfc6',
    minWidth: '30%',
    flexGrow: 1,
    maxWidth: '32%',
  },
  chipText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#1f4d3a',
  },
  chipTextOn: {
    color: '#f7f6f2',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    flex: 1,
    fontSize: 13,
    color: '#5c655a',
  },
  errorBox: {
    backgroundColor: '#fdf4f2',
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#e85d4c',
    gap: 4,
  },
  errorText: {
    color: '#6b2a22',
    fontSize: 13,
  },
  blockTitle: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: '700',
    color: '#1a2218',
  },
  table: {
    gap: 2,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d9ddd6',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  rowName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#1a2218',
  },
  rowPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a2218',
    fontVariant: ['tabular-nums'],
  },
  rowChange: {
    width: 64,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  up: { color: '#c43b2c' },
  down: { color: '#2a5f9e' },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: '#7a8478',
  },
});
