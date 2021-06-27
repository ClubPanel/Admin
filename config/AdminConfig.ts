import {IMenuLink} from "../../../components/menu/menuItems";

export interface AdminConfig {
  sidebarCategory: string;
  sidebar: IMenuLink[];
  usersPageEnabled: boolean;
  usersPageURL: string;
  usersPageName: string;
}