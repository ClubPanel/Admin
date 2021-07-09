import {Config} from "../../../../shared/config/types/config";

export interface UsersConfigs extends Config {
  usersPageEnabled: boolean;
  usersPageURL: string;
  usersPageName: string;
}