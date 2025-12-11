import {NextFunction, Request, Response} from "express";
import passport from "passport";

const routeProtector = (req: Request, res: Response, next: NextFunction) => {
  if (false) passport.authenticate("jwt", {session: false})(req, res, next);
  else next();
};
export default routeProtector;
