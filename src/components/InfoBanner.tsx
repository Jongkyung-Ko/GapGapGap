import React, { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string | null;
  onDismiss: () => void;
};

export function InfoBanner({ message, onDismiss }: Props) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  if (!message || Platform.OS !== 'web') return null;

  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{message}</Text>
      <Pressable onPress={onDismiss} hitSlop={8}>
        <Text style={styles.close}>닫기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 16,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1f4d3a',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 4,
  },
  text: {
    flex: 1,
    color: '#f7f6f2',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  close: {
    color: '#c9cfc6',
    fontSize: 12,
    fontWeight: '700',
  },
});
