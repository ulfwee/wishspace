class WishlistController {

    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }

    getWishlists = async (req, res) => {
        try {

            const wishlists =
                await this.wishlistService
                    .getUserWishlists(req.user.userId);

            res.status(200).json({
                wishlistsInfo: wishlists
            });

        } catch (error) {

            res.status(404).json({
                error: error.message
            });

        }
    };

    createWishlist = async (req, res) => {

        try {

            const wishlistData = {
                ...req.body,
                userId: req.user.userId
            };

            const newWishlist =
                await this.wishlistService
                    .createWishlistInstance(
                        wishlistData
                    );

            res.status(201).json({
                wishlistinfo: newWishlist
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    updateWishlist = async (req, res) => {

        try {

            const { id } = req.params;

            const updatedWishlist =
                await this.wishlistService
                    .updateWishlistInstance(
                        id,
                        req.body
                    );

            res.status(200).json({
                updatedWishlistInfo:
                    updatedWishlist
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    deleteWishlist = async (req, res) => {

        try {

            const { id } = req.params;

            const result =
                await this.wishlistService
                    .deleteWishlistInstance(id);

            res.status(200).json({
                result
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    getUserWishlists = async (req, res) => {

        try {

            const { userId } = req.params;

            const wishlists =
                await this.wishlistService
                    .getUserWishlists(userId);

            res.status(200).json(wishlists);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    getWishlistById = async (req, res) => {

        try {

            const { id } = req.params;

            const wishlist =
                await this.wishlistService
                    .getWishlistById(id);

            if (!wishlist) {

                return res.status(404).json({
                    error: "Wishlist not found"
                });

            }

            res.status(200).json({
                wishlist
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };
}

module.exports = WishlistController;