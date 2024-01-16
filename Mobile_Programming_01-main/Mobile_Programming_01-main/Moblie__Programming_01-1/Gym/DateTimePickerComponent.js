import React, { useState } from 'react';
import { View, Text, Platform, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerComponent = ({ onClose, onDateChange, onTimeChange }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    if (mode === 'date') {
      Alert.alert("Selected Date", currentDate.toLocaleDateString());
      onDateChange(currentDate.toLocaleDateString());
    } else {
      Alert.alert("Selected Time", currentDate.toLocaleTimeString());
      onTimeChange(currentDate.toLocaleTimeString());
    }
  };

  const showDatepicker = () => {
    setMode('date');
    setShow(true);
  };

  const showTimepicker = () => {
    setMode('time');
    setShow(true);
  };

  return (
    <View style={styles.modal}>
      <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        <Text style={styles.buttonText}>날짜 선택</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showTimepicker} style={styles.button}>
        <Text style={styles.buttonText}>시간 선택</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minuteInterval={30}
        />
      )}
      <TouchableOpacity onPress={onClose} style={styles.button}>
        <Text style={styles.buttonText}>닫기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginVertical: 5,
      width: 150,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    modal: {
        position: 'absolute',
        top: '16%',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
      }
  });

export default DateTimePickerComponent;
