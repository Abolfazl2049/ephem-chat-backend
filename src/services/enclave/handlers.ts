import {RequestHandler} from "express";
import {Enclave} from "./entities.js";
import {Op} from "sequelize";
import {Pagination} from "../shared/models/pagination.js";
import {MyError} from "#src/gears/error/model.js";
import {ErrorResponse} from "#src/gears/response/error.model.js";
import moment from "moment";
import {validateReqSchema} from "#src/libs/validator/utils.js";

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
      offset: (page - 1) * limit,
      limit
    });
    const {hasNext, hasPrev} = pagination.setCount(count);
    res.status(200).json({rows, limit, count, hasNext, hasPrev});
  } catch (error) {
    next(error);
  }
};

const getMyEnclavesById: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!;

    const enclave = await Enclave.findOne({
      where: {
        id: req.params.id,
        users: {
          [Op.contains]: [userId]
        }
      }
    });
    if (enclave) {
      enclave.update({
        expiresAt: moment().add(30, "days").toDate()
      });
      res.status(200).json(enclave);
    } else {
      res.status(404).json(new ErrorResponse({message: "Enclave not found"}));
      return;
    }
  } catch (error) {
    next(error);
  }
};

export {getMyEnclaves, getMyEnclavesById};
