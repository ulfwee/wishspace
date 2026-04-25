const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/WishlistController');
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');
const role = require('../middleware/roleMiddleware');

router.get('/', auth, WishlistController.getWishlists);

router.post('/', auth, WishlistController.createWishlist);

router.put('/:id', auth, WishlistController.updateWishlist);

router.delete('/:id', auth, WishlistController.deleteWishlist);

module.exports = router;