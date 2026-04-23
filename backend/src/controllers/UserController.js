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
        res.status(201).json({ user: newUser });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try{
        const user = await UserService.signin(req.body);
        res.status(200).json({ user });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try{
        const {id} = req.params;
        const updatedUser = await UserService.updateExistingUser(id, req.body);
        res.status(200).json({message: "Updated successfully", data: updatedUser});
    }catch(error){
        res.status(400).json({error: error.message});
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