import {RegisterConfig} from "../../../shared/config/configFilesManager";
import {AdminConfig} from "./types/AdminConfig";
import {UsersConfigs} from "./types/UsersConfigs";
import {ModerationConfigs} from "./types/ModerationConfigs";
import {DisabledConfigs} from "./types/DisabledConfigs";
import {AttendanceConfig} from "./types/AttendanceConfig";

export const registerConfigs = () => {
  RegisterConfig({name: "client/admin.json", default: config});
  RegisterConfig({name: "client/admin/users.json", default: usersConfig});
  RegisterConfig({name: "client/admin/moderation.json", default: moderationConfig});
  RegisterConfig({name: "client/admin/disabled.json", default: disabledConfig});
  RegisterConfig({name: "client/admin/attendance.json", default: attendanceConfig});
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
    },
    {
      text: "Disabled Accounts",
      aria: "Disabled Accounts Page",
      url: "/admin/disabled"
    },
    {
      text: "Attendance",
      aria: "Attendance Page",
      url: "/admin/attendance"
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

const disabledConfig: DisabledConfigs = {
  disabledPageEnabled: true,
  disabledPageURL: "/admin/disabled",
  disabledPageName: "Disabled Accounts"
};

const attendanceConfig: AttendanceConfig = {
  attendancePageEnabled: true,
  attendancePageURL: "/admin/attendance",
  attendancePageName: "Attendance"
};