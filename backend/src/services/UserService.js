const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async () => {
    try{
        const userInstance = new User();
        return await userInstance.getDataAll();
    }catch(error){
        throw new Error(`Couldnt get all users: ${error.message}`);
    }
}

exports.register = async (userData) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        const newUserInstance = new User({
            ...userData,
            password: hashedPassword
        })

        const result = await newUserInstance.create(newUserInstance.toData());
        console.log(`User ${result.name} registered successfully`);

        delete result.password;
        return result;
    }catch(error){
        throw new Error(`Registration failed: ${error.message}`);
    }
};

exports.signin = async (userData) => {
    try{
        if(!userData.email || !userData.password) {
            throw new Error("Email ans password are required");
        }

        const userInstance = new User();
        const existingUser = await userInstance.findByField("email", userData.email);

        if(!existingUser){
            throw new Error("User was not found");
        }

        const isMatch = await bcrypt.compare(
            userData.password,
            existingUser.password
        );

        if(!isMatch){
            throw new Error("Invalid password");
        }

        delete existingUser.password;
        return existingUser;
    }catch(error){
        throw new Error(`Logging in failed: ${error.message}`);
    }
}

exports.updateExistingUser = async (userId, updateData) => {
    const userInstance = new User();
    return await userInstance.update(userId, updateData);
}

exports.deleteUser = async(userId) => {
    try{
        const userInstance = new User();
        const existingUser = await userInstance.findById(userId);

            if (!existingUser) {
                throw new Error("User not found");
            }

        await userInstance.delete(userId);
        return { message: "User was deleted successfully!"};
    }catch(error){
        throw new Error(`Couldnt delete user: ${error.message}`);
    }
}