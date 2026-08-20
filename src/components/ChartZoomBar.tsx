import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  windowLabel: string;
  canZoomIn: boolean;
  canZoomOut: boolean;
  canPanLeft: boolean;
  canPanRight: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPanLeft: () => void;
  onPanRight: () => void;
  onReset: () => void;
  onExpand?: () => void;
  expanded?: boolean;
};

export function ChartZoomBar({
  windowLabel,
  canZoomIn,
  canZoomOut,
  canPanLeft,
  canPanRight,
  onZoomIn,
  onZoomOut,
  onPanLeft,
  onPanRight,
  onReset,
  onExpand,
  expanded,
}: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onPanLeft}
        disabled={!canPanLeft}
        style={[styles.btn, !canPanLeft && styles.disabled]}
        accessibilityLabel="이전 구간"
      >
        <Text style={styles.btnText}>‹</Text>
      </Pressable>
      <Pressable
        onPress={onZoomOut}
        disabled={!canZoomOut}
        style={[styles.btn, !canZoomOut && styles.disabled]}
        accessibilityLabel="축소"
      >
        <Text style={styles.btnText}>−</Text>
      </Pressable>
      <Pressable onPress={onReset} style={styles.labelBtn} accessibilityLabel="전체 보기">
        <Text style={styles.label}>{windowLabel}</Text>
      </Pressable>
      <Pressable
        onPress={onZoomIn}
        disabled={!canZoomIn}
        style={[styles.btn, !canZoomIn && styles.disabled]}
        accessibilityLabel="확대"
      >
        <Text style={styles.btnText}>+</Text>
      </Pressable>
      <Pressable
        onPress={onPanRight}
        disabled={!canPanRight}
        style={[styles.btn, !canPanRight && styles.disabled]}
        accessibilityLabel="다음 구간"
      >
        <Text style={styles.btnText}>›</Text>
      </Pressable>
      {onExpand ? (
        <Pressable
          onPress={onExpand}
          style={[styles.expand, expanded && styles.expandOn]}
          accessibilityLabel={expanded ? '닫기' : '확대 보기'}
        >
          <Text style={[styles.expandText, expanded && styles.expandTextOn]}>
            {expanded ? '닫기' : '확대'}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 4,
  },
  btn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#e8ecef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.35,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a2332',
    lineHeight: 20,
  },
  labelBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f4f6f8',
    minWidth: 64,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1f4d3a',
  },
  expand: {
    marginLeft: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#1a2332',
  },
  expandOn: {
    backgroundColor: '#e8ecef',
  },
  expandText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
  },
  expandTextOn: {
    color: '#1a2332',
  },
});
