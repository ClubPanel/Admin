import {IMenuLink} from "../../../../components/menu/menuItems";

export interface AdminConfig {
  accessDeniedRedirectURL: string;
  sidebarCategory: string;
  sidebar: IMenuLink[];
}