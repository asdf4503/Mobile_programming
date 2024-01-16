import React from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GymScreen from './Gym/GymScreen';
import MainScreenComponent from './MainScreenComponent';
import Lostmain from './Lost/Lostmain';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import SignUpScreen from './SignUpScreen';
import { getDatabase, ref, get } from 'firebase/database';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { UserProvider } from './UserContext';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBXUzRZUsZFIGV39slh99y1OnLZmFhoLJ4",
  authDomain: "mobile2302.firebaseapp.com",
  projectId: "mobile2302",
  storageBucket: "mobile2302.appspot.com",
  messagingSenderId: "138242247000",
  appId: "1:138242247000:web:11e1b325563b8b995e7d2d",
  measurementId: "G-MC7HGHBJY7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const MainScreen = ({ navigation }) => {
  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + id);
      const snapshot = await get(userRef);

      if (snapshot.exists() && snapshot.val().password === password) {
        navigation.navigate('MainScreenComponent', { userId: id });
      } else {
        Alert.alert(
          "로그인 실패",
          "ID 또는 PW가 일치하지 않습니다."
        );
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
      alert("로그인 중 에러 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.headerContainer} colors={['#a0a0a0', '#f8f9fa', '#f8f9fa']}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('./../assets/GWNU-LOGO.png')}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>국립 강릉원주대학교</Text>
          <Text style={styles.subHeader}>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
        </View>
        <View style={styles.spacer} />
      </LinearGradient>

      <View style={styles.bodyContainer}>
        <View style={styles.bodyTopContainer}>
        </View>
        <View style={styles.bodyMiddleContainer}>
          <View style={styles.IDbottom}>
            <TextInput
              style={styles.input}
              placeholder="아이디"
              placeholderTextColor="#808080"
              value={id}
              onChangeText={setId}
            />
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              placeholderTextColor="#808080"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text style={styles.signupButtonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bodyBottomContainer} />
      </View>

      <View style={styles.bottomImageContainer}>
        <ImageBackground
          source={require('./../assets/teamLogo.png')}
          style={styles.bottomImageStyle}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainScreenComponent"
            component={MainScreenComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GymScreen"
            component={GymScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lostmain"
            component={Lostmain}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    width: '100%',
    height: hp('15%'),
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    width: wp('20%'),
  },
  imageStyle: {
    top: hp('1%'),
    width: wp('16%'),
    height: hp('7%'),
    left: wp('9%'),
  },

  textContainer: {
    width: wp('60%'),
    alignItems: 'center',
  },

  textStyle: {
    fontSize: hp('3%'),
    top: hp('1%'),
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#343a40',
  },
  spacer: {
    width: wp('18%'),
  },

  subHeader: {
    fontSize: hp('1%'),
    top: hp('2%'),
    fontWeight: 'bold',
    color: '#868296',
  },
  bodyContainer: {
    height: hp('72%'),
    width: wp('100%'),

  },
  bodyTopContainer: {
    backgroundColor: '#f8f9fa',
    height: hp('15%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bodyMiddleContainer: {
    height: hp('40%'),
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    paddingHorizontal: wp('10%'),
  },

  bodyBottomContainer: {
    height: hp('15%'),
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomImageContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('16%'),
    backgroundColor: '#f8f9fa',
  },

  bottomImageStyle: {
    width: wp('40%'),
    height: hp('15%'),
  },
  loginFormContainer: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: hp('2%'),
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#666666',
  },

  loginButton: {
    width: '100%',
    padding: hp('2%'),
    borderRadius: wp('3%'),
    backgroundColor: '#343a40',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#808080',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;