import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUser } from './UserContext';

type RootStackParamList = {
  MainScreen: { userId: string }; 
  BusScreen: undefined;
  GymScreen: { user: any };
  Lostmain: undefined;
};

type MainScreenRouteProp = RouteProp<RootStackParamList, 'MainScreen'>;
type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

interface MainScreenProps {
  route: MainScreenRouteProp;
  navigation: MainScreenNavigationProp;
}

const MainScreen: React.FC<MainScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [userInfo, setUserInfo] = useState<any>(null);
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>메인 화면</Text>
      <Text style={styles.userIdText}>로그인된 아이디: {userId}</Text>
      {/* 버스 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BusScreen')}
      >
        <Text style={styles.buttonText}>버스</Text>
      </TouchableOpacity>

      {/* 체육관 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GymScreen', { user: userInfo })}
      >
        <Text style={styles.buttonText}>체육관</Text>
      </TouchableOpacity>

      {/* 분실물 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lostmain')}
      >
        <Text style={styles.buttonText}>분실물</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>로그아웃</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  userIdText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default MainScreen;
