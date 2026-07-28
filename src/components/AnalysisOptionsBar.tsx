import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AnalysisOptions } from '../data/seoul';

interface Props {
  options: AnalysisOptions;
  onChange: (next: AnalysisOptions) => void;
}

const TOP_N_CHOICES = [3, 5, 10, 15, 20] as const;

export function AnalysisOptionsBar({ options, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>대장 단지 수</Text>
      <View style={styles.row}>
        {TOP_N_CHOICES.map((n) => {
          const active = options.topN === n;
          return (
            <Pressable
              key={n}
              onPress={() => onChange({ ...options, topN: n })}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{n}개</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.hint}>최근 12개월 중위가 기준 · 상위 {options.topN}개 평균</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3d4639',
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#c9cfc6',
    backgroundColor: '#fff',
  },
  chipActive: {
    backgroundColor: '#1f4d3a',
    borderColor: '#1f4d3a',
  },
  chipText: {
    fontSize: 13,
    color: '#3d4639',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#f7f6f2',
  },
  hint: {
    fontSize: 12,
    color: '#7a8478',
  },
});
