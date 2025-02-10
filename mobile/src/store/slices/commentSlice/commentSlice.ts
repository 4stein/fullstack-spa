import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Comment {
  id: number;
  content: string;
  postId: number;
  createdAt: string;
  User: {
    id: number;
    name: string;
    avatarUrl: string;
  };
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({content, postId}: {content: string; postId: number}) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Sending comment data:', {content, postId});
      console.log('Token:', token);

      const response = await axios.post(
        `${API_URL}/comments`,
        {content, postId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error('Create comment error details:', error.response?.data);
      throw error;
    }
  },
);

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    try {
      const response = await axios.get(`${API_URL}/comments/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Fetch comments error:', error);
      throw error;
    }
  },
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createComment.pending, state => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error creating comment';
      })
      .addCase(fetchComments.pending, state => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching comments';
      });
  },
});

export default commentSlice.reducer;
