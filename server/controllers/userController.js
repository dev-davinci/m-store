import asyncHandler from "express-async-handler";
import generateToken from "./../utils/generateToken.js";
import User from "./../models/userModel.js";

// Description: user login auth
// Route: POST /api/users/login
// Access: Public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Description: user registeration
// Route: POST /api/users
// Access: Public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.find({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This email is already in use.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Description: user porfile access
// Route: GET /api/users/profile
// Access: Private, only users can access

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("There is not such user.");
  }
});

// Description: update user porfile
// Route: PUT /api/users/profile
// Access: Private, only users can access

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("There is not such user.");
  }
});

// Description: get all user
// Route: GET /api/users
// Access: Private, only ADMINS can access

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Description: get one user
// Route: GET /api/users/:id
// Access: Private, only ADMINS can access

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);

    throw new Error("There is no such user.");
  }
});

// Description: update a user
// Route: PUT /api/users/:id
// Access: Private, only ADMINS can access

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("There is no such user.");
  }
});

// Description: delete a user
// Route: DELETE /api/users/:id
// Access: Private, only ADMINS can access

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User is removed" });
  } else {
    res.status(404);
    throw new Error("There is no such user.");
  }
});
