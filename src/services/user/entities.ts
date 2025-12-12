import {DataTypes, Model} from "sequelize";
import sequelize from "#src/libs/sequelize/index.js";
class User extends Model {
  declare id: DataTypes.AbstractDataTypeConstructor;
  declare name: string;
}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal("gen_random_uuid()"),
      primaryKey: true
    },
    name: {
      type: DataTypes.CHAR
    }
  },
  {sequelize}
);

export {User};
