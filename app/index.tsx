import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.brand}>갭갭갭</Text>
      <Text style={styles.tagline}>대장 아파트 시세로 읽는 지역 상승 흐름</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>서울 분석</Text>
        <Text style={styles.sectionDesc}>
          구를 여러 개 골라 대장 시세 추이를 한 차트에 겹쳐 비교합니다. 상세는 각 구 행에서
          확인할 수 있습니다.
        </Text>
        <Link href="/seoul" asChild>
          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>서울 구 비교 시작</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>광역도시 분석</Text>
        <Text style={styles.sectionDesc}>
          서울 주요 구 상승과 지방 광역시 구 단위 상승의 시차·비율·연관성 (준비 중)
        </Text>
        <Link href="/metro" asChild>
          <Pressable style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>광역 비교 미리보기</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 48,
    gap: 28,
  },
  brand: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1f4d3a',
    letterSpacing: -1,
  },
  tagline: {
    marginTop: -16,
    fontSize: 16,
    lineHeight: 24,
    color: '#5c655a',
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a2218',
  },
  sectionDesc: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5c655a',
  },
  primaryBtn: {
    marginTop: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1f4d3a',
  },
  primaryBtnText: {
    color: '#f7f6f2',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryBtn: {
    marginTop: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1f4d3a',
  },
  secondaryBtnText: {
    color: '#f7f6f2',
    fontWeight: '700',
    fontSize: 14,
  },
});
