import {UsersPageUser} from "./UsersPageTypes";

export interface ModerationPageData {
  user: UsersPageUser;
  actions: ModerationAction[];
}

export interface ModerationAction {
  type: ModerationType;
  issuer: number;
  message: number;
  date: Date;
  duration: number;
}

export enum ModerationType {
  Warning = 0,
  ActivitySuspension = 1,
  Suspension = 2,
  Expulsion = 3
}