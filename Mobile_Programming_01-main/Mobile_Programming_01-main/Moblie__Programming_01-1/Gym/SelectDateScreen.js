import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars'; // react-native-calendars 라이브러리 추가

const SelectDateScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleReservation = () => {
    if (selectedDate) {
      // 여기에서 선택한 날짜를 서버에 예약 요청하는 로직을 추가할 수 있습니다.
      // 이 예시에서는 선택한 날짜를 예약한 것으로 처리합니다.
      alert(`선택한 날짜(${selectedDate})에 예약되었습니다.`);
    } else {
      alert('날짜를 선택해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>날짜 선택</Text>
      </View>
      {/* 달력 추가 */}
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => handleDateSelection(day.dateString)}
          // 선택한 날짜 표시
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' },
          }}
        />
      </View>
      <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
        <Text style={styles.buttonText}>조회하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>뒤로 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    backgroundColor: 'lightblue',
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  dateSelectionContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  dateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  reserveButton: {
    backgroundColor: 'blue',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  goBackButton: {
    backgroundColor: 'lightgray',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  calendarContainer: {
    marginTop: 20,
  },
});

export default SelectDateScreen;
