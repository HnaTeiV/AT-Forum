const { json } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function getAllUsers() {
  try {
    const users = await User.find();

    return users;
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}

async function getUserByUserName(username) {
  try {
    const user = await User.find({ username: username });

    return user;
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}

async function addUser(user) {
  try {
    const saltRounds = 10;
    const bcryptPasswordHash = await bcrypt.hash(user.password, saltRounds);

    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      passwordHash: bcryptPasswordHash,
      image: user.image || "",
      role: user.role,
      createdAt: new Date(),
    });
    const savedUser = await newUser.save();

    return "Add user success";
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return "User not found";
    }
    return "User deleted successfully";
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}
async function updateUser(user) {
  try {
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        username: user.username,
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
        firstName:user.fname,
        lastName:user.lname,
        image:user.image,
        lastUpdated:Date.now(),
      },
      { new: true }
    ).then((updatedUser) => {
      if (updatedUser) {

        return "Update profile success";
      } else {
        return "User Not Found";
      }
    });
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}
async function login(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    return "User not found";
  }
  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return {success:false,message:"Invalid credentials"};
  }
  return { success: true, user, message: "Login success" };
}
async function getProfileUser(user){
   try {
    const result = await User.findById(user.id).select("-password");
    return result;
  } catch (error) {
    throw new Error("Database error");
  }
}
module.exports = {
  getAllUsers,
  getUserByUserName,
  addUser,
  deleteUser,
  updateUser,
  login,
  getProfileUser,
};
