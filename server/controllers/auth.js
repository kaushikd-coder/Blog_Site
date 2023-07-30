import express from "express";

import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send(`No user found with email: ${email}`);
    }

    if (user.password === password) {
      const userJWT = jwt.sign(
        {
          email: user.email,
          name: user.name,
        },
        process.env.JWT_KEY
      );

      res.status(200).send(JSON.stringify(userJWT));
    } else {
      res.status(400).send("Incorrect Password");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).send(`User already exists with email: ${email}`);
    }

    const user = new User({
      email: email,
      password: password,
      name: firstName + " " + lastName,
    });
    await user.save();

    const userJWT = jwt.sign(
      {
        email: user.email,
        name: user.name,
      },
      process.env.JWT_KEY
    );

    res.status(200).send(JSON.stringify(userJWT));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;
