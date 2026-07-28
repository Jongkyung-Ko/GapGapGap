import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { SurgeInterval } from '../types';
import { formatManwon, formatPercent } from '../utils/format';

interface Props {
  surges: SurgeInterval[];
  threshold: number;
}

export function SurgeList({ surges, threshold }: Props) {
  if (surges.length === 0) {
    return (
      <Text style={styles.empty}>
        전월 대비 {threshold}% 이상 상승이 연속된 급등 구간이 없습니다.
      </Text>
    );
  }

  return (
    <View style={styles.wrap}>
      {surges.map((s) => (
        <View key={`${s.startMonth}-${s.endMonth}`} style={styles.card}>
          <Text style={styles.period}>
            {s.startMonth} → {s.endMonth}
          </Text>
          <Text style={styles.change}>{formatPercent(s.changePercent)}</Text>
          <Text style={styles.meta}>
            {formatManwon(s.startPrice)} → {formatManwon(s.endPrice)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  empty: {
    fontSize: 13,
    color: '#7a8478',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#fdf4f2',
    borderLeftWidth: 3,
    borderLeftColor: '#e85d4c',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  period: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a2218',
  },
  change: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '800',
    color: '#c43b2c',
    fontVariant: ['tabular-nums'],
  },
  meta: {
    marginTop: 2,
    fontSize: 12,
    color: '#7a8478',
  },
});
