import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface TableProps {
    data: any;
    loading: boolean; 
    colDef: string[];
    title: string;
}

const formatInt = (num: any) => {
  if (isNaN(num)) return num;
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 }).format(
    num,
  );
};

const Table: React.FC<TableProps> = ({ data, loading, colDef, title }) => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      evenCell: {
        backgroundColor: '#fcfcfc'
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
        paddingTop: 0,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#dde2eb',
      },
      tableHeader: {
        borderBottomWidth: 0,
      },
      cell: {
        fontSize: 13,
        color: 'black',
        width: `${100/colDef.length}%`,
        textAlign: 'center',
      },
      thead: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        fontWeight: 'bold',
      },
      text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
      },
    });
  
    const opacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });
  
    const renderItem = ({ item, index }: { item: any; index: any }) => {
      const isEven = index % 2 === 0;
      return (
        <View style={[styles.row, isEven ? styles.evenCell : null]}>
          {colDef.map((col, colIndex) => (
            <Text key={colIndex} style={[styles.cell]}>{formatInt(item[col])}</Text>
          ))}
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
  
    console.log('Data:', data); // Debugging statement
  
    return (
      <LinearGradient colors={['#780206', '#061161']} style={styles.container}>
        <Animated.View style={[styles.innerContainer, animatedStyle]}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.row, styles.tableHeader]}>
            {colDef.map((col, index) => (
              <Text key={index} style={[styles.cell, styles.thead]}>{col}</Text>
            ))}
          </View>
          {data ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.table}
            />
          ) : (
            <Text style={styles.text}>No data available</Text>
          )}
        </Animated.View>
      </LinearGradient>
    );
  };
  
  export default Table;
  