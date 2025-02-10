import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {API_URL} from '../../constants/constants';
import {useAppDispatch, useAppSelector} from '../../store';
import {
  createComment,
  fetchComments,
} from '../../store/slices/commentSlice/commentSlice';
import {formatDate} from '../../utils/formatDate';

const PostScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<any>();
  const {postId, postContent, authorName, authorAvatar, createdAt} =
    route.params;
  const [newComment, setNewComment] = useState('');

  const {comments, loading} = useAppSelector(state => state.comments);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleSubmitComment = async () => {
    if (newComment.trim()) {
      try {
        await dispatch(createComment({content: newComment, postId})).unwrap();
        setNewComment('');
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };

  // Функція для визначення часу доби
  const isDayTime = () => {
    const hours = new Date().getHours();
    return hours >= 6 && hours < 18; // День з 6:00 до 18:00
  };

  const backgroundStyle = {
    backgroundColor: isDayTime() ? '#f5f5f5' : '#9becfa',
  };

  return (
    <ScrollView style={[styles.container, backgroundStyle]}>
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <Image source={{uri: authorAvatar}} style={styles.avatar} />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{authorName}</Text>
            <Text style={styles.date}>{createdAt}</Text>
          </View>
        </View>
        <Text style={styles.content}>{postContent}</Text>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comments</Text>

        <View style={styles.commentForm}>
          <TextInput
            style={styles.commentInput}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Write a comment..."
            multiline
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitComment}>
            <Text style={styles.submitButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          comments.map(comment => (
            <View key={comment?.id} style={styles.commentContainer}>
              <View style={styles.commentHeader}>
                <Image
                  source={{uri: `${API_URL}/${comment?.User?.avatarUrl}`}}
                  style={styles.commentAvatar}
                />
                <View style={styles.commentAuthorInfo}>
                  <Text style={styles.commentAuthorName}>
                    {comment?.User?.name}
                  </Text>
                  <Text style={styles.commentDate}>
                    {formatDate(comment?.createdAt)}
                  </Text>
                </View>
              </View>
              <Text style={styles.commentContent}>{comment?.content}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  commentsSection: {
    padding: 15,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  commentForm: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    minHeight: 40,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentAuthorInfo: {
    flex: 1,
  },
  commentAuthorName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default PostScreen;
