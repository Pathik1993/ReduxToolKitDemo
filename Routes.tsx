import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {store} from './src/store/store';
import {Provider} from 'react-redux';

import HomeScreen from './src/screen/HomeScreen';
const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default Routes;
