import { ScrollView, StyleSheet, Text, View } from 'react-native';

const METRO_PREVIEW = [
  { city: '부산', focus: '해운대·수영·연제' },
  { city: '대구', focus: '수성·달서' },
  { city: '인천', focus: '연수·부평·서구' },
  { city: '광주', focus: '서구·남구' },
  { city: '대전', focus: '유성·서구' },
  { city: '울산', focus: '남구·중구' },
];

export default function MetroScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>광역도시 분석</Text>
      <Text style={styles.body}>
        2단계에서 서울 주요 구(강남·서초·송파 등)의 대장 시세 상승과 각 광역시 구 단위 대장
        시세 상승을 같은 방식으로 계산한 뒤, 시차(lag)·상승 비율·상관관계를 비교합니다.
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>준비 중 · 서울 분석 MVP 이후 제공</Text>
      </View>

      <Text style={styles.section}>비교 대상 (예정)</Text>
      {METRO_PREVIEW.map((m) => (
        <View key={m.city} style={styles.row}>
          <Text style={styles.city}>{m.city}</Text>
          <Text style={styles.focus}>{m.focus}</Text>
        </View>
      ))}

      <Text style={styles.section}>분석 지표 (예정)</Text>
      <Text style={styles.item}>· 급등 시작 시점 시차 (서울 대비 N개월)</Text>
      <Text style={styles.item}>· 상승률 비율 (지방 / 서울)</Text>
      <Text style={styles.item}>· 월별 시계열 상관계수</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 48,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f4d3a',
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    color: '#5c655a',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#efe9d8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5c4a20',
  },
  section: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#1a2218',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d9ddd6',
  },
  city: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f4d3a',
  },
  focus: {
    fontSize: 14,
    color: '#7a8478',
  },
  item: {
    fontSize: 14,
    lineHeight: 22,
    color: '#5c655a',
  },
});
