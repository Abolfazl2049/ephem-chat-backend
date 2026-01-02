import {Op} from "sequelize";
import {Enclave} from "./entities.js";
import {User} from "../user/entities.js";

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

const addUserToEnclave = (enclave: Enclave, user: User) => {
  const users = [...(enclave.users || []), user.id];
  const logs = [...enclave.logs, {description: `${user.name} registered in enclave`, createdAt: new Date().toISOString()}];
  return {logs, users};
};
export {deleteExpiredEnclaves, addUserToEnclave};
