import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {StatusBarStyle} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import TypesOfIncome from  './TypesOfIncomeScreen';
import Charges from './Charges';
import ArbScreen from './ArbScreen';
import BookScreen from './BookScreen';
import { StatusBar } from 'react-native';
import ArbNetTotal from './ArbNetTotal'
import MtmIncome from './MtmIncome'
import CosmicMtmIncome from './CosmicMtmIncome'
import SpectraMtmincome from './SpectraMtmincome'
import ArbIncome from './ArbIncome'
import SignIn from './Login'



const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="TYPES OF INCOME" component={TypesOfIncome} />
        <Stack.Screen name="ARB CL" component={ArbScreen} />
        <Stack.Screen name="CHARGES" component={Charges} />
        <Stack.Screen name="BOOK" component={BookScreen} />
        <Stack.Screen name="ARB NET TOTAL" component={ArbNetTotal} />
        <Stack.Screen name="MTM INCOME" component={MtmIncome} />
        <Stack.Screen name="COSMIC MTM INCOME" component={CosmicMtmIncome} />
        <Stack.Screen name="SPECTRA MTM INCOME" component={SpectraMtmincome} />
        <Stack.Screen name="ARB INCOME" component={ArbIncome} />
        <Stack.Screen name="Login" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
