import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import authReducer from './slices/authSlice/authSlice';
import postsReducer from './slices/postsSlice/postsSlice';
import commentReducer from './slices/commentSlice/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
