import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeekSlider from './weekSlider';


interface TabItem {
  key: string;
  title: string;
}

const DashBoard: React.FC = () => {
  const navigation = useNavigation();

  if  (!AsyncStorage.getItem('sessionData')) {
    navigation.navigate('Login');
  }

  const data: TabItem[] = [
    { key: 'SOURCE OF INCOME', title: 'SOURCE OF INCOME' },
    { key: 'ARB MTM CLIENT', title: 'ARB MTM CLIENT' },
    { key: 'BALANCES', title: 'BALANCES' },
    { key: 'BOOK', title: 'BOOK' },
  ];

  const handleTabPress = (key: string) => {
    navigation.navigate(key);
  };

  const renderItem = ({ item }: { item: TabItem }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleTabPress(item.key)}>
      <Text style={styles.tabText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#780206', '#061161']} style={styles.container}>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    
  },
  itemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 10
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: "center",

  },
});

export default DashBoard;
