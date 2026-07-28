import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type PromptProps = {
  visible: boolean;
  installing?: boolean;
  isIos?: boolean;
  onInstall: () => void;
  onDismiss: () => void;
};

export function PwaInstallPrompt({
  visible,
  installing,
  isIos,
  onInstall,
  onDismiss,
}: PromptProps) {
  if (Platform.OS !== 'web') return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>갭갭갭</Text>
          <Text style={styles.title}>홈 화면에 앱으로 저장할까요?</Text>
          <Text style={styles.body}>
            {isIos
              ? '한 번 추가해 두면 앱처럼 빠르게 열 수 있습니다. Safari 공유 → 홈 화면에 추가로 저장됩니다.'
              : '한 번 추가해 두면 앱처럼 빠르게 열 수 있습니다. 서울 구별 대장 시세 분석을 바로 확인하세요.'}
          </Text>
          <Pressable
            style={[styles.primary, installing && styles.disabled]}
            disabled={installing}
            onPress={onInstall}
          >
            <Text style={styles.primaryText}>
              {installing ? '저장하는 중…' : '앱으로 저장'}
            </Text>
          </Pressable>
          <Pressable style={styles.secondary} onPress={onDismiss} disabled={installing}>
            <Text style={styles.secondaryText}>나중에</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

type ButtonProps = {
  visible?: boolean;
  installing?: boolean;
  installed?: boolean;
  onPress: () => void;
};

export function PwaInstallButton({
  visible = true,
  installing,
  installed,
  onPress,
}: ButtonProps) {
  if (Platform.OS !== 'web' || !visible) return null;

  const label = installed ? '앱' : installing ? '…' : '저장';

  return (
    <Pressable
      accessibilityLabel={installed ? '앱으로 저장됨' : '앱으로 저장'}
      style={[
        styles.headerBtn,
        installed && styles.installedBtn,
        installing && styles.disabled,
      ]}
      disabled={installing || installed}
      onPress={onPress}
    >
      <Text style={[styles.headerBtnText, installed && styles.installedBtnText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(26, 34, 24, 0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 22,
    borderWidth: 1,
    borderColor: '#c9cfc6',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: '#1f4d3a',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a2218',
    lineHeight: 28,
  },
  body: {
    marginTop: 10,
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 21,
    color: '#5c655a',
  },
  primary: {
    backgroundColor: '#1f4d3a',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  secondary: {
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#7a8478',
    fontWeight: '600',
    fontSize: 14,
  },
  headerBtn: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#c9cfc6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 4,
  },
  headerBtnText: {
    color: '#1f4d3a',
    fontWeight: '700',
    fontSize: 12,
  },
  installedBtn: {
    borderColor: '#9aa39a',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  installedBtnText: {
    color: '#7a8478',
  },
  disabled: {
    opacity: 0.55,
  },
});
