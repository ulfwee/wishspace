const User = require('../models/User');
const bcrypt = require('bcrypt');

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

exports.updateExistingUser = async (userId, updateData) => {
    const userInstance = new User();
    return await userInstance.update(userId, updateData);
}