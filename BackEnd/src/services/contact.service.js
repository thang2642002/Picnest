import db from "../models/index.js";

const getAllContact = async () => {
  try {
    const data = await db.Contact.findAll();
    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const createContact = async (name, email, message) => {
  try {
    const data = await db.Contact.create({
      name,
      email,
      message,
    });
    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const deleteContact = async (contact_id) => {
  try {
    const data = await db.Contact.destroy({
      where: { contact_id: contact_id },
    });
    if (data) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export default { getAllContact, createContact, deleteContact };
