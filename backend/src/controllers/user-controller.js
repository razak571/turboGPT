import userModel from "../models/user-model.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-managers.js";
import { COOKIE_NAME } from "../utils/constants.js";

// const domain = process.env.CLIENT_DOMAIN;
const domain =
  process.env.NODE_ENV === "production"
    ? `.turbogpt-server.onrender.com`
    : "localhost";

console.log("domain::", domain);

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log("user controller :: getAllUSers error ::", error);
    return res.status(500).json({ mesaage: "Error", cause: error.message });
  }
};

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(401).json({ message: "User Alredy Registered" });
    const hashedPassword = await hash(password, 10);
    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain,
      signed: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax", // need to set it as None but lets ckeck with Lax first
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain,
      expires,
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log("user controller :: userSignup error ::", error);
    return res.status(500).json({ mesaage: "Error", cause: error.message });
  }
};

// const domain = process.env.CLIENT_DOMAIN;

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect password");
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain,
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain,
      httpOnly: true,
      signed: true,
      expires,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log("user controller :: userLogin error ::", error);
    return res.status(500).json({ mesaage: "Error", cause: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await userModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json("User not registered or Token mulfuntioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json("Permisions didn't match");
    }

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log("user controller :: verify error ::", error);
    return res.status(500).json({ mesaage: "Error", cause: error.message });
  }
};

const userLogout = async (req, res) => {
  try {
    const user = await userModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json("User not registered or Token fulmunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: domain,
      httpOnly: true,
      signed: true,
      secure: true,
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout Error ::", error);
    return res.status(500).json({ mesaage: "Error", cause: error.message });
  }
};

export { getAllUsers, userSignup, userLogin, verifyUser, userLogout };
