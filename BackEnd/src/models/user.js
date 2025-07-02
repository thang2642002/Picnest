import { Model, DataTypes } from "sequelize";

class User extends Model {
  static associate(models) {
    // define association here
  }
}

export default (sequelize) => {
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User", // Model JS dùng trong db.User
      tableName: "Users", // Tên bảng trong database
    }
  );

  return User;
};
