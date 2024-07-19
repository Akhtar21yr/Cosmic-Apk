import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const formatInt = (num: any) => {
  if (isNaN(num)) return num;
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 20 }).format(num);
};

const Balances: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState<string[]>([]);

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(1);

    // Fetch data from the API
    fetch('https://www.cosmicrms.com/api/ld-lf/balance')
      .then(response => response.json())
      .then(data => {
        console.log("response");
        
        const keys = Object.keys(data[0] || {});
        setColumns(keys);
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.rowContainer}>
      {columns.map((column, colIndex) => (
        <View key={colIndex} style={styles.cell}>
          <Text style={styles.cellText}>{colIndex === 0 ? item[column] : formatInt(item[column])}</Text>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <LinearGradient colors={['#780206', '#061161']} style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#780206', '#061161']} style={styles.container}>
      <Animated.View style={[styles.innerContainer, animatedStyle]}>
        {/* <Text style={styles.title}>Balance</Text> */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.headerContainer}>
              {columns.map((column, index) => (
                <View key={index} style={styles.headerCell}>
                  <Text style={styles.headerText}>{column.toUpperCase()}</Text>
                </View>
              ))}
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true} // Disable FlatList scrolling
            />
          </View>
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '95%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dde2eb',
  },
  cell: {
    width: 100,  // Set a fixed width for consistency
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: '#dde2eb',
  },
  headerCell: {
    width: 100,  // Set the same fixed width as body cells
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 13,
    color: 'black',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Balances;
