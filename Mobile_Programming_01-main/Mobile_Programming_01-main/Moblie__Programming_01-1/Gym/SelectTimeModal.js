import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const SelectTimeModal = ({ visible, onClose, onSelectTime, initialSelectedTimes }) => {
  const [selectedTimes, setSelectedTimes] = useState(initialSelectedTimes || []);

  const times = Array.from({ length: 14 }, (_, i) => {
    // 09:00부터 22:00까지 1시간 간격으로 시간 목록 생성
    const hour = 9 + i;
    const startTime = `${hour < 10 ? `0${hour}` : hour}:00`;
    const endTime = `${hour + 1 < 10 ? `0${hour + 1}` : hour + 1}:00`;
    return { startTime, endTime };
  });

  const toggleTimeSelection = (timeSlot) => {
    const isSelected = selectedTimes.some((selectedTime) => {
      return (
        selectedTime.startTime === timeSlot.startTime &&
        selectedTime.endTime === timeSlot.endTime
      );
    });

    if (isSelected) {
      // 이미 선택한 시간이라면 선택 해제
      setSelectedTimes((prevSelectedTimes) => {
        return prevSelectedTimes.filter((selectedTime) => {
          return (
            selectedTime.startTime !== timeSlot.startTime ||
            selectedTime.endTime !== timeSlot.endTime
          );
        });
      });
    } else {
      // 선택한 시간이 아니라면 추가
      setSelectedTimes((prevSelectedTimes) => [...prevSelectedTimes, timeSlot]);
    }
  };

  const handleConfirmClick = () => {
    if (selectedTimes.length > 0) {
      onSelectTime(selectedTimes);
      onClose();
    } else {
      alert("시간을 선택하세요");
    }
  };

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>시간 선택</Text>
            <ScrollView>
              {times.map((timeSlot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeSlot,
                    selectedTimes.some((selectedTime) => {
                      return (
                        selectedTime.startTime === timeSlot.startTime &&
                        selectedTime.endTime === timeSlot.endTime
                      );
                    }) && styles.selectedTimeSlot
                  ]}
                  onPress={() => {
                    toggleTimeSelection(timeSlot);
                  }}
                >
                  <Text style={styles.timeSlotText}>
                    {timeSlot.startTime} - {timeSlot.endTime}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmClick}>
              <Text style={styles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalWrapper: {
    maxWidth: windowWidth * 0.8, // 화면 넓이의 80%로 제한
    alignSelf: 'center', // 수평 가운데 정렬
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    maxHeight: '50%', // 팝업창의 높이 제한
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  timeSlot: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  selectedTimeSlot: {
    backgroundColor: 'lightgray',
  },
  timeSlotText: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SelectTimeModal;
