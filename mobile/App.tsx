import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {navigationRef} from './src/navigation/navigationService';
import Navigation from './src/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
