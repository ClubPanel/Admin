import {RegisterConfig} from "../../../shared/config/configFilesManager";

export const registerConfigs = () => {
  RegisterConfig({name: "client/admin.json", default: config});
};

const config = {
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
  ],
  usersPageEnabled: true,
  usersPageURL: "/admin/users",
  usersPageName: "Users"
};