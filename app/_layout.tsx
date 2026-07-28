import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InfoBanner } from '../src/components/InfoBanner';
import { PwaInstallButton, PwaInstallPrompt } from '../src/components/PwaInstall';
import { usePwaInstall } from '../src/hooks/usePwaInstall';

export default function RootLayout() {
  const pwa = usePwaInstall();

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#f7f6f2' },
            headerTintColor: '#1f4d3a',
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: '#f7f6f2' },
            headerRight: () => (
              <PwaInstallButton
                installed={pwa.isInstalled}
                installing={pwa.installing}
                onPress={() => {
                  pwa.clearMessage();
                  void pwa.install();
                }}
              />
            ),
          }}
        >
          <Stack.Screen name="index" options={{ title: '갭갭갭' }} />
          <Stack.Screen name="seoul/index" options={{ title: '서울 구 비교' }} />
          <Stack.Screen name="seoul/[lawdCd]" options={{ title: '구 분석' }} />
          <Stack.Screen name="metro" options={{ title: '광역도시 분석' }} />
        </Stack>

        <InfoBanner message={pwa.message} onDismiss={pwa.clearMessage} />
        <PwaInstallPrompt
          visible={pwa.showFirstVisit}
          installing={pwa.installing}
          isIos={pwa.isIos}
          onInstall={() => void pwa.install()}
          onDismiss={() => void pwa.dismissFirstVisit()}
        />
      </View>
    </SafeAreaProvider>
  );
}
