class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    googleAuth = async (req, res) => {

        try {

            const { idToken } = req.body;

            const result =
                await this.userService
                    .googleLogin(idToken);

            res.status(200).json({
                message:
                    "Google login successful",
                ...result
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    getUsersAll = async (req, res) => {

        try {

            const users =
                await this.userService
                    .getAllUsers();

            res.status(200).json({
                usersInfo: users
            });

        } catch (error) {

            res.status(404).json({
                error: error.message
            });

        }
    };

    registerUser = async (req, res) => {

        try {

            const newUser =
                await this.userService
                    .register(req.body);

            res.status(201).json({
                message:
                    "User registered successfully",
                ...newUser
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    loginUser = async (req, res) => {

        try {

            const user =
                await this.userService
                    .signin(req.body);

            res.status(200).json({
                message:
                    "Login successful",
                ...user
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    updateUser = async (req, res) => {

        try {

            const { id } = req.params;

            const userIdFromToken =
                req.user.userId;

            if (
                id !== userIdFromToken &&
                req.user.role !== 'admin'
            ) {

                return res.status(403).json({
                    error:
                        "You can only update your own profile"
                });
            }

            const updateData = {
                ...req.body
            };

            delete updateData.password;
            delete updateData.role;

            const updatedUser =
                await this.userService
                    .updateExistingUser(
                        id,
                        updateData
                    );

            const {
                password,
                ...safeUser
            } = updatedUser;

            res.status(200).json({
                message:
                    "Profile updated successfully",
                data: safeUser
            });

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    deleteUser = async (req, res) => {

        try {

            const result =
                await this.userService
                    .deleteUser(
                        req.params.id
                    );

            res.status(200).json(result);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    getMe = async (req, res) => {

        try {

            const user =
                await this.userService
                    .getMe(
                        req.user.userId
                    );

            res.status(200).json(user);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    };

    searchByUsername = async (req, res) => {

        try {

            const result =
                await this.userService
                    .findByUsername(
                        req.params.username
                    );

            if (!result) {

                return res.status(404).json({
                    message:
                        'User not found'
                });

            }

            res.json(result);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    };

    getUserById = async (req, res) => {

        try {

            const result =
                await this.userService
                    .findById(
                        req.params.id
                    );

            if (!result) {

                return res.status(404).json({
                    message:
                        'User not found'
                });

            }

            res.json(result);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    };
}

module.exports = UserController;