import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { LeaderComplex } from '../types';
import { formatManwon } from '../utils/format';

interface Props {
  leaders: LeaderComplex[];
}

export function LeaderList({ leaders }: Props) {
  if (leaders.length === 0) {
    return <Text style={styles.empty}>선정된 대장 단지가 없습니다.</Text>;
  }

  return (
    <View style={styles.wrap}>
      {leaders.map((l) => (
        <View key={l.id} style={styles.row}>
          <Text style={styles.rank}>{l.rank}</Text>
          <View style={styles.body}>
            <Text style={styles.name} numberOfLines={1}>
              {l.aptName}
            </Text>
            <Text style={styles.meta}>
              {l.dong} · 최근 {l.rankingTradeCount}건
            </Text>
          </View>
          <Text style={styles.price}>{formatManwon(l.medianPrice)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 2,
  },
  empty: {
    color: '#7a8478',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d9ddd6',
    gap: 10,
  },
  rank: {
    width: 22,
    fontSize: 14,
    fontWeight: '700',
    color: '#1f4d3a',
    fontVariant: ['tabular-nums'],
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a2218',
  },
  meta: {
    fontSize: 12,
    color: '#7a8478',
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a2218',
    fontVariant: ['tabular-nums'],
  },
});
