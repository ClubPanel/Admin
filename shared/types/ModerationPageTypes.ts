import {UsersPageUser} from "./UsersPageTypes";

export interface ModerationPageData {
  user: UsersPageUser;
  actions: ModerationAction[];
  issuers: Record<number, IssuerInfo>;
}

export interface ModerationAction {
  type: ModerationType;
  issuer: number;
  message: string;
  date: number;
  duration: number;
}

export interface IssuerInfo {
  username: string;
  email: string;
}

export enum ModerationType {
  Warning = 0,
  ActivitySuspension = 1,
  Suspension = 2,
  Expulsion = 3
}

export const ModerationTypesMap = [
  "Warning",
  "Activity Suspension",
  "Suspension",
  "Expulsion"
];