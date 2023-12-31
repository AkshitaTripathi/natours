const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const bookingRouter = require('./bookingRoutes');

const router = express.Router();

router.use('/:userId/bookings', bookingRouter);

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router
  .route('/forgotPassword')
  .post(authController.forgotPassword);
router
  .route('/resetPassword/:token')
  .patch(authController.resetPassword);

//protect all routes after this
router.use(authController.protect);

router
  .route('/updateMyPassword')
  .patch(authController.updatePassword);

router.get(
  '/me',
  userController.getMe,
  userController.getUser
);
router
  .route('/updateMe')
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
  );

router.route('/deleteMe').delete(userController.deleteMe);

//Routes after this are only accessible by aadmin
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
