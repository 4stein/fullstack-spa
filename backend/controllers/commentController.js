const db = require('../models');

const createComment = async (req, res) => {
  try {
    // Додаємо логування для відстеження проблеми
    console.log('Request body:', req.body);
    console.log('User ID:', req.userId);

    const { content, postId } = req.body;
    const userId = req.userId;

    // Перевіряємо наявність всіх необхідних даних
    if (!content || !postId || !userId) {
      return res.status(400).json({
        message: 'Missing required fields',
        received: { content, postId, userId },
      });
    }

    // Створюємо коментар
    const comment = await db.Comment.create({
      content,
      postId,
      userId,
    });

    // Отримуємо коментар з інформацією про користувача
    const commentWithUser = await db.Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'name', 'avatarUrl'],
        },
      ],
    });

    res.status(201).json(commentWithUser);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      message: 'Error creating comment',
      error: error.message,
    });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log('Fetching comments for post:', postId);

    const comments = await db.Comment.findAll({
      where: { postId },
      include: [
        {
          model: db.User,
          attributes: ['id', 'name', 'avatarUrl'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Error getting comments' });
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
};
