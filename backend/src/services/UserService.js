const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        if (!userData.email || !userData.password) {
            throw new Error("Email and password are required");
        }

        const userInstance = new User();

        const existingUser = await userInstance.findByField("email", userData.email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        const newUserInstance = new User({
            ...userData,
            password: hashedPassword,
            role: "user"
        })

        const result = await newUserInstance.create(newUserInstance.toData());
        console.log(`User ${result.name} registered successfully`);

        const token = jwt.sign(
            { 
                userId: result.id, 
                email: result.email,
                role: result.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        delete result.password;

        

        return {
            user: result,
            token
        };
    }catch(error){
        throw new Error(`Registration failed: ${error.message}`);
    }
};

exports.signin = async (userData) => {
    try {
        if (!userData.email || !userData.password) {
            throw new Error("Email and password are required");
        }

        const userInstance = new User();
        const existingUser = await userInstance.findByField("email", userData.email);

        if (!existingUser) {
            throw new Error("User not found");
        }

        if (!existingUser.password) {
            throw new Error("User has no password (invalid data)");
        }

        const isMatch = await bcrypt.compare(
            userData.password,
            existingUser.password
        );

        if (!isMatch) {
            throw new Error("Invalid password");
        }

        const isAdmin =
            existingUser.email === process.env.ADMIN_EMAIL;

        const token = jwt.sign(
            {
                userId: existingUser.id,
                email: existingUser.email,
                role: isAdmin ? "admin" : existingUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );


        console.log("INPUT:", userData);
        console.log("FOUND USER:", existingUser);
        console.log("PASSWORD FROM DB:", existingUser.password);
        delete existingUser.password;

        return { user: existingUser, token };
    } catch (error) {
        throw new Error(`Logging in failed: ${error.message}`);
    }
};

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

exports.getUserById = async (userId) => {
    try {
        const userInstance = new User();
        const user = await userInstance.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        delete user.password;
        return user;
    } catch (error) {
        throw new Error(`Get user failed: ${error.message}`);
    }
};

exports.getMe = async (userId) => {
    try {
        const userInstance = new User();
        const user = await userInstance.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        delete user.password;

        return user;
    } catch (error) {
        throw new Error(`Failed to get user: ${error.message}`);
    }
};