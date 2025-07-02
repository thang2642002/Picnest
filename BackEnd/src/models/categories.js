import { Model, DataTypes } from "sequelize";

class Category extends Model {
  static associate(models) {
    models.Category.belongsTo(models.Menu, {
      foreignKey: "menu_id",
      as: "menu",
    });

    models.Category.hasMany(models.Image, {
      foreignKey: "categories_id",
      as: "images",
    });
  }
}

export default (sequelize) => {
  Category.init(
    {
      categories_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      menu_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Menus", // Tên bảng trong DB, viết đúng y như trong migration
          key: "menu_id", // Khóa chính của bảng Menu
        },
        onDelete: "CASCADE", // (tùy chọn) nếu muốn xóa menu thì category cũng xóa
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Category", // ✅ Model JS name
      tableName: "Categories", // ✅ Tên bảng thực tế trong DB
    }
  );

  return Category;
};
