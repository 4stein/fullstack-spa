# SPA Mobile Application

Full-stack mobile application with React Native client and Express.js backend.

## Backend Technologies

- **Express.js** (^4.21.2) - Web application framework
- **Sequelize** (^6.37.5) - Promise-based ORM for database operations
- **PostgreSQL** (^8.13.1) - Database
- **JWT** (^9.0.2) - Authentication tokens
- **Bcrypt** (^5.1.1) - Password hashing
- **Multer** (^1.4.5) - File upload handling
- **CORS** (^2.8.5) - Cross-origin resource sharing

## Mobile Technologies

- **React Native** (0.74.7) - Mobile application framework
- **@react-navigation/native** (^7.0.14) - Navigation container
- **@react-navigation/stack** (^7.1.1) - Stack navigation
- **@reduxjs/toolkit** (^2.5.1) - State management
- **@react-native-async-storage/async-storage** (^2.1.1) - Local storage
- **axios** (^1.7.9) - HTTP client
- **react-hook-form** (^7.54.2) - Form handling
- **react-native-image-picker** (^8.0.0) - Image selection

## Getting Started

### Backend Setup

1. Install dependencies:

bash
cd backend
npm install

2. Create `.env` file:
   here is .env.example with credentials for .env.example

env
PORT=3001

JWT_SECRET=your_jwt_secret

DB_USERNAME=your_username

DB_PASSWORD=your_password

DB_DATABASE=your_database

DB_HOST=localhost

DB_PORT=5432

3. Create database:

In project used postgresql so will be needed pgAdmin
https://www.pgadmin.org/download
install and start pgAdmin

bash
npm run db:create

4. Run migrations:

bash
npx sequelize-cli migration:generate --name create-users-table
npx sequelize-cli migration:generate --name create-posts-table
npx sequelize-cli migration:generate --name create-comments-table
npx sequelize-cli db:migrate

5. Start server:

bash
Development
npm run dev
Production
npm start

### Mobile Setup

1. Install dependencies:

bash
cd mobile
yarn install

2. iOS setup:

bash
cd ios
bundle install
pod install
cd ..

3. Start Metro:

bash
yarn start

4. Run on Android:

bash
press a on Metro terminal to start android

if there will be some problems with start on android use
npx react-native doctor
press f to fix after start of this command

5. Run on iOS:

bash
press i on Metro terminal to start android

## Database Commands

npm run db:migrate

Undo last migration:

bash
npm run db:migrate:undo

## Project Structure

├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ └── index.js
│
└── mobile/
├── src/
│ ├── components/
│ ├── screens/
│ ├── store/
│ ├── constants/
│ └── utils/
├── android/
└── ios/

## Features

- User authentication (login/register)
- Create and view posts
- Comment on posts
- Image upload
- Day/Night theme based on local time
- Responsive design
- Local data persistence
- State management with Redux
- Form validation

## Troubleshooting

### Backend Issues

1. Database connection:

- Check PostgreSQL service is running
- Verify database credentials in .env
- Ensure database exists

2. File uploads:

- Check uploads directory exists and has write permissions
- Verify multer configuration

### Mobile Issues

1. Build errors:

bash
Clear watchman
watchman watch-del-all
Reset Metro cache
yarn start --reset-cache
Rebuild iOS
cd ios && pod install && cd ..

2. Android specific:

- Check JAVA_HOME environment variable
- Verify Android SDK path in local.properties
- Ensure Android emulator is running

3. iOS specific:

- Xcode version compatibility
- Pod installation issues
- iOS simulator selection

## API Endpoints

### Auth

- POST /auth/register - Register new user
- POST /auth/login - User login
- GET /auth/me - Get current user

### Posts

- GET /posts - Get all posts
- POST /posts - Create new post
- GET /posts/:id - Get single post

### Comments

- POST /comments - Create comment
- GET /comments/post/:postId - Get post comments

## Environment Requirements

- Node.js >= 18
- PostgreSQL >= 12
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)
