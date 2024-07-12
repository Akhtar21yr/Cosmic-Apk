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
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 20 }).format(
    num,
  );
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
        // Set columns dynamically based on data keys
        const keys = Object.keys(data[0] || {});
        setColumns(keys);

        // Set data with the fetched data
        setData(data.reverse());

        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isEven = index % 2 === 0;
    return (
      <View style={styles.rowContainer}>
        <View style={[styles.stickyCell, isEven ? styles.evenCell : null]}>
          <Text style={styles.cellText}>{item[columns[0]]}</Text>
        </View>
        <ScrollView horizontal  style={{  backgroundColor: 'red' }} >
          {columns.slice(1).map((column, colIndex) => (
            <View key={colIndex} style={styles.row}>

              <View  style={styles.cell}>
                <Text style={styles.cellText}>{formatInt(item[column])}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

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
        <Text style={styles.title}>Arb Income</Text>
        <View style={styles.headerContainer}>
          <View style={[styles.stickyCell, styles.headerCell]}>
            <Text style={styles.headerText}>{columns[0]}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            {columns.slice(1).map((column, index) => (
              <View key={index} style={styles.row}>
                <View  style={styles.cell}>
                  <Text style={styles.headerText}>{column}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.table}
        />
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
  evenCell: {
    backgroundColor: '#fcfcfc',
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
  table: {
    flexGrow: 1,
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dde2eb',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  cell: {
    fontSize: 13,
    color: 'black',
    minWidth: 100,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: '#dde2eb',
  },
  stickyCell: {
    minWidth: 100,
    backgroundColor: '#f9f9f9',
    zIndex: 1,
    borderRightWidth: 1,
    borderRightColor: '#dde2eb',
  },
  headerCell: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 5,
    minWidth: 100,
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Balances;
