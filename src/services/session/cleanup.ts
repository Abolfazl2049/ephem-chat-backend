import {Session} from "./entities.js";
import {Op} from "sequelize";

const deleteExpiredSessions = async () => {
  try {
    const deletedCount = await Session.destroy({
      where: {
        expiresAt: {
          [Op.lt]: new Date()
        }
      }
    });
    if (deletedCount > 0) {
      console.log(`Cleaned up ${deletedCount} expired sessions`);
    }
  } catch (error) {
    console.error("Error cleaning up expired sessions:", error);
  }
};

export {deleteExpiredSessions};
