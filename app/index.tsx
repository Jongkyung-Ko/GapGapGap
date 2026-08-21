import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.brand}>갭갭갭</Text>
      <Text style={styles.tagline}>대장 아파트 시세로 읽는 지역 상승 흐름</Text>
      <Text style={styles.hint}>
        우측 상단 <Text style={styles.hintStrong}>분석</Text>에서 리포트로 바로 이동합니다.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>서울 구 비교</Text>
        <Text style={styles.sectionDesc}>
          구를 여러 개 골라 대장 시세 추이를 한 차트에 겹쳐 비교합니다.
        </Text>
        <Link href="/seoul" asChild>
          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>서울 구 비교 시작</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>분석 리포트</Text>

        <Text style={styles.itemTitle}>주요 광역시 분석 리포트</Text>
        <Text style={styles.sectionDesc}>
          서울(강남·송파) 대장 시세와 전국 주요 광역시 시차·상승률을 정리한 결과 리포트입니다.
        </Text>
        <Link href="/analysis" asChild>
          <Pressable style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>주요 광역시 분석 리포트</Text>
          </Pressable>
        </Link>

        <Text style={styles.itemTitle}>부동산 주식 이율 연계분석</Text>
        <Text style={styles.sectionDesc}>
          서울 대장 매매가·KOSPI·기준금리를 한 차트에서 급등·이동평균 전환과 함께 봅니다.
        </Text>
        <Link href="/analysis/seoul-market" asChild>
          <Pressable style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>부동산 주식 이율 연계분석</Text>
          </Pressable>
        </Link>

        <Text style={styles.itemTitle}>서울 지방도시간 매매가 시차 분석</Text>
        <Text style={styles.sectionDesc}>
          서울과 부산·대구·인천·대전·울산·세종 매매가를 탭으로 비교하고 시차를 측정합니다.
        </Text>
        <Link href="/analysis/compare" asChild>
          <Pressable style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>서울 지방도시간 매매가 시차 분석</Text>
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
  hint: {
    marginTop: -8,
    fontSize: 13,
    lineHeight: 20,
    color: '#7a8478',
  },
  hintStrong: {
    fontWeight: '800',
    color: '#1f4d3a',
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a2218',
  },
  itemTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '800',
    color: '#1f4d3a',
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
