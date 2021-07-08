import {AdminConfig} from "../config/types/AdminConfig";
import {hasPermission} from "../../../shared/util/permissions";
import User from "../../../server/database/models/user";
import {dataFunctions} from "./server";
import {UsersPageData} from "../shared/types/UsersPageTypes";
import {Express} from "express";
import {GetConfig} from "../../../shared/config/configStore";
import {requireAuth} from "../../../server/util/auth";
import {Setup} from "./routes";
import {UsersConfigs} from "../config/types/UsersConfigs";

export const register = (app: Express) => {
  const configs = GetConfig<AdminConfig>("client/admin.json");

  registerPages(configs);

  for (const key of Object.keys(dataFunctions)) {
    app.use(key, requireAuth());
  }

  Setup(app, configs);
};

const registerPages = (configs: AdminConfig) => {
  const usersConfigs = GetConfig<UsersConfigs>("client/admin/users.json");

  dataFunctions[usersConfigs.usersPageURL] = (userInfo) : Promise<object> => {
    return new Promise<object>((resolve, reject) => {
      if(!hasPermission(userInfo.permissions, "admin", "module.admin.users")) return resolve({});

      User.find((err, docs) => {
        if(err) return reject(err);

        const output: UsersPageData = {
          users: []
        };

        for (const doc of docs) {
          output.users.push({email: doc.email, username: doc.username, userId: doc.id, permissions: doc.permissions});
        }

        resolve(output);
      });
    });
  };
};