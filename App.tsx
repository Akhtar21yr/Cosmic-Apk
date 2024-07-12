// import 'react-native-gesture-handler'
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import { enableScreens } from 'react-native-screens';
import { SafeAreaView, StatusBar, StatusBarStyle, StatusBarAnimation } from 'react-native';
// import MyDrawer from './components/Drawer';

enableScreens();

function App(): React.JSX.Element {

  return (
    <>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
        hidden={false}
      />
      <SafeAreaView style={{ flex: 1 }}>
        {/* <MyDrawer/> */}
        <Navigation />
      </SafeAreaView>
    </>
  );
}

export default App;
