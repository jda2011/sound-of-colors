import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  // 현재 활성화된 화면 상태 관리 ('HOME', 'WARDROBE', 'RECOMMEND', 'COMMUNITY', 'SETTINGS')
  const [currentScreen, setCurrentScreen] = useState('HOME');
  
  // 접근성 모드 상태 (True: 음성/전맹 맞춤형, False: 비장애인 일반 텍스트 모드)
  const [isVoiceMode, setIsVoiceMode] = useState(true);

  // 화면 전환 렌더링 함수
  const renderScreen = () => {
    switch (currentScreen) {
      case 'WARDROBE':
        return <View style={styles.screenContainer}><Text style={styles.screenTitle}>내 옷장 (카메라 촬영 및 분석)</Text><TouchableOpacity onPress={() => setCurrentScreen('HOME')}><Text style={styles.backButton}>돌아가기</Text></TouchableOpacity></View>;
      case 'RECOMMEND':
        return <View style={styles.screenContainer}><Text style={styles.screenTitle}>AI 코디 추천 (상황 및 3가지 선택)</Text><TouchableOpacity onPress={() => setCurrentScreen('HOME')}><Text style={styles.backButton}>돌아가기</Text></TouchableOpacity></View>;
      case 'COMMUNITY':
        return <View style={styles.screenContainer}><Text style={styles.screenTitle}>스타일 커뮤니티 (피드 및 AI 댓글 필터)</Text><TouchableOpacity onPress={() => setCurrentScreen('HOME')}><Text style={styles.backButton}>돌아가기</Text></TouchableOpacity></View>;
      default:
        return (
          <View style={styles.homeContainer}>
            <Text style={styles.title}>들리는 색깔</Text>
            <Text style={styles.subtitle}>현재 모드: {isVoiceMode ? '음성 중심 모드 (전맹 사용자)' : '일반 모드 (비장애인)'}</Text>
            
            {/* 흐름도의 핵심인 메인 허브 버튼들 */}
            <TouchableOpacity 
              style={styles.mainButton} 
              onPress={() => setCurrentScreen('RECOMMEND')}
              accessibilityLabel="AI 코디 추천 받기"
              accessibilityHint="오늘의 날씨와 옷장에 맞는 3가지 코디를 추천받습니다."
            >
              <Text style={styles.buttonText}>✨ AI 코디 추천</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.mainButton} 
              onPress={() => setCurrentScreen('WARDROBE')}
              accessibilityLabel="내 옷장 관리"
              accessibilityHint="옷을 촬영하고 AI로 분석하여 옷장에 저장합니다."
            >
              <Text style={styles.buttonText}>👗 내 옷장 관리</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.mainButton} 
              onPress={() => setCurrentScreen('COMMUNITY')}
              accessibilityLabel="스타일 커뮤니티"
              accessibilityHint="다른 사람들의 코디를 구경하고 댓글을 남깁니다."
            >
              <Text style={styles.buttonText}>💬 스타일 커뮤니티</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.subButton} 
              onPress={() => setIsVoiceMode(!isVoiceMode)}
              accessibilityLabel="접근성 모드 변경"
            >
              <Text style={styles.subButtonText}>⚙️ 모드 전환 (음성/일반)</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  homeContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 30 },
  mainButton: { width: '100%', backgroundColor: '#4A90E2', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 3 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  subButton: { marginTop: 20, padding: 10 },
  subButtonText: { color: '#007AFF', fontSize: 14 },
  screenContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  screenTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  backButton: { color: '#007AFF', fontSize: 16, marginTop: 20 }
});
