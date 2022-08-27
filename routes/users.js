const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller')


router.get('/profile',userController.profile);
router.use('/posts',userController.posts);
router.use('/sign-in',userController.signIn);
router.use('/sign-up',userController.signUp);

module.exports = router;