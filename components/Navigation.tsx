import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Button, List } from 'react-native-paper';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import DashBoard from './DashBoard';
import TypesOfIncome from './TypesOfIncomeScreen';
import Charges from './Charges';
import ArbScreen from './ArbScreen';
import BookScreen from './BookScreen';
import ArbNetTotal from './ArbNetTotal';
import MtmIncome from './MtmIncome';
import CosmicMtmIncome from './CosmicMtmIncome';
import SpectraMtmincome from './SpectraMtmincome';
import ArbIncome from './ArbIncome';
import SignIn from './Login';
import GrpUsd from './GrpUsd';
import Balances from './Balances';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import downarrow from './assets/down-arrow.png'
import uparrow from './assets/arrow-up.png'

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();




const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="DASH BOARD"
        onPress={() => props.navigation.navigate('DASH BOARD')}
      />
      <List.Section title="Accordions">
        <List.Accordion
          title="SOURCE OF INCOME"
          expanded={expanded}
          right={props => <List.Icon {...props} icon={expanded?uparrow:downarrow} />}
          // right={props => <Icon {...props} name="arrow" color='red' size={40} />}
          onPress={handlePress}
        >
          <List.Item
            title="MTM INCOME"
            onPress={() => props.navigation.navigate('MTM INCOME')}
          />
          <List.Item
            title="Charges"
            onPress={() => props.navigation.navigate('Charges')}
          />
          <List.Item
            title="ARB Income"
            onPress={() => props.navigation.navigate('ARB INCOME')}
          />
        </List.Accordion>
      </List.Section>

      <DrawerItem
        label="ARB MTM CLIENT"
        onPress={() => props.navigation.navigate('ARB MTM CLIENT')}
      />
      <DrawerItem
        label="BALANCES"
        onPress={() => props.navigation.navigate('BALANCES')}
      />
      <DrawerItem
        label="GRP USD"
        onPress={() => props.navigation.navigate('GRP USD')}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="DASH BOARD" component={DashBoard} />
          <Drawer.Screen name="SOURCE OF INCOME" component={TypesOfIncome} />
          <Drawer.Screen name="ARB MTM CLIENT" component={ArbScreen} />
          <Drawer.Screen name="BALANCES" component={Balances} />
          <Drawer.Screen name="GRP USD" component={GrpUsd} />
          <Drawer.Screen name="MTM INCOME" component={MtmIncome} />
          <Drawer.Screen name="Charges" component={Charges} />
          <Drawer.Screen name="ARB INCOME" component={ArbIncome} />
        </Drawer.Navigator>
      </PaperProvider>
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

