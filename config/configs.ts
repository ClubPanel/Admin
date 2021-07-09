import {RegisterConfig} from "../../../shared/config/configFilesManager";
import {AdminConfig} from "./types/AdminConfig";
import {UsersConfigs} from "./types/UsersConfigs";
import {ModerationConfigs} from "./types/ModerationConfigs";

export const registerConfigs = () => {
  RegisterConfig({name: "client/admin.json", default: config});
  RegisterConfig({name: "client/admin/users.json", default: usersConfig});
  RegisterConfig({name: "client/admin/moderation.json", default: moderationConfig});
};

const config: AdminConfig = {
  __comment__accessDeniedRedirectURL: "The URL that users attempting to access a page they do not have access to are redirected to.",
  accessDeniedRedirectURL: "/",
  __comment__sidebarCategory: "The name of the category for the admin pages. If this does not exist in sidebar configuration, admin pages will not be added to the sidebar.",
  sidebarCategory: "Admin",
  sidebar: [
    {
      text: "Users",
      aria: "Users Page",
      url: "/admin/users"
    }
  ]
};

const usersConfig: UsersConfigs = {
  usersPageEnabled: true,
  usersPageURL: "/admin/users",
  usersPageName: "Users"
};

const moderationConfig: ModerationConfigs = {
  moderationPageEnabled: true,
  moderationPageURL: "/admin/moderation",
  moderationPageName: "Moderation"
};