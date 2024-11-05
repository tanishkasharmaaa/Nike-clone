const UserModel = require("../model/usermodel");
const bcryptjs=require("bcryptjs")

const allUsersProfile = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    const{firstname,lastname,gender,email,password,googleId,recommendation}=req.body
    try {
        const hashed=await bcryptjs.hash(password,5)
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
             firstname,
             lastname,
             gender,
             email,
             password:hashed,
             recommendation,
             googleId
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Updated successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { allUsersProfile, updateUserProfile };
