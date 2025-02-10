import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../..';

interface Post {
  id: number;
  content: string;
  createdAt: string;
  User: {
    id: number;
    name: string;
    avatarUrl: string;
  };
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (content: string) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.post(
      `${API_URL}/posts`,
      {content},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  },
);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createPost.pending, state => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error creating post';
      })
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching posts';
      });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectPosts = (state: RootState) => state.posts;

export default postSlice.reducer;
