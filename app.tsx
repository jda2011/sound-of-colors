import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

// 화면에 연결할 Stack Navigator 생성
const Stack = createNativeStackNavigator();

// ==========================================
// 1. [홈 화면] - 메인 허브
// ==========================================
function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.homeContent}>
        <Text style={styles.appTitle}>들리는 색깔</Text>
        <Text style={styles.subTitle}>시각장애인과 비장애인이 함께하는 패션 커뮤니티</Text>

        {/* 3순위: 카메라 촬영 및 옷 정보 등록 이동 버튼 */}
        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => navigation.navigate('Wardrobe')}
          accessibilityLabel="내 옷장 및 카메라 등록"
          accessibilityHint="옷을 촬영하고 AI 분석 데이터를 저장합니다."
        >
          <Text style={styles.cardTitle}>👗 내 옷장 & 옷 등록</Text>
          <Text style={styles.cardDesc}>카메라 촬영 및 등록된 옷 관리</Text>
        </TouchableOpacity>

        {/* 4순위: 옷장 데이터 기반 AI 코디 추천 이동 버튼 */}
        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => navigation.navigate('Recommend')}
          accessibilityLabel="AI 코디 추천"
          accessibilityHint="상황과 날씨에 맞는 3가지 코디를 추천받습니다."
        >
          <Text style={styles.cardTitle}>✨ AI 코디 추천 (3가지)</Text>
          <Text style={styles.cardDesc}>상황과 날씨 기반 맞춤 스타일링</Text>
        </TouchableOpacity>

        {/* 5순위: 커뮤니티 및 댓글 필터링 이동 버튼 */}
        <TouchableOpacity 
          style={styles.menuCard}
          onPress={() => navigation.navigate('Community')}
          accessibilityLabel="스타일 커뮤니티"
          accessibilityHint="코디를 공유하고 클린한 댓글로 소통합니다."
        >
          <Text style={styles.cardTitle}>💬 스타일 커뮤니티</Text>
          <Text style={styles.cardDesc}>코디 공유 및 AI 순화 댓글 소통</Text>
        </TouchableOpacity>

        {/* 설정 화면 이동 버튼 */}
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel="접근성 및 앱 설정"
        >
          <Text style={styles.settingsText}>⚙️ 접근성 및 프로필 설정</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// 2. [임시 화면들] - 향후 순서별로 기능 구현 예정
// ==========================================
function WardrobeScreen() {
  return (
    <View style={styles.screenCenter}>
      <Text style={styles.screenTitle}>3순위: 카메라 촬영 및 옷 등록 화면</Text>
    </View>
  );
}

function RecommendScreen() {
  return (
    <View style={styles.screenCenter}>
      <Text style={styles.screenTitle}>4순위: AI 코디 3가지 추천 화면</Text>
    </View>
  );
}

function CommunityScreen() {
  return (
    <View style={styles.screenCenter}>
      <Text style={styles.screenTitle}>5순위: 스타일 커뮤니티 & AI 모더레이션 화면</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screenCenter}>
      <Text style={styles.screenTitle}>접근성 및 프로필 설정 화면</Text>
    </View>
  );
}

// ==========================================
// 메인 네비게이션 컨테이너
// ==========================================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '들리는 색깔 (홈)' }} />
        <Stack.Screen name="Wardrobe" component={WardrobeScreen} options={{ title: '내 옷장' }} />
        <Stack.Screen name="Recommend" component={RecommendScreen} options={{ title: 'AI 코디 추천' }} />
        <Stack.Screen name="Community" component={CommunityScreen} options={{ title: '스타일 커뮤니티' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: '설정' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// 스타일 시트
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F8' },
  homeContent: { padding: 20, alignItems: 'center' },
  appTitle: { fontSize: 28, fontWeight: 'bold', color: '#1A2530', marginTop: 10, marginBottom: 4 },
  subTitle: { fontSize: 13, color: '#666', marginBottom: 24, textAlign: 'center' },
  menuCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 6 },
  cardDesc: { fontSize: 13, color: '#7F8C8D' },
  settingsButton: { marginTop: 12, padding: 12 },
  settingsText: { color: '#4A90E2', fontSize: 15, fontWeight: '600' },
  screenCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  screenTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
});
