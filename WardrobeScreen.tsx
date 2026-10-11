import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import OpenAI from 'openai';

// OpenAI 클라이언트 초기화 (실서비스 시 안전한 환경 변수 처리 필요)
const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY',
  dangerouslyAllowSVG: true,
});

export default function WardrobeScreen({ navigation }: any) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // 1. 카메라로 사진 촬영 또는 앨범에서 선택
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      const base64 = result.assets[0].base64;
      setImageUri(uri);
      analyzeWardrobeImage(base64);
    }
  };

  // 2. OpenAI Vision API를 통한 옷 정보 분석 ("들리는 색깔" 촉감 포함)
  const analyzeWardrobeImage = async (base64Data: string | undefined) => {
    if (!base64Data) return;

    setLoading(true);
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `당신은 시각장애인을 위한 패션 어시스턴트입니다. 의류 사진을 분석하여 다음 JSON 형식으로만 답변하세요:
{
  "category": "의류 카테고리 (예: 상의, 아우터, 하의 등)",
  "color": "색상 톤 (예: 따뜻한 코랄 핑크, 깊은 밤의 네이비)",
  "pattern": "패턴 (예: 무지, 체크, 스트라이프)",
  "material": "소재 및 두께감 (예: 울 100%, 두툼함)",
  "tactileDesc": "전맹 사용자가 손끝으로 만졌을 때 느낄 수 있는 시적이고 감각적인 촉감과 착용감 묘사 (예: 손끝에 부드럽게 감기며 포근한 온기가 전해지는 조직감)"
}`
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: '이 옷의 정보를 분석해 줘.' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Data}` } }
            ]
          }
        ],
        response_format: { type: 'json_object' }
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      setAnalysisResult(result);
    } catch (error) {
      console.error('옷 분석 실패:', error);
      Alert.alert('오류', '옷 정보를 분석하는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 3. 옷장 데이터 저장 함수 (추후 Firebase 연동 지점)
  const saveToWardrobe = () => {
    Alert.alert('저장 완료', '디지털 옷장에 성공적으로 등록되었습니다!', [
      { text: '확인', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👗 내 옷장 등록</Text>
      <Text style={styles.desc}>옷을 촬영하면 AI가 색상, 소재, 그리고 '들리는 색깔' 촉감 정보를 분석해 줍니다.</Text>

      {/* 사진 촬영 버튼 */}
      <TouchableOpacity 
        style={styles.cameraButton} 
        onPress={pickImage}
        accessibilityLabel="옷 사진 촬영하기"
        accessibilityHint="카메라를 열어 등록할 옷을 촬영합니다."
      >
        <Text style={styles.cameraButtonText}>📸 옷 사진 촬영하기</Text>
      </TouchableOpacity>

      {/* 촬영된 이미지 미리보기 */}
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      {/* 로딩 표시 */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>AI가 옷의 색감과 촉감을 분석하고 있어요...</Text>
        </View>
      )}

      {/* 분석 결과 카드 */}
      {analysisResult && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>✨ AI 분석 결과</Text>
          <Text style={styles.resultText}><Text style={styles.bold}>카테고리:</Text> {analysisResult.category}</Text>
          <Text style={styles.resultText}><Text style={styles.bold}>색상 (들리는 색깔):</Text> {analysisResult.color}</Text>
          <Text style={styles.resultText}><Text style={styles.bold}>패턴:</Text> {analysisResult.pattern}</Text>
          <Text style={styles.resultText}><Text style={styles.bold}>소재/두께:</Text> {analysisResult.material}</Text>
          <Text style={styles.resultText}><Text style={styles.bold}>촉감 및 착용감:</Text> {analysisResult.tactileDesc}</Text>

          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={saveToWardrobe}
            accessibilityLabel="옷장에 저장하기"
          >
            <Text style={styles.saveButtonText}>옷장에 저장하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: '#F4F6F8', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A2530', marginBottom: 8 },
  desc: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 20 },
  cameraButton: { width: '100%', backgroundColor: '#4A90E2', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  cameraButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  previewImage: { width: 200, height: 200, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  loadingContainer: { marginVertical: 20, alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#555', fontSize: 14 },
  resultCard: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 14, borderWidth: 1, borderColor: '#E1E8ED', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  resultTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 12 },
  resultText: { fontSize: 14, color: '#444', marginBottom: 8, lineHeight: 20 },
  bold: { fontWeight: 'bold', color: '#1A2530' },
  saveButton: { marginTop: 15, backgroundColor: '#27AE60', padding: 15, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
}); 
