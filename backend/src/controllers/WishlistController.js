const WishlistService = require('../services/WishlistService');

exports.getWishlists = async (req, res) => {
    try{
        const wishlists = await WishlistService.getWishlistInstance();
        res.status(200).json({ wishlistsInfo: wishlists});
    }catch(error){
        res.status(404).json({ error: error.message });
    }
}

exports.createWishlist = async (req, res) => {
    try{
        const newWishlist = await WishlistService.createWishlistInstance(req.body);
        res.status(201).json({ wishlistinfo: newWishlist });
    }catch(error){
        res.status(400).json({ error: error.message});
    }
}

exports.updateWishlist = async (req, res) => {
    try{
        const {id} = req.params;
        const updatedWishlist = await WishlistService.updateWishlistInstance(id, req.body);
        res.status(200).json({ updatedWishlistInfo: updatedWishlist });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

exports.deleteWishlist = async (req, res) => {
    try{
        const {id} = req.params;
        const result = await WishlistService.deleteWishlistInstance(id);
        res.status(200).json({result});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}