import { Model, DataTypes } from "sequelize";

class Image extends Model {
  static associate(models) {
    models.Image.belongsTo(models.Category, {
      foreignKey: "categories_id",
      as: "category",
    });
  }
}

export default (sequelize) => {
  Image.init(
    {
      image_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      url: DataTypes.STRING,
      title: DataTypes.STRING,
      categories_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Image", // ✅ Tên model dùng trong JS
      tableName: "Images", // ✅ Tên bảng trong CSDL
    }
  );

  return Image;
};
