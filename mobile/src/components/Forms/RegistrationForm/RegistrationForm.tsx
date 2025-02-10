import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as ImagePicker from 'react-native-image-picker';
import {useAppDispatch} from '../../../store';
import {registerUser} from '../../../store/slices/authSlice/authSlice';

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  name: string;
  avatar?: any;
}

const RegistrationForm = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegistrationData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      name: '',
    },
  });

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        if (response.assets?.[0]?.uri) {
          setAvatar(response.assets[0].uri);
        }
      },
    );
  };

  const onSubmit = async (data: RegistrationData) => {
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('name', data.name);

      if (avatar) {
        formData.append('avatar', {
          uri: avatar,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });
      }

      await dispatch(registerUser(formData));
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>

      <TouchableOpacity onPress={selectImage} style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{uri: avatar}} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text>Select Avatar</Text>
          </View>
        )}
      </TouchableOpacity>

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
        rules={{
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={styles.errorText}>Please enter a valid email.</Text>
      )}

      <Controller
        control={control}
        rules={{required: true, minLength: 6}}
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
        <Text style={styles.errorText}>
          Password must be at least 6 characters.
        </Text>
      )}

      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.errorText}>This is required.</Text>}

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegistrationForm;
