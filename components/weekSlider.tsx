import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import LinearGradient from 'react-native-linear-gradient';

const WeekSlider: React.FC = () => {
  const [startWeek, setStartWeek] = useState<number>(1);
  const [endWeek, setEndWeek] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>(null); // State to store fetched data

  const weeks = Array.from({ length: 25 }, (_, i) => i + 1);

  const handleConfirm = () => {
    setOpen(false);

    // Fetch data from the API
    fetch(`https://www.cosmicrms.com/api/ld-lf/arbweek?week1=${startWeek}&week2=${endWeek}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        // Handle data as needed
        console.log('Fetched data:', data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error
      });
  };

  return (
    <LinearGradient colors={['#780206', '#061161']} style={styles.container}>

      {!open && (
        <TouchableOpacity style={styles.card} onPress={() => setOpen(true)}>
          <Text style={styles.cardText}>Select Week</Text>
        </TouchableOpacity>
      )}
      {open && (
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <View style={styles.pickerColumn}>
              <Text style={styles.label}>Start Week</Text>
              <WheelPicker
                data={weeks.map(week => `Week ${week}`)}
                selectedItem={startWeek - 1}
                onItemSelected={index => setStartWeek(index + 1)}
                style={styles.picker}
              />
            </View>
            <View style={styles.pickerColumn}>
              <Text style={styles.label}>End Week</Text>
              <WheelPicker
                data={weeks.map(week => `Week ${week}`)}
                selectedItem={endWeek - 1}
                onItemSelected={index => setEndWeek(index + 1)}
                style={styles.picker}
              />
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setOpen(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {data && !open && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Fetched Data:</Text>
          {/* <View style={styles.table}> */}
            <View style={styles.row}>
              {Object.keys(data[0]).map((key, index) => (<View key={index} style={styles.cell}>
                <Text  style={[ styles.headercell]}>{key}</Text>
                <Text style={[styles.datacell]}>{data[0][key]}</Text>
                </View>
              ))}
            </View>
            {/* <View style={styles.row}>
              {Object.keys(data[0]).map((key, index) => (
                <Text key={index} style={styles.cell}>{data[0][key]}</Text>
              ))}
            </View> */}
          {/* </View> */}

          {/* {Object.keys(data[0]).map((key, index) => (
            <View style={styles.table}>
              <View key={index} style={styles.row}>
                <Text style={[styles.dataText, styles.cell]}>{key}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.dataText, styles.cell]}>{data[0][key]}</Text>
              </View>
            </View>
          ))} */}
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    overflow: 'scroll'
  },
  card: {
    marginTop: '1%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  cardText: {

    fontSize: 18,
    fontWeight: 'bold',
    color: '#061161',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    width:"80%"
  },
  pickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  pickerColumn: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    width: 120,
    height: 150,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    // marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#061161',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal:15
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dataContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',


  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#061161',
    marginBottom: 10,
  },
  dataText: {
    fontSize: 16,
    color: '#061161',
  },
  table: {
    borderWidth: 1,
    borderColor: "black",
  },
  row: {
    width:"100%",
    marginBottom : 10,
    
  },
  cell: {
    // flex: 1,
    padding: 10,
    borderWidth: 1,
    width: "100%",
    height: 70,
    textAlign: "center",
    fontSize: 14,
    color: "black",
    borderColor: "black",
    marginVertical:5,
    borderRadius:10
    
  },
  headercell:{
    fontWeight:'bold',
    borderBottomWidth:0,
    color: "black",textAlign:"center"
    
  },
  datacell:{
marginBottom:10,fontWeight:'500',
borderTopWidth:0,
color: "black",textAlign:"center"
  }
});

export default WeekSlider;
