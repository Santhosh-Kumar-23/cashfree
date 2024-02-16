/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CasfFree from './src/cashFree';

function App() {
  const Root = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen name="CasfFree" component={CasfFree} />
      </Root.Navigator>
    </NavigationContainer>
  );
}

export default App;
