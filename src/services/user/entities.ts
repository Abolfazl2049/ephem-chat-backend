import {DataTypes, Model} from "sequelize";
import sequelize from "#src/libs/sequelize/index.js";
class User extends Model {
  declare id: DataTypes.AbstractDataTypeConstructor;
  declare name: string;
}
User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.CHAR
    }
  },
  {sequelize}
);

export {User};
