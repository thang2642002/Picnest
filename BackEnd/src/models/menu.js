import { Model, DataTypes } from "sequelize";

class Menu extends Model {
  static associate(models) {
    models.Menu.hasMany(models.Category, {
      foreignKey: "menu_id",
      as: "categories",
    });
  }
}

export default (sequelize) => {
  Menu.init(
    {
      menu_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Menu",
      tableName: "Menus",
    }
  );
  return Menu;
};
