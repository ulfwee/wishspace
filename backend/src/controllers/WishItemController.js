const ItemService = require('../services/WishItemService');

exports.createItem = async (req, res) => {
    try {
        const { wishlistId } = req.params;
        const item = await ItemService.createItem(wishlistId, req.body);

        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getItems = async (req, res) => {
    try {
        const { wishlistId } = req.params;
        const items = await ItemService.getItemsByWishlist(wishlistId);

        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ItemService.getItemById(id);

        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ItemService.updateItem(id, req.body);

        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ItemService.deleteItem(id);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};