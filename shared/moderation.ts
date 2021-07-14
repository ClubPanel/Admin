import User, {IUser, UserInfo} from "../../../server/database/models/user";
import {ModerationAction, ModerationType} from "./types/ModerationPageTypes";
import {UsersPageUser} from "./types/UsersPageTypes";

export const getActiveAction = (user: IUser) : ModerationAction => {
  if(!user?.modules?.admin_moderation || user.modules.admin_moderation.length < 1) return null;

  const curDate = Date.now();

  let action: ModerationAction = null;
  let actionExpires = 0;

  for (const moderationAction of <ModerationAction[]>user.modules.admin_moderation) {
    if(![ModerationType.Suspension, ModerationType.Expulsion].includes(moderationAction.type)) continue;

    const expires = moderationAction.date + (moderationAction.duration * 1000);

    //If it hasn't already expired and it expires after the current action.
    if(expires > curDate && expires > actionExpires) {
      action = moderationAction;
      actionExpires = expires;
    }
  }

  return action;
};

export const getActiveActions = () : Promise<ActiveActionsType[]> => {
  return new Promise<ActiveActionsType[]>((resolve, reject) => {
    User.find((err, users) => {
      if(err) return reject(err);

      const output: ActiveActionsType[] = [];

      for (const user of users) {
        const action = getActiveAction(user);
        if(!action) continue;

        output.push({user: {email: user.email, username: user.username, userId: user.id, permissions: user.permissions}, action});
      }

      resolve(output);
    });
  });
};

export interface ActiveActionsType {
  user: UsersPageUser;
  action: ModerationAction;
}