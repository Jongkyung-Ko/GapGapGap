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
import { gapSeries, jeonseSeries, saleSeries, type LeaderIndexResult } from '../../src/types';
import { colorForLawd } from '../../src/utils/colors';
import { formatPercent, formatPyeong } from '../../src/utils/format';

type Loaded = {
  districtName: string;
  color: string;
  data: LeaderIndexResult;
  topN: number;
  years: number;
  areaTarget: number;
};

function matchesOptions(entry: Loaded, options: AnalysisOptions): boolean {
  return (
    entry.topN === options.topN &&
    entry.years === options.years &&
    entry.areaTarget === options.areaTarget
  );
}

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
      areaTarget: opts.areaTarget,
    });
    return {
      lawdCd,
      entry: {
        districtName: district?.name ?? lawdCd,
        color: colorForLawd(lawdCd),
        data,
        topN: opts.topN,
        years: opts.years,
        areaTarget: opts.areaTarget,
      } satisfies Loaded,
    };
  }, []);

  useEffect(() => {
    if (selected.length === 0) return;

    const need = selected.filter((id) => {
      const hit = loaded[id];
      return !hit || !matchesOptions(hit, options);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, options.topN, options.years, options.surgeThreshold, options.areaTarget, fetchOne]);

  const toggle = useCallback((lawdCd: string) => {
    setSelected((prev) => {
      if (prev.includes(lawdCd)) return prev.filter((id) => id !== lawdCd);
      return [...prev, lawdCd];
    });
  }, []);

  const activeEntries = useMemo(
    () =>
      selected
        .map((id) => loaded[id])
        .filter((entry): entry is Loaded => Boolean(entry) && matchesOptions(entry, options)),
    [selected, loaded, options],
  );

  const saleOverlay: OverlaySeries[] = useMemo(
    () =>
      activeEntries.map((entry) => ({
        id: `${entry.data.lawdCd}-sale`,
        label: entry.districtName,
        color: entry.color,
        monthly: saleSeries(entry.data),
      })),
    [activeEntries],
  );

  const jeonseOverlay: OverlaySeries[] = useMemo(
    () =>
      activeEntries.map((entry) => ({
        id: `${entry.data.lawdCd}-jeonse`,
        label: entry.districtName,
        color: entry.color,
        monthly: jeonseSeries(entry.data),
      })),
    [activeEntries],
  );

  const gapOverlay: OverlaySeries[] = useMemo(
    () =>
      activeEntries.map((entry) => ({
        id: `${entry.data.lawdCd}-gap`,
        label: entry.districtName,
        color: entry.color,
        monthly: gapSeries(entry.data),
      })),
    [activeEntries],
  );

  const summaryRows = useMemo(() => {
    return activeEntries.map((entry) => {
      const sale = saleSeries(entry.data).filter((m) => m.avgMedian != null);
      const jeonse = jeonseSeries(entry.data).filter((m) => m.avgMedian != null);
      const gap = gapSeries(entry.data).filter((m) => m.avgMedian != null);
      const first = sale[0]?.avgMedian;
      const last = sale.at(-1)?.avgMedian;
      const change =
        first != null && last != null && first > 0 ? ((last - first) / first) * 100 : null;
      return {
        lawdCd: entry.data.lawdCd,
        name: entry.districtName,
        color: entry.color,
        sale: last,
        jeonse: jeonse.at(-1)?.avgMedian,
        gap: gap.at(-1)?.avgMedian,
        change,
      };
    });
  }, [activeEntries]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.lead}>
        주요 평형대 평단가(만원/평)로 대장 단지를 고르고, 구별 매매·전세·갭 추이를 한 차트에
        겹쳐 비교합니다.
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
            {loadingIds.length}개 구 {options.areaTarget}㎡ 평단가 집계 중…
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

      <Text style={styles.blockTitle}>매매 평단가</Text>
      <OverlayLineChart series={saleOverlay} />

      <Text style={styles.blockTitle}>전세 평단가</Text>
      <OverlayLineChart series={jeonseOverlay} />

      <Text style={styles.blockTitle}>갭 (매매−전세 평단가)</Text>
      <OverlayLineChart series={gapOverlay} />

      {summaryRows.length > 0 ? (
        <View style={styles.table}>
          <View style={styles.tableHead}>
            <Text style={[styles.headCell, styles.colName]}>구</Text>
            <Text style={styles.headCell}>매매</Text>
            <Text style={styles.headCell}>전세</Text>
            <Text style={styles.headCell}>갭</Text>
            <Text style={styles.headCell}>변화</Text>
          </View>
          {summaryRows.map((row) => (
            <Link key={row.lawdCd} href={`/seoul/${row.lawdCd}`} asChild>
              <Pressable style={styles.row}>
                <View style={[styles.dot, { backgroundColor: row.color }]} />
                <Text style={[styles.rowName, styles.colName]}>{row.name}</Text>
                <Text style={styles.rowPrice}>{formatPyeong(row.sale ?? null)}</Text>
                <Text style={styles.rowPrice}>{formatPyeong(row.jeonse ?? null)}</Text>
                <Text style={styles.rowPrice}>{formatPyeong(row.gap ?? null)}</Text>
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
          <Text style={styles.hint}>행을 누르면 해당 구 상세로 이동합니다.</Text>
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
    marginTop: 8,
    fontSize: 17,
    fontWeight: '700',
    color: '#1a2218',
  },
  table: {
    gap: 2,
    marginTop: 8,
  },
  tableHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingBottom: 6,
  },
  headCell: {
    flex: 1,
    fontSize: 11,
    color: '#7a8478',
    fontWeight: '700',
    textAlign: 'right',
  },
  colName: {
    flex: 1.2,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    fontSize: 13,
    fontWeight: '700',
    color: '#1a2218',
  },
  rowPrice: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: '#1a2218',
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  rowChange: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
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
