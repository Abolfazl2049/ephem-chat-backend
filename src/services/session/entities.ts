import {DataTypes, Model, Op} from "sequelize";
import sequelize from "#src/libs/sequelize/index.js";
import {User} from "../user/entities.js";
class Session extends Model {
  declare id: DataTypes.AbstractDataTypeConstructor;
  declare name: string;
  declare user: DataTypes.AbstractDataTypeConstructor;
  declare expiresAt: Date;
}
Session.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal("gen_random_uuid()"),
      primaryKey: true
    },
    user: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id"
      }
    },
    token: {
      type: DataTypes.CHAR
    },
    expiresAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '30 days'")
    }
  },
  {sequelize}
);
// relations
User.hasOne(Session, {foreignKey: "user"});
Session.belongsTo(User, {foreignKey: "user"});
export {Session};
