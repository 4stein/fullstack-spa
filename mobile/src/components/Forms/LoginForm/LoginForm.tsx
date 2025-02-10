import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useAppDispatch} from '../../../store';
import {loginUser} from '../../../store/slices/authSlice/authSlice';
import {useNavigation} from '@react-navigation/native';

interface LoginData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await dispatch(loginUser(data));
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username && (
        <Text style={styles.errorText}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.errorText}>This is required.</Text>
      )}

      <Button title="Login" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('Registration' as never)}>
        <Text style={styles.registerText}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default LoginForm;
