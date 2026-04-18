const UserService = require('../services/UserService');

exports.registerUser = async (req, res) => {
    try{
        const newUser = await UserService.register(req.body); 
        res.status(201).json({ user: newUser });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try{
        const {id} = req.params;
        const updatedUser = await UserService.updateExistingUser(id, req.body);
        res.status(200).json({message: "Updated successfully", data: updatedUser});
    }catch(error){
        res.status(400).json({error: error.message});
    }
};