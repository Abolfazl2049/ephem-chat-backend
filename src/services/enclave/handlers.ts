import {RequestHandler} from "express";
import {Enclave} from "./entities.js";
import {Op} from "sequelize";
import {Pagination} from "../shared/models/pagination.js";
import {ErrorResponse} from "#src/gears/response/error.model.js";
import moment from "moment";
import {validateReqSchema} from "#src/libs/validator/utils.js";
import {SuccessResponse} from "#src/gears/response/sucess.model.js";
import {addUserToEnclave} from "./utils.js";
import {User} from "../user/entities.js";

const getMyEnclaves: RequestHandler = async (req, res, next) => {
  try {
    validateReqSchema(req);
    const userId = req.user!;
    const pagination = new Pagination(req);
    const {page, limit} = pagination;
    const {count, rows} = await Enclave.findAndCountAll({
      where: {
        users: {
          [Op.contains]: [userId]
        }
      },
      attributes: ["id", "expiresAt", "createdAt", "updatedAt"],
      offset: (page - 1) * limit,
      limit,
      order: [["createdAt", "DESC"]]
    });
    const {hasNext, hasPrev} = pagination.setCount(count);
    res.status(200).json({rows, limit, count, hasNext, hasPrev});
  } catch (error) {
    next(error);
  }
};

const getMyEnclaveById: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!;

    const enclave = await Enclave.findOne({
      where: {
        id: req.params.id
        // users: {
        //   [Op.contains]: [userId]
        // }
      }
    });
    if (enclave) {
      const expiresAt = moment().add(30, "days").toDate();

      if (!enclave.users?.includes(userId as string)) {
        const user = await User.findByPk(userId as string);
        if (user) {
          const {logs, users} = addUserToEnclave(enclave, user);
          await enclave.update({logs, users, expiresAt});
        }
      } else await enclave.update({expiresAt});

      delete enclave.users;
      res.status(200).json(new SuccessResponse({data: enclave}));
    } else {
      res.status(404).json(new ErrorResponse({message: "Enclave not found"}));
      return;
    }
  } catch (error) {
    next(error);
  }
};

export {getMyEnclaves, getMyEnclaveById};
