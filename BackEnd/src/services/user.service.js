import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret";

const getAllUser = async () => {
  try {
    const data = await db.User.findAll();
    if (data) {
      return data;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (name, email, password, role) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, salt);
    const data = await db.User.create({
      name,
      email,
      password: newPass,
      role,
    });
    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (user_id, name, email, password, role) => {
  try {
    const user = await db.User.findByPk(user_id);
    if (!user) {
      return null;
    }

    const hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    await user.update({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return user;
  } catch (error) {
    console.error("Update user failed:", error);
    throw error;
  }
};

const deleteUser = async (user_id) => {
  try {
    const data = await db.User.destroy({
      where: { user_id: user_id },
    });
    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    return {
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default { getAllUser, createUser, updateUser, deleteUser, loginUser };
