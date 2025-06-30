"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Images.belongsTo(models.Categories, {
        foreignKey: "categories_id",
        as: "category",
      });
    }
  }
  Images.init(
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
      modelName: "Images",
      tableName: "Images",
    }
  );
  return Images;
};
