const express = require('express');
const routes = express.Router();
const userController = require('./controllers/UserController');
const subjectController = require('./controllers/SubjectController');
const topicController = require('./controllers/TopicController');
const authController = require('./controllers/AuthController')
const authMiddleware = require('./middlewares/auth');
const multer = require('multer');
const multerConfig = require('./config/multer');

routes.post('/topic', authMiddleware, topicController.create);
routes.delete('/topic', authMiddleware, topicController.deleteTopic);
routes.get('/user/profile/:id', userController.getUser);

routes.get('/user/profile', authMiddleware, userController.getUser);
routes.post('/user/profile', authMiddleware, userController.setUser);
routes.post('/user/profile/picture', authMiddleware, multer(multerConfig).single("file"), userController.setUserProfilePicture);
routes.get('/subject/:subjectName', subjectController.getSubjectByName);
routes.get('/subject', subjectController.getAllSubjects);
routes.post('/subject', authMiddleware, subjectController.create);
routes.delete('/subject', authMiddleware, subjectController.deleteSubject);
routes.post('/auth/register', authController.register);
routes.post('/auth/authenticate', authController.authenticate);

module.exports = routes;