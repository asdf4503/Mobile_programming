import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert,ImageBackground,SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import styles from './GymStyles';
import DateTimePickerComponent from './DateTimePickerComponent';

const iconsData = [
  { id: 1, name: '풋살장', position: { left: 270, top: 30 } },
  { id: 2, name: '체육관', position: { left: 270, top: 140 } },
  { id: 3, name: '운동장', position: { left: 150, top: 270 } },
];

const GymScreen = () => {
  const navigation = useNavigation();

  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            setLoggedInUserId(user.uid);
            console.log('UID set: ', user.uid);
        } else {
            setLoggedInUserId(null);
            console.log('No user logged in');
        }
    });
    return () => unsubscribe();
}, []);

  const handleReservation = async () => {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    if (!userId) {
      Alert.alert("알림", "로그인이 필요합니다.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      Alert.alert("알림", "날짜와 시간을 선택해주세요!");
      return;
    }
    const reservationData = {
      userId: userId, // 현재 로그인한 사용자 아이디를 사용
      date: selectedDate,
      time: selectedTime
    };
  
    try {
      // API 호출하기
      let response = await fetch("https://mobile2302-default-rtdb.firebaseio.com/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
      });
  
      let data = await response.json();
      
      if (data.success) {
        Alert.alert("성공", "예약이 완료되었습니다.");
      } else {
        Alert.alert("오류", data.message || "예약 중 문제가 발생했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "서버 연결에 실패했습니다.");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('./../../assets/GWNU-LOGO.png')}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>국립 강릉원주대학교</Text>
          <Text style={styles.subHeader}>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
          <Text style={styles.userIdText}>로그인 중인 ID: {loggedInUserId || "No User ID"}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Image
          source={require('./GymScreen.jpg')}
          style={styles.image}
        />
        {iconsData.map(icon => (
          <TouchableOpacity
            key={icon.id}
            style={[styles.icon, icon.position]}
            onPress={() => handleIconClick(icon.name)}>
            <Text style={styles.iconText}>{icon.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 바텀 바 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text>이용시간 설정하기</Text>
          {selectedDate && selectedTime && (
            <Text style={styles.greyText}>
              {selectedDate} {selectedTime}
            </Text>
          )}
        </TouchableOpacity>
        
        {/* 예약하기 버튼 추가 */}
        <TouchableOpacity style={styles.reservationButton} onPress={handleReservation}>
          <Text>예약하기</Text>
        </TouchableOpacity>
      </View>

      {/* 팝업창 */}
      {showModal && (
        <DateTimePickerComponent 
          onClose={() => setShowModal(false)} 
          onDateChange={setSelectedDate} 
          onTimeChange={setSelectedTime}
        />
      )}
    </View>
  );
};
export default GymScreen;
