const Wishlist = require('../models/Wishlist');

exports.getWishlistInstance = async () => {
    try{
        const wishlistInstance = new Wishlist();
        return await wishlistInstance.getDataAll();
    }catch(error){
        throw new Error(`Couldnt get data: ${error.message}`);
    }
}

exports.createWishlistInstance = async (wishlistData) => {
    try{
        const newWishlistInstance = new Wishlist({
            ...wishlistData
        })

        const result = await newWishlistInstance.create(newWishlistInstance.toData())
        console.log(`Wishlist ${result.title} was successfully created`)

        return result;
    }catch(error){
        throw new Error(`Couldnt create new wishlist: ${error.message}`);
    }
}

exports.updateWishlistInstance = async (wishlistId, wishlistData) => {
    try{
        const wishlistInstance = new Wishlist();
        console.log('Successfully updated wishlist');
        return await wishlistInstance.update(wishlistId, wishlistData);
    }catch(error){
        throw new Error(`Couldnt update wishlist: ${error.message}`);
    }   
}

exports.deleteWishlistInstance = async (wishlistId) => {
    try{
        const wishlistInstance = new Wishlist();
        const existingWishlist = await wishlistInstance.findById(wishlistId);
        if(!existingWishlist){
            throw new Error(`This wishlist does not exist`)
        }
        await wishlistInstance.delete(wishlistId);
        return {message: 'Deleted wishlist successfully'};
    }catch(error){
        throw new Error(`Couldnt delete wishlist: ${error.message}`);
    }
}
