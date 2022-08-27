const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller')


router.get('/profile',userController.profile);
router.use('/posts',userController.posts);
router.use('/sign_in',userController.sign_in);
router.use('/sign_up',userController.sign_up);

module.exports = router;