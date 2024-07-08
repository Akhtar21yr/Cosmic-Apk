import React from "react";
import { TouchableOpacity,Text,StyleSheet,FlatList } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

interface TabItem {
  key: string;
  title: string;
}
function TypesOfIncomeScreen() : React.JSX.Element  {
  const navigation = useNavigation();
  const data: TabItem[] = [
    { key: 'MTM INCOME', title: 'MTM INCOME' },
    { key: 'CHARGES', title: 'Charges' },
    { key: 'ARB INCOME', title: 'ARB Income' },
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
}

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

export default TypesOfIncomeScreen