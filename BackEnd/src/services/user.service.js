import db from "../models/index.js";

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
    const data = await db.User.create({
      name,
      email,
      password,
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
    const data = await db.User.findByPk(user_id);
    if (data) {
      await data.update({ name, email, password, role });
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
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

export default { getAllUser, createUser, updateUser, deleteUser };
