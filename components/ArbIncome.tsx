import React, {useState, useEffect} from 'react';
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
  withSpring,
} from 'react-native-reanimated';

const formatInt = (num: any) => {
  if (isNaN(num)) return num;
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 20 }).format(
    num,
  );
};

const ArbScreen: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState({})

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(1);

    // Fetch data from the API
    fetch('https://www.cosmicrms.com/api/ld-lf/arbincome')
      .then(response => response.json())
      .then(data => {
        setData([
          {
            USERID: 'Useridd',
            NetMTM_USD: 456.7,
            INRMTM: 'INRMTM',
            ARB: 'ARB',
          },
          ...data.QUERY_ARB_TOTAL_DATA.reverse(),
        ]); // Reverse the data array

        const total = {}

        data.QUERY_ARB_TOTAL_DATA.forEach(({e}: {e:any}) => {
            
        })


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

  const renderItem = ({item, index}: {item: any; index: any}) => {
    const isFirst = index === 0;
    const isEven = (index%2 ===0);
    return (
      <View style={[styles.row, isEven? styles.evencell :null]}>
        <Text style={[styles.cell]}>{item.userid}</Text>
        <Text style={[styles.cell]}>{formatInt(item.netmtm_usd)}</Text>
        <Text style={[styles.cell, {paddingLeft: '2%'}]}>
          {formatInt(item.inrmtm)}
        </Text>
        <Text style={[styles.cell, {paddingLeft: '3%'}]}>
          {formatInt(item.arb)}
        </Text>
        
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
  // { console.log({data})}

  return (
    <LinearGradient colors={['#780206', '#061161']} style={styles.container}>
      <Animated.View style={[styles.innerContainer, animatedStyle]}>
        <Text style={styles.title}>Arb Income</Text>
        <View style={[styles.row, styles.tableheader]}>
          <Text style={[styles.cell, styles.thead]}>Userid</Text>
          <Text style={[styles.cell, styles.thead]}>NetMTM_USD</Text>
          <Text style={[styles.cell, styles.thead, {paddingLeft: '2%'}]}>
            INRMTM
          </Text>
          <Text style={[styles.cell, styles.thead, {paddingLeft: '3%'}]}>
            ARB
          </Text>
        </View>
        {data ? (
         
          
          <FlatList
          
            data={data.slice(1)} // Remove the header row from data
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.table}
            // ListHeaderComponent={renderHeader}
            // stickyHeaderIndices={[0]} // Make the header sticky
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
  evencell:{
    backgroundColor:'#fcfcfc'
    // backgroundColor:'#dccdcfa6',
  },
  innerContainer: {
    width: '95%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff', // Optional: semi-transparent overlay
    // backgroundColor: 'red', // Optional: semi-transparent overlay
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
    paddingTop: 0, // Added padding top for better spacing
    // overflow: 'scroll',
    // height: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#dde2eb',
  },
  tableheader: {
    borderBottomWidth: 0,
  },
  cell: {
    fontSize: 13,
    color: 'black',
    width: '25%', // Adjusted width to fit four cells in a row
    textAlign: 'center',
  },
  thead: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    fontWeight: 'bold',
    // zIndex: 1,
    // backgroundColor: 'red',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ArbScreen;
