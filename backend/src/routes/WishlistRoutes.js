const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const WishlistController =
    require('../controllers/WishlistController');

const WishlistService =
    require('../services/WishlistService');

const wishlistController =
    new WishlistController(
        WishlistService
    );

router.get(
    '/',
    auth,
    wishlistController.getWishlists
);

router.get(
    '/:id',
    auth,
    wishlistController.getWishlistById
);

router.post(
    '/',
    auth,
    wishlistController.createWishlist
);

router.put(
    '/:id',
    auth,
    wishlistController.updateWishlist
);

router.delete(
    '/:id',
    auth,
    wishlistController.deleteWishlist
);

module.exports = router;