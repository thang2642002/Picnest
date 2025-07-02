import { Model, DataTypes } from "sequelize";

class Contact extends Model {
  static associate(models) {
    // define association here
  }
}

export default (sequelize) => {
  Contact.init(
    {
      contact_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Contact", // ✅ Model JS
      tableName: "Contacts", // ✅ Tên bảng trong CSDL
    }
  );

  return Contact;
};
