import {AdminConfig} from "../config/types/AdminConfig";
import {hasPermission} from "../../../shared/util/permissions";
import User from "../../../server/database/models/user";
import {dataFunctions} from "./server";
import {UsersPageData, UsersPageUser} from "../shared/types/UsersPageTypes";
import {Express} from "express";
import {GetConfig} from "../../../shared/config/configStore";
import {requireAuth} from "../../../server/util/auth";
import {Setup} from "./routes";
import {UsersConfigs} from "../config/types/UsersConfigs";
import {ModerationConfigs} from "../config/types/ModerationConfigs";
import {IssuerInfo, ModerationAction} from "../shared/types/ModerationPageTypes";
import * as Path from "path";

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
  const moderationConfigs = GetConfig<ModerationConfigs>("client/admin/moderation.json");

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

  dataFunctions[Path.join(moderationConfigs.moderationPageURL, "/*").replace(/\\/g, "/")] = async (userInfo, session) : Promise<object> => {
    if(!hasPermission(userInfo.permissions, "admin", "module.admin.moderation")) return {};

    const actions: ModerationAction[] = session.user.modules["admin_moderation"] || [];
    const user: UsersPageUser = {email: userInfo.email, permissions: userInfo.permissions, userId: userInfo.userId, username: userInfo.username};
    const issuers: Record<number, IssuerInfo> = {};

    for (const action of actions) {
      if(issuers.hasOwnProperty(action.issuer)) continue;

      const issuer = await User.findOne({id: action.issuer});
      if(!issuer) {
        issuers[action.issuer] = {email: "Unknown", username: "Unknown"};
      } else {
        issuers[action.issuer] = {email: issuer.email, username: issuer.username};
      }
    }

    return {
      user,
      actions,
      issuers
    };
  };
};