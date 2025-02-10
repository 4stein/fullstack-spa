import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  PostsScreen,
  LoginScreen,
  RegistrationScreen,
  PostScreen,
} from '../screens';
import {useAppDispatch, useAppSelector} from '../store';
import {checkAuth, selectAuth} from '../store/slices/authSlice/authSlice';

export enum ScreenNames {
  LOGIN = 'Login',
  REGISTRATION = 'Registration',
  POSTS = 'Posts',
  POST = 'Post',
}

const Stack = createStackNavigator();

const Navigation = () => {
  const dispatch = useAppDispatch();
  const {isAuth} = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await dispatch(checkAuth());
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName={isAuth ? ScreenNames.POSTS : ScreenNames.LOGIN}>
      <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={ScreenNames.REGISTRATION}
        component={RegistrationScreen}
      />
      <Stack.Screen name={ScreenNames.POSTS} component={PostsScreen} />
      <Stack.Screen name={ScreenNames.POST} component={PostScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navigation;
