class WishItemController {

    constructor(itemService) {
        this.itemService = itemService;
    }

    createItem = async (req, res) => {

        try {

            const { wishlistId } = req.params;

            const item =
                await this.itemService.createItem(
                    wishlistId,
                    req.body
                );

            res.status(201).json(item);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    getItems = async (req, res) => {

        try {

            const { wishlistId } = req.params;

            const items =
                await this.itemService
                    .getItemsByWishlist(
                        wishlistId
                    );

            res.status(200).json(items);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    getItem = async (req, res) => {

        try {

            const { id } = req.params;

            const item =
                await this.itemService
                    .getItemById(id);

            res.status(200).json(item);

        } catch (error) {

            res.status(404).json({
                error: error.message
            });

        }
    };

    updateItem = async (req, res) => {

        try {

            const { id } = req.params;

            const updated =
                await this.itemService.updateItem(
                    id,
                    req.body
                );

            res.status(200).json(updated);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    deleteItem = async (req, res) => {

        try {

            const { id } = req.params;

            const result =
                await this.itemService.deleteItem(id);

            res.status(200).json(result);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };
}

module.exports = WishItemController;