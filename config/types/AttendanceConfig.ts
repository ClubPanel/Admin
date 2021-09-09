import {Config} from "../../../../shared/config/types/config";

export interface AttendanceConfig extends Config {
  attendancePageEnabled: boolean;
  attendancePageURL: string;
  attendancePageName: string;
}