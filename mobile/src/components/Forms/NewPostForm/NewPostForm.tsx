import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../store';
import {createPost} from '../../../store/slices/postsSlice/postsSlice';

interface FormData {
  content: string;
}

const NewPostForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.posts.loading);

  const {control, handleSubmit, reset} = useForm<FormData>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(createPost(data.content)).unwrap();
      reset();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="What's on your mind?"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
          />
        )}
        name="content"
      />
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Post" onPress={handleSubmit(onSubmit)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default NewPostForm;
