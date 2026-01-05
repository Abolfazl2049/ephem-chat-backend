import AdminJS, {DefaultAuthProvider} from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from "@adminjs/sequelize";
import {dark, light, noSidebar} from "@adminjs/themes";
import {User} from "#src/services/user/entities.js";
import {Session} from "#src/services/session/entities.js";
import {Enclave} from "#src/services/enclave/entities.js";
import {Dispatch} from "#src/services/enclave/dispatch/entities.js";
import "dotenv/config.js";
import process from "process";
const authenticate: DefaultAuthProvider["authenticate"] = async (data: {email: string; password: string}, ctx: any) => {
  const envUsername = process.env.ADMIN_PANEL_USERNAME;
  const envPass = process.env.ADMIN_PANEL_PASS;
  if (envPass && envUsername && data.email === envUsername && data.password === envPass) return {email: data.email};
  else return null;
};

const authProvider = new DefaultAuthProvider({
  authenticate,
  // @ts-ignore
  componentLoader: () => {}
});
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database
});

const admin = new AdminJS({
  resources: [User, Session, Enclave, Dispatch],
  defaultTheme: dark.id,
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
