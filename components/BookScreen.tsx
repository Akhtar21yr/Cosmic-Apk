import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const BookScreen: React.FC = () => {
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <LinearGradient colors={['#780206', '#061161']} style={styles.container}>
      <Animated.View style={[styles.innerContainer, animatedStyle]}>
        <Text style={styles.text}>No Data to display❗</Text>
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
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(201, 209, 203, 0.8)', // Optional: semi-transparent overlay
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    fontSize: 13,
    color: 'black',
    width: '25%', // Adjusted width to fit four cells in a row
    // textAlign: 'center',
    
  },
  thead: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontWeight: 'bold',

  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default BookScreen;
