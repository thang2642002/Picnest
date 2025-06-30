"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Categories.belongsTo(models.Menu, {
        foreignKey: "menu_id",
        as: "menu",
      });

      models.Categories.hasMany(models.Images, {
        foreignKey: "categories_id",
        as: "images",
      });
    }
  }
  Categories.init(
    {
      categories_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      menu_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Categories",
      tableName: "Categories",
    }
  );
  return Categories;
};
