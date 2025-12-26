import {DataTypes, Model} from "sequelize";
import sequelize from "#src/libs/sequelize/index.js";
import {User} from "#src/services/user/entities.js";
import {Enclave} from "../entities.js";
class Dispatch extends Model {
  declare id: DataTypes.AbstractDataTypeConstructor;
  declare sender: DataTypes.AbstractDataTypeConstructor;
  declare enclave: DataTypes.AbstractDataTypeConstructor;
  declare content: DataTypes.TextDataTypeConstructor;
}
Dispatch.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal("gen_random_uuid()"),
      primaryKey: true
    },
    sender: {
      type: DataTypes.UUID,
      allowNull: false
    },
    enclave: {
      type: DataTypes.UUID,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {sequelize}
);

User.hasMany(Dispatch, {foreignKey: "sender"});
Dispatch.belongsTo(User, {foreignKey: "sender"});

Enclave.hasMany(Dispatch, {foreignKey: "enclave"});
Dispatch.belongsTo(Enclave, {foreignKey: "enclave"});

export {Dispatch};
