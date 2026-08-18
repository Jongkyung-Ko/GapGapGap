import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PwaInstallButton } from './PwaInstall';

type Props = {
  installed: boolean;
  installing: boolean;
  onInstall: () => void;
};

/** Top-right header: 분석 + PWA install */
export function HeaderActions({ installed, installing, onInstall }: Props) {
  const router = useRouter();
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityLabel="분석"
        onPress={() => router.push('/analysis')}
        style={styles.btn}
      >
        <Text style={styles.btnText}>분석</Text>
      </Pressable>
      <PwaInstallButton installed={installed} installing={installing} onPress={onInstall} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f4d3a',
  },
});
