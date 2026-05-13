const WishlistService = require('../services/WishlistService');

exports.getWishlists = async (req, res) => {
    try {
        const wishlists = await WishlistService.getUserWishlists(req.user.userId); 
        res.status(200).json({ wishlistsInfo: wishlists });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.createWishlist = async (req, res) => {
    try {

        console.log("REQ.USER:");
        console.log(req.user);

        const wishlistData = {
            ...req.body,
            userId: req.user.userId
        };

        console.log("WISHLIST DATA:");
        console.log(wishlistData);

        const newWishlist =
            await WishlistService.createWishlistInstance(
                wishlistData
            );

        res.status(201).json({
            wishlistinfo: newWishlist
        });

    } catch(error) {

        console.error(error);

        res.status(400).json({
            error: error.message
        });
    }
};

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

exports.getUserWishlists = async (req, res) => {
    try {
        const { userId } = req.params;
        const wishlists = await WishlistService.getUserWishlists(userId);

        res.status(200).json(wishlists);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getWishlistById = async (req, res) => {
    try {
        const { id } = req.params;
        const wishlist = await WishlistService.getWishlistById(id);
        
        if (!wishlist) {
            return res.status(404).json({ error: "Wishlist not found" });
        }

        res.status(200).json({ wishlist });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};