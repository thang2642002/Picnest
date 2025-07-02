import { Sequelize, DataTypes } from "sequelize";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import configFile from "../config/config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

// Load tất cả model
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file !== "index.js" && file.slice(-3) === ".js" && !file.includes(".test")
  );

for (const file of modelFiles) {
  const { default: defineModel } = await import(`./${file}`);
  const model = defineModel(sequelize);
  db[model.name] = model;
}

// Gọi associate nếu có
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
