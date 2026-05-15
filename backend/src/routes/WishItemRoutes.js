const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const WishItemController =
    require('../controllers/WishItemController');

const ItemService =
    require('../services/WishItemService');

const itemController =
    new WishItemController(
        ItemService
    );

router.post(
    '/wishlists/:wishlistId/items',
    auth,
    itemController.createItem
);

router.get(
    '/wishlists/:wishlistId/items',
    auth,
    itemController.getItems
);

router.get(
    '/items/:id',
    auth,
    itemController.getItem
);

router.put(
    '/items/:id',
    auth,
    itemController.updateItem
);

router.delete(
    '/items/:id',
    auth,
    itemController.deleteItem
);

module.exports = router;