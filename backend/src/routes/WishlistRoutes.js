const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/WishlistController');

router.get('/', WishlistController.getWishlists);

router.post('/', WishlistController.createWishlist);

router.put('/:id', WishlistController.updateWishlist);

router.delete('/:id', WishlistController.deleteWishlist);

module.exports = router;