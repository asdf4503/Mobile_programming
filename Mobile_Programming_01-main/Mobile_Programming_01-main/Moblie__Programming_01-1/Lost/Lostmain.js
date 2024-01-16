import React, { useState, createContext, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const LostItemContext = createContext();

function AddItemScreen({ navigation }) {
  const [itemType, setItemType] = useState('');
  const [location, setLocation] = useState('');
  const { addItem } = useContext(LostItemContext);

  const handleAddItem = () => {
    if (itemType && location) {
      addItem({ itemType, location });
      navigation.goBack();
    }
  };

  return (
    <View>
      <Text>분실물 등록 화면</Text>
      <TextInput
        style={styles.input}
        placeholder="분실물의 종류"
        placeholderTextColor="gray"
        value={itemType}
        onChangeText={(text) => setItemType(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="습득 장소"
        placeholderTextColor="gray"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <Button title="등록" onPress={handleAddItem} />
    </View>
  );
}

function LostmainScreen({ navigation }) {
  const { items, addItem } = useContext(LostItemContext);

  return (
    <View>
      <Text>분실물 관리</Text>
      <Button title="등록" onPress={() => navigation.navigate('AddItem')} />
      <Text>등록된 물품:</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemType}>{item.itemType}</Text>
          <Text>{item.location}</Text>
        </View>
      ))}
    </View>
  );
}

function Lostmain() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <LostItemContext.Provider value={{ items, addItem }}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={LostmainScreen} 
          options={{ title: '분실물 관리' }} 
        />
        <Stack.Screen 
          name="AddItem" 
          component={AddItemScreen} 
          options={{ title: '분실물 등록' }} 
        />
      </Stack.Navigator>
    </LostItemContext.Provider>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  itemType: {
    flex: 1,
    paddingRight: 10,
  }
});

export default Lostmain;

//ddd