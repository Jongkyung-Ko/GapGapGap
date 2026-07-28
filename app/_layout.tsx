import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#f7f6f2' },
          headerTintColor: '#1f4d3a',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#f7f6f2' },
        }}
      >
        <Stack.Screen name="index" options={{ title: '갭갭갭' }} />
        <Stack.Screen name="seoul/[lawdCd]" options={{ title: '구 분석' }} />
        <Stack.Screen name="metro" options={{ title: '광역도시 분석' }} />
      </Stack>
    </>
  );
}
