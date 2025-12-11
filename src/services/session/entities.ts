import {DataTypes, Model} from "sequelize";
import sequelize from "#src/libs/sequelize/index.js";
import {User} from "../user/entities.js";
class Session extends Model {
  declare id: DataTypes.AbstractDataTypeConstructor;
  declare name: string;
  declare user: DataTypes.AbstractDataTypeConstructor;
}
Session.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    },
    user: {
      type: DataTypes.UUIDV4
    }
  },
  {sequelize}
);
// relations
User.hasOne(Session);
Session.belongsTo(User, {foreignKey: "user"});
export {Session};
