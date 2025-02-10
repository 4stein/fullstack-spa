const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./models');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// BD
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return db.sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
