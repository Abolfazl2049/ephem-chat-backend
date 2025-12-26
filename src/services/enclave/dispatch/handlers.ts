import {RequestHandler} from "express";
import {Dispatch} from "./entities.js";
import {User} from "#src/services/user/entities.js";
import {validateReqSchema} from "#src/libs/validator/utils.js";
import {Pagination} from "#src/services/shared/models/pagination.js";
import {SuccessResponse} from "#src/gears/response/sucess.model.js";

const getDispatchesByEnclaveId: RequestHandler = async (req, res, next) => {
  try {
    validateReqSchema(req);
    const pagination = new Pagination(req);
    const {page, limit} = pagination;
    const {count, rows} = await Dispatch.findAndCountAll({
      where: {
        enclave: req.params.enclaveId
      },
      include: [
        {
          model: User,
          attributes: ["name"]
        }
      ],
      attributes: ["content", "id", "createdAt", "updatedAt"],
      offset: (page - 1) * limit,
      limit
    });
    const {hasNext, hasPrev} = pagination.setCount(count);
    res.status(200).json({rows, limit, count, hasNext, hasPrev});
  } catch (error) {
    next(error);
  }
};

const createDispatch: RequestHandler = async (req, res, next) => {
  try {
    validateReqSchema(req);

    const userId = req.user!;
    const {enclaveId, content} = req.body;
    const dispatch = await Dispatch.create({
      sender: userId,
      enclave: enclaveId,
      content
    });
    res.status(201).json(new SuccessResponse({data: dispatch}));
  } catch (error) {
    next(error);
    return;
  }
};
export {getDispatchesByEnclaveId, createDispatch};
