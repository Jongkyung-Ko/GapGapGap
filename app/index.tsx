import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SEOUL_DISTRICTS } from '../src/data/seoul';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.brand}>갭갭갭</Text>
      <Text style={styles.tagline}>
        대장 아파트 시세로 읽는 지역 상승 흐름
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>서울 분석</Text>
        <Text style={styles.sectionDesc}>
          구별 대장 단지 상위 N개의 평균 중위가로 최근 3년 월별 추이와 급등 구간을 봅니다.
        </Text>
        <View style={styles.grid}>
          {SEOUL_DISTRICTS.map((d) => (
            <Link key={d.lawdCd} href={`/seoul/${d.lawdCd}`} asChild>
              <Pressable style={styles.guChip}>
                <Text style={styles.guText}>{d.name}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  guChip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c9cfc6',
    minWidth: '30%',
    flexGrow: 1,
    maxWidth: '32%',
  },
  guText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#1f4d3a',
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
