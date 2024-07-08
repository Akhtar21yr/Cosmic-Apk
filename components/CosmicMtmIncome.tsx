import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const formatInt = (num: any) => {
  if (isNaN(num)) return num;
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const CosmicMtmIncome: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [totalSum, setTotalSum] = useState(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(1);

    // Fetch data from the API
    fetch('https://www.cosmicrms.com/api/ld-lf/cosmicmtm')
      .then(response => response.json())
      .then(data => {
        setData([{ symbol: 'Symbol', total_client_sharing: 'Total Client Sharing' }, ...data]);
        calculateTotal(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const calculateTotal = (data: any[]) => {
    let sum = 0;
    data.forEach(item => {
      sum += parseFloat(item.total_client_sharing);
    });
    setTotalSum(sum);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const renderItem = ({ item, index }: { item: any, index: any }) => {
    let sum = 0
    const isFirst = index === 0;
    const isEven = index % 2 === 0;
    return (
      <View style={[styles.row, !isFirst && isEven ? styles.evenCell : null]}>
        <Text style={[styles.cell, isFirst && styles.thead]}>{item.symbol}</Text>
        <Text style={[styles.cell, isFirst && styles.thead]}>{formatInt(item.total_client_sharing)}</Text>
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
        <Text style={styles.title}>Cosmic Mtm</Text>
        {data ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.table}
            ListFooterComponent={() => (
              <View style={styles.footer}>
                <Text style={[styles.cell, styles.totalText]}>Total:</Text>
                <Text style={[styles.cell, styles.totalValue]}>{formatInt(totalSum)}</Text>
              </View>
            )}
            stickyHeaderIndices={[0]}
          />
        ) : (
          <Text style={styles.text}>No data available</Text>
        )}
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
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff', // Optional: semi-transparent overlay
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
    paddingTop: 10, // Added padding top for better spacing
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#dde2eb',
  },
  cell: {
    fontSize: 13,
    color: 'black',
    width: '50%', // Adjusted width to fit two cells in a row
    textAlign: 'center',
  },
  thead: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#dde2eb',
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
  },
  totalValue: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CosmicMtmIncome;
