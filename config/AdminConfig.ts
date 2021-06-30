import {IMenuLink} from "../../../components/menu/menuItems";

export interface AdminConfig {
  accessDeniedRedirectURL: string;
  sidebarCategory: string;
  sidebar: IMenuLink[];
  usersPageEnabled: boolean;
  usersPageURL: string;
  usersPageName: string;
}