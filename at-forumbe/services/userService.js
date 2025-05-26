const { json } = require("express");
const User = require("../models/User");

async function getAllUsers() {
  try {
    const users = await User.find();
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}

async function getUserByUserName(username) {
  try {
    const user = await User.find({ username: username });
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}

async function addUser(user) {
  try {
    const newUser = new User({
      username: user.username,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      createdAt: new Date(),
    });
    const savedUser = await newUser.save();
    console.log("User saved: ", savedUser);
    return "Add user success";
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    console.log(deletedUser);
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
      { username: user.username },
      {
        username: user.username,
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
      },
      { new: true }
    ).then((updatedUser) => {
      if (updatedUser) {
        console.log(updatedUser);
        return updatedUser;
      } else {
        return "User Not Found";
      }
    });
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}

module.exports = {
  getAllUsers,
  getUserByUserName,
  addUser,
  deleteUser,updateUser
};
