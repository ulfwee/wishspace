const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const WishlistController = require('../controllers/WishlistController');
const auth = require('../middleware/auth');
const role = require('../middleware/roleMiddleware');

router.post('/register', userController.registerUser);
router.post("/login", userController.loginUser);
router.get('/me', auth, userController.getMe);

router.get('/', auth, role("admin"), userController.getUsersAll);
router.get('/:id', userController.getUser);
router.get('/:userId/wishlists', WishlistController.getUserWishlists);
router.get('/me', userController.getMe);

router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, role("admin"), userController.deleteUser);
module.exports = router;