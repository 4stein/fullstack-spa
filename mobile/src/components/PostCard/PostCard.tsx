import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import message from '../../assets/images/message.png';
import {API_URL} from '../../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../../utils/formatDate';

interface PostType {
  id: number;
  content: string;
  createdAt: string;
  User: {
    id: number;
    name: string;
    avatarUrl: string;
  };
}

const PostCard = ({post}: {post: PostType}) => {
  const navigation = useNavigation();
  const date = formatDate(post.createdAt);

  const avatar = `${API_URL}/${post.User?.avatarUrl}`;

  const handleNavigateToPost = () => {
    //@ts-ignore
    navigation.navigate('Post', {
      postId: post.id,
      postContent: post.content,
      authorName: post.User?.name,
      authorAvatar: avatar,
      createdAt: date,
    });
  };

  return (
    <>
      {avatar && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={{uri: avatar}} style={styles.avatar} />
            <View style={styles.description}>
              <Text style={styles.name}>{post.User?.name}</Text>
              <Text style={styles.date}>{date}</Text>
              <TouchableOpacity onPress={handleNavigateToPost}>
                <Image source={message} style={styles.message} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentText}>{post.content}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  description: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  name: {
    flexDirection: 'column',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  date: {
    flexDirection: 'column',
    color: 'black',
    fontSize: 16,
    marginRight: 10,
  },
  message: {
    flexDirection: 'column',
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: 3,
  },
  content: {
    flexDirection: 'column',
    padding: 10,
    paddingLeft: 0,
    backgroundColor: 'white',
  },
  contentText: {
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
});

export default PostCard;
