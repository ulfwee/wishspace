const WishItem = require('../models/WishItem');

exports.createItem = async (wishlistId, data) => {
    try {
        const item = new WishItem({
            ...data,
            wishlistId
        });

        return await item.create(item.toData());
    } catch (error) {
        throw new Error(`Create item failed: ${error.message}`);
    }
};

exports.getItemsByWishlist = async (wishlistId) => {
    try {
        const itemInstance = new WishItem();
        return await itemInstance.findByField("wishlistId", wishlistId);
    } catch (error) {
        throw new Error(`Get items failed: ${error.message}`);
    }
};

exports.getItemById = async (id) => {
    const itemInstance = new WishItem();
    const item = await itemInstance.findById(id);

    if (!item) throw new Error("Item not found");

    return item;
};

exports.updateItem = async (id, data) => {
    const itemInstance = new WishItem();
    return await itemInstance.update(id, data);
};

exports.deleteItem = async (id) => {
    const itemInstance = new WishItem();
    return await itemInstance.delete(id);
};