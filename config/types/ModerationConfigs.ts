import {Config} from "../../../../shared/config/types/config";

export interface ModerationConfigs extends Config {
  moderationPageEnabled: boolean;
  moderationPageURL: string;
  moderationPageName: string;
}