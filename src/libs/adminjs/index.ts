import AdminJS, {DefaultAuthProvider} from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from "@adminjs/sequelize";
import {dark, light, noSidebar} from "@adminjs/themes";
import {User} from "#src/services/user/entities.js";
import {Session} from "#src/services/session/entities.js";
import {Enclave} from "#src/services/enclave/entities.js";
import {Dispatch} from "#src/services/enclave/dispatch/entities.js";
const authenticate = (data: {email: string; password: string}, ctx: any) => {
  if (data.email === "admin" && data.password === "abooliIsKing") return {email: data.email};
  else return null;
};

const authProvider = new DefaultAuthProvider({
  // @ts-ignore
  authenticate
});
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database
});

const admin = new AdminJS({
  resources: [User, Session, Enclave, Dispatch],
  defaultTheme: light.id,
  availableThemes: [dark, light, noSidebar],
  branding: {
    companyName: "EphemChat"
  }
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  cookiePassword: "idk",
  provider: authProvider
});

export {admin, adminRouter};
