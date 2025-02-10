import React, {useEffect} from 'react';

import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';

import {PostCard, NewPostForm} from '../../components';
import {useAppDispatch, useAppSelector} from '../../store';
import {selectPosts} from '../../store/slices/postsSlice/postsSlice';
import {fetchPosts} from '../../store/slices/postsSlice/postsSlice';

const PostsScreen = () => {
  const dispatch = useAppDispatch();
  const {posts, loading} = useAppSelector(selectPosts);

  const isDayTime = () => {
    const hours = new Date().getHours();
    return hours >= 6 && hours < 18;
  };

  const backgroundStyle = {
    backgroundColor: isDayTime() ? '#f5f5f5' : '#9becfa',
  };

  useEffect(() => {
    dispatch(fetchPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, backgroundStyle]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <NewPostForm />
        {posts ? (
          posts?.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <Text>No posts</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostsScreen;
