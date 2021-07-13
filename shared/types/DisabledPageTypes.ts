import {UsersPageUser} from "./UsersPageTypes";
import {IssuerInfo, ModerationAction} from "./ModerationPageTypes";
import {ActiveActionsType} from "../moderation";

export interface DisabledPageData {
  user: UsersPageUser;
  actions: ActiveActionsType[];
  issuers: Record<number, IssuerInfo>;
}