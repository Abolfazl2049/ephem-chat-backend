import {DataTypes, Model, Op} from "sequelize";
import sequelize from "#src/libs/sequelize/index.js";
class Enclave extends Model {
  declare id: string;
  declare expiresAt: Date;
  declare users?: Array<string>;
  declare logs: Array<{description: string; createdAt: string}>;
}
Enclave.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal("gen_random_uuid()"),
      primaryKey: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '30 days'")
    },
    users: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: []
    },
    logs: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: []
    }
  },
  {sequelize}
);
export {Enclave};
