import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBarStyle } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from './DashBoard';
import TypesOfIncome from './TypesOfIncomeScreen';
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
import GrpUsd from './GrpUsd'
import Balances from './Balances';
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const DrawerNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="DASH BOARD" component={DashBoard} />
        <Drawer.Screen name="SOURCE OF INCOME" component={TypesOfIncome} />
        <Drawer.Screen name="ARB MTM CLIENT" component={ArbScreen} />
        <Drawer.Screen name="BALANCES" component={Balances} />
      </Drawer.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen name="CHARGES" component={Charges} />
        <Stack.Screen name="BOOK" component={BookScreen} />
        <Stack.Screen name="ARB NET TOTAL" component={ArbNetTotal} />
        <Stack.Screen name="MTM INCOME" component={MtmIncome} />
        <Stack.Screen name="COSMIC MTM INCOME" component={CosmicMtmIncome} />
        <Stack.Screen name="SPECTRA MTM INCOME" component={SpectraMtmincome} />
        <Stack.Screen name="ARB INCOME" component={ArbIncome} />
        <Stack.Screen name="Login" component={SignIn} />
        <Stack.Screen name="GRP USD" component={GrpUsd} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default DrawerNavigator;

// const Stack = createNativeStackNavigator();

// // const Navigation: React.FC = () => {
// //   return (
// //     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="CHARGES" component={Charges} />
//         <Stack.Screen name="BOOK" component={BookScreen} />
//         <Stack.Screen name="ARB NET TOTAL" component={ArbNetTotal} />
//         <Stack.Screen name="MTM INCOME" component={MtmIncome} />
//         <Stack.Screen name="COSMIC MTM INCOME" component={CosmicMtmIncome} />
//         <Stack.Screen name="SPECTRA MTM INCOME" component={SpectraMtmincome} />
//         <Stack.Screen name="ARB INCOME" component={ArbIncome} />
//         <Stack.Screen name="Login" component={SignIn} />
//         <Stack.Screen name="GRP USD" component={GrpUsd} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Navigation;









// import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomePage from './HomePage';
// import MtmIncome from './MtmIncome';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';



// const Drawer = createDrawerNavigator();



// const Navigation: React.FC = () => {
//   return (
//     <NavigationContainer>
// <Drawer.Navigator>
// <Drawer.Screen name="Home" component={HomePage} />
// <Drawer.Screen name="MtmIncome" component={MtmIncome} />
// </Drawer.Navigator>
// //     </NavigationContainer>
//   );
// };

// export default Navigation;

