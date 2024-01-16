import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './Moblie_Programming_01/Moblie_Programming_01-1/App';
import GymScreen from './GymScreen';
import Lostmain from './Lostmain';
import SignUpScreen from './SignUpScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen 
          name="Main" 
          component={App} 
          options={{ headerShown: false}} 
        />
        <Stack.Screen 
          name="GymScreen" 
          component={GymScreen} 
        />
        <Stack.Screen 
          name="Lostmain" 
          component={Lostmain} 
        />
        <Stack.Screen 
          name="SignUpScreen" 
          component={SignUpScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
