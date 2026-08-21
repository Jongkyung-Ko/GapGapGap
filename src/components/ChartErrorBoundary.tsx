import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  children: ReactNode;
  fallbackText?: string;
};

type State = { error: Error | null };

/** Prevent a chart SVG crash from blanking the whole analysis page. */
export class ChartErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('[ChartErrorBoundary]', error.message, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.box}>
          <Text style={styles.title}>차트를 표시하지 못했습니다</Text>
          <Text style={styles.body}>
            {this.props.fallbackText ?? '페이지를 새로고침하거나 창 크기를 넓혀 다시 시도해 주세요.'}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  box: {
    minHeight: 160,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e9ef',
    backgroundColor: '#fff',
    justifyContent: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a2332',
  },
  body: {
    fontSize: 13,
    lineHeight: 19,
    color: '#5c6570',
  },
});
