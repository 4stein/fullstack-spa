import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../..';
import {API_URL} from '../../../constants/constants';
import {replace} from '../../../navigation/navigationService';

interface IAuthState {
  userData: null | any;
  isAuth: boolean | null;
}

const initialState: IAuthState = {
  userData: null,
  isAuth: null,
};

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        return {
          isAuth: false,
          userData: null,
        };
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        name: response.data.user.name,
        avatarUrl: response.data.user.avatarUrl,
      };

      return {
        userData: userData,
        isAuth: true,
      };
    } catch (error) {
      await AsyncStorage.removeItem('userToken');

      return rejectWithValue({
        isAuth: false,
        userData: null,
      });
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData: any) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Registration successful:', response.data);

      await AsyncStorage.setItem('userToken', response.data.token);

      const userData = {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        name: response.data.user.name,
        avatarUrl: response.data.user.avatarUrl,
      };

      replace('Posts', {});
      return {
        userData,
        isAuth: true,
      };
    } catch (error) {
      console.log((error as Error).message);
      return {
        isAuth: false,
      };
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: {email: string; password: string}) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: data.email.toLowerCase(),
        password: data.password,
      });
      console.log('Login successful:', response.data);

      await AsyncStorage.setItem('userToken', response.data.token);

      const userData = {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        name: response.data.user.name,
        avatarUrl: response.data.user.avatarUrl,
      };

      replace('Posts', {});

      return {
        userData,
        isAuth: true,
      };
    } catch (error) {
      console.log((error as Error).message);
      return {
        isAuth: false,
      };
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload?.userData) {
          state.userData = action.payload.userData;
        }
        state.isAuth = action.payload?.isAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload?.userData) {
          state.userData = action.payload.userData;
        }
        state.isAuth = action.payload?.isAuth;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.isAuth = action.payload.isAuth;
      })
      .addCase(checkAuth.rejected, (state, action: any) => {
        state.userData = action.payload?.userData;
        state.isAuth = action.payload?.isAuth;
      });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
