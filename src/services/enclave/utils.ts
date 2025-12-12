import {Op} from "sequelize";
import {Enclave} from "./entities.js";

const deleteExpiredEnclaves = async () => {
  const now = new Date();
  await Enclave.destroy({
    where: {
      expiresAt: {
        [Op.lt]: now
      }
    }
  });
};
export {deleteExpiredEnclaves};
