import {IMenuLink} from "../../../../components/menu/menuItems";
import {Config} from "../../../../shared/config/types/config";

export interface AdminConfig extends Config {
  accessDeniedRedirectURL: string;
  sidebarCategory: string;
  sidebar: IMenuLink[];
}