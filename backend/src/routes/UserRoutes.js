const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const role = require('../middleware/roleMiddleware');

const UserController =
    require('../controllers/UserController');

const WishlistController =
    require('../controllers/WishlistController');

const UserService =
    require('../services/UserService');

const WishlistService =
    require('../services/WishlistService');

const userController =
    new UserController(UserService);

const wishlistController =
    new WishlistController(WishlistService);

router.post(
    '/register',
    userController.registerUser
);

router.post(
    '/login',
    userController.loginUser
);

router.post(
    '/google-auth',
    userController.googleAuth
);

router.get(
    '/me',
    auth,
    userController.getMe
);

router.get(
    '/search/:username',
    auth,
    userController.searchByUsername
);

router.get(
    '/:userId/wishlists',
    auth,
    wishlistController.getUserWishlists
);

router.get(
    '/',
    auth,
    role("admin"),
    userController.getUsersAll
);

router.get(
    '/:id',
    auth,
    userController.getUserById
);

router.put(
    '/:id',
    auth,
    userController.updateUser
);

router.delete(
    '/:id',
    auth,
    role("admin"),
    userController.deleteUser
);

module.exports = router;