/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import TradingScreen from './src/screens/TradingScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
        <TradingScreen />
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
