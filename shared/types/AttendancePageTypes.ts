import {UsersPageUser} from "./UsersPageTypes";

export interface AttendanceUser {
  text: string;
  id: number;
}

export interface AttendancePageData {
  user: UsersPageUser;
  attendance: Record<string, AttendanceUser[]>;
  users: AttendanceUser[];
}