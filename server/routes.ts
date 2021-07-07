import {Express, urlencoded} from "express";
import {AdminConfig} from "../config/AdminConfig";
import {requireAuth} from "../../../server/util/auth";
import {requireBaseReferrer} from "../../../server/util/referrer";
import {requireCSRF} from "../../../server/util/csrf";
import {requirePermission} from "../../../server/util/permissions";
import {hasPermission} from "../../../shared/util/permissions";
import User from "../../../server/database/models/user";
import bodyParser from "body-parser";

interface UserPermissionData {
  permission: string;
  user: number;
}

export const Setup = (app: Express, configs: AdminConfig) => {
  // @ts-ignore
  app.post("/adminmodulebackend/adduserpermission", requireBaseReferrer(), bodyParser.json(), requireCSRF(), requireAuth(), requirePermission("admin", "module.admin.users"), async (req, res) => {
    if(!req.body) {
      return res.status(400).send("A body is required!");
    }

    const data = <UserPermissionData>req.body;

    if(typeof(data.user) !== "number") {
      return res.status(400).send("The user field must be a number!");
    }
    if(typeof(data.permission) !== "string") {
      return res.status(400).send("The permission field must be a string!");
    }

    data.permission = data.permission.trim().toLowerCase();

    if(data.permission === "owner") {
      return res.status(400).send("The owner permission cannot be managed!");
    }
    if(data.permission === "admin" && !hasPermission(req.session.user.permissions, "owner")) {
      return res.status(400).send("Only the owner can manage the admin permission!");
    }

    const user = await User.findOne({id: data.user});

    if(!user) {
      return res.status(400).send("The specified user does not exist!");
    }

    if(user.permissions.includes(data.permission)) {
      return res.status(400).send("The user already has the specified permission!");
    }

    user.permissions.push(data.permission);
    await user.save();

    res.status(200).send("Successfully added permission!");
  });

  // @ts-ignore
  app.post("/adminmodulebackend/removeuserpermission", requireBaseReferrer(), bodyParser.json(), requireCSRF(), requireAuth(), requirePermission("admin", "module.admin.users"), async (req, res) => {
    if(!req.body) {
      return res.status(400).send("A body is required!");
    }

    const data = <UserPermissionData>req.body;

    if(typeof(data.user) !== "number") {
      return res.status(400).send("The user field must be a number!");
    }
    if(typeof(data.permission) !== "string") {
      return res.status(400).send("The permission field must be a string!");
    }

    data.permission = data.permission.trim().toLowerCase();

    if(data.permission === "owner") {
      return res.status(400).send("The owner permission cannot be managed!");
    }
    if(data.permission === "admin" && !hasPermission(req.session.user.permissions, "owner")) {
      return res.status(400).send("Only the owner can manage the admin permission!");
    }

    const user = await User.findOne({id: data.user});

    if(!user) {
      return res.status(400).send("The specified user does not exist!");
    }

    if(!user.permissions.includes(data.permission)) {
      return res.status(400).send("The user does not have the specified permission!");
    }

    user.permissions = user.permissions.filter(perm => perm !== data.permission);
    await user.save();

    res.status(200).send("Successfully removed permission!");
  });
};