const db = require('../models');
const Post = db.Post;
const User = db.User;

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'avatarUrl', 'username'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Error getting posts' });
  }
};

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;

    const post = await Post.create({
      content,
      userId,
    });

    const postWithUser = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'avatarUrl', 'username'],
        },
      ],
    });

    res.status(201).json(postWithUser);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

module.exports = {
  getPosts,
  createPost,
};
