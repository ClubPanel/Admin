import {Config} from "../../../../shared/config/types/config";

export interface DisabledConfigs extends Config {
  disabledPageEnabled: boolean;
  disabledPageURL: string;
  disabledPageName: string;
}