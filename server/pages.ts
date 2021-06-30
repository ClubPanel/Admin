import {AdminConfig} from "../config/AdminConfig";
import {hasPermission} from "../../../shared/util/permissions";
import User from "../../../server/database/models/user";
import {dataFunctions} from "./server";
import {UsersPageData} from "../shared/types/UsersPageTypes";
import {Express} from "express";
import {GetConfig} from "../../../shared/config/configStore";
import {requireAuth} from "../../../server/util/auth";

export const register = (app: Express) => {
  const configs = GetConfig<AdminConfig>("client/admin.json");

  registerPages(configs);

  for (const key of Object.keys(dataFunctions)) {
    app.use(key, requireAuth());
  }
};

const registerPages = (configs: AdminConfig) => {
  dataFunctions[configs.usersPageURL] = (userInfo) : Promise<object> => {
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