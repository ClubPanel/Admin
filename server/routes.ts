import {Express, urlencoded} from "express";
import {AdminConfig} from "../config/types/AdminConfig";
import {requireAuth} from "../../../server/util/auth";
import {requireBaseReferrer} from "../../../server/util/referrer";
import {requireCSRF} from "../../../server/util/csrf";
import {requirePermission} from "../../../server/util/permissions";
import {hasPermission} from "../../../shared/util/permissions";
import User, {IUser} from "../../../server/database/models/user";
import bodyParser from "body-parser";
import {ModerationAction, ModerationType, ModerationTypesMap} from "../shared/types/ModerationPageTypes";
import {getActiveAction} from "../shared/moderation";
import moment from "moment";

interface UserPermissionData {
  permission: string;
  user: number;
}

export const Setup = (app: Express, configs: AdminConfig) => {
  app.use((req, res, next) => {
    if(hasPermission(req.session?.user?.permissions, "admin")) return next();

    const action = getActiveAction(req.session?.user);
    if(action == null) return next();

    const dateSeconds = Math.floor(action.date / 1000);
    const date = new Date(action.date);

    res.status(403).send("Your account is currently disabled! You have a(n) " + ModerationTypesMap[action.type] + ", which will expire at " + moment(date).add(action.duration, "seconds").format("dddd, MMMM Do YYYY, h:mm:ss a") + ", " + moment.duration((dateSeconds+action.duration)-moment().unix(), "seconds").humanize(true));
  });

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

  // @ts-ignore
  app.post("/adminmodulebackend/deleteuser", requireBaseReferrer(), bodyParser.json(), requireCSRF(), requireAuth(), requirePermission("admin", "module.admin.users"), async (req, res) => {
    if(!req.body) {
      return res.status(400).send("A body is required!");
    }

    const data = <{user: number}>req.body;

    if(typeof(data.user) !== "number") {
      return res.status(400).send("The user field must be a number!");
    }

    const user = await User.findOne({id: data.user});

    if(!user) {
      return res.status(400).send("The specified user does not exist!");
    }

    if(hasPermission(user.permissions, "owner")) {
      return res.status(400).send("The owner cannot be deleted!");
    }
    if(hasPermission(user.permissions, "admin") && !hasPermission(req.session.user.permissions, "owner")) {
      return res.status(400).send("Only the owner can delete an admin!");
    }

    await user.delete();

    res.status(200).send("Successfully deleted user!");
  });

  // @ts-ignore
  app.post("/adminmodulebackend/createmoderationaction", requireBaseReferrer(), bodyParser.json(), requireCSRF(), requireAuth(), requirePermission("admin", "module.admin.moderation"), async (req, res) => {
    if(!req.body) {
      return res.status(400).send("A body is required!");
    }

    const data = <{user: number, duration: number, message: string, type: ModerationType}>req.body;

    if(typeof(data.user) !== "number") {
      return res.status(400).send("The user field must be a number!");
    }
    if(typeof(data.duration) !== "number") {
      return res.status(400).send("The duration field must be a number!");
    }
    if(typeof(data.message) !== "string") {
      return res.status(400).send("The message field must be a string!");
    }
    if(typeof(data.type) !== "number") {
      return res.status(400).send("The type field must be a number!");
    }

    if(data.type < 0 || data.type > 3) {
      return res.status(400).send("The type field is invalid!");
    }
    if(!data.message.trim()) {
      return res.status(400).send("The message field is invalid!");
    }

    const user = await User.findOne({id: data.user});

    if(!user) {
      return res.status(400).send("The specified user does not exist!");
    }

    if(!user.modules["admin_moderation"]) user.modules["admin_moderation"] = [];
    user.modules["admin_moderation"].push({type: data.type, duration: data.duration, message: data.message, issuer: req.session.user.id, date: Date.now()});
    user.markModified("modules");

    await user.save();

    res.status(200).send("Successfully created moderation action!");
  });

  // @ts-ignore
  app.post("/adminmodulebackend/deletemoderationaction", requireBaseReferrer(), bodyParser.json(), requireCSRF(), requireAuth(), requirePermission("admin", "module.admin.moderation"), async (req, res) => {
    if(!req.body) {
      return res.status(400).send("A body is required!");
    }

    const data = <{date: number, user: number}>req.body;

    if(typeof(data.user) !== "number") {
      return res.status(400).send("The user field must be a number!");
    }
    if(typeof(data.date) !== "number") {
      return res.status(400).send("The date field must be a number!");
    }

    const user = await User.findOne({id: data.user});

    if(!user) {
      return res.status(400).send("The specified user does not exist!");
    }

    user.modules["admin_moderation"] = (<ModerationAction[]>user.modules["admin_moderation"] || <ModerationAction[]>[]).filter(action => action.date !== data.date);
    user.markModified("modules");

    await user.save();

    res.status(200).send("Successfully deleted moderation action!");
  });
};