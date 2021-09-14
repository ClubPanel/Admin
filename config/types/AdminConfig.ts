import {Config} from "../../../../shared/config/types/config";
import {IMenuLink} from "../../../../components/menu/IMenuLink";

export interface AdminConfig extends Config {
  accessDeniedRedirectURL: string;
  sidebarCategory: string;
  sidebar: IMenuLink[];
}