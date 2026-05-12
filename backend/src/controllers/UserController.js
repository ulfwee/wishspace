const UserService = require('../services/UserService');

exports.getUsersAll = async (req, res) => {
    try{
        const users = await UserService.getAllUsers();
        res.status(200).json({usersInfo: users});
    }catch(error){
        res.status(404).json({error: error.message});
    }
}

exports.registerUser = async (req, res) => {
    try{
        const newUser = await UserService.register(req.body); 
        res.status(201).json({ message: "User registered successfully",
            ...newUser });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try{
        const user = await UserService.signin(req.body);
        res.status(200).json({
            message: "Login successful",
            ...user
        });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userIdFromToken = req.user.userId;  

        if (id !== userIdFromToken && req.user.role !== 'admin') {
            return res.status(403).json({ error: "You can only update your own profile" });
        }

        const updateData = { ...req.body };

        delete updateData.password;
        delete updateData.role;     

        const updatedUser = await UserService.updateExistingUser(id, updateData);

        const { password, ...safeUser } = updatedUser;

        res.status(200).json({
            message: "Profile updated successfully",
            data: safeUser
        });
    } catch (error) {
        console.error("Update error:", error);
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        const result = await UserService.deleteUser(id);
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({ error: error.message});
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserService.getUserById(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await UserService.getMe(req.user.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};