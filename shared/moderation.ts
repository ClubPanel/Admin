import User, {IUser} from "../../../server/database/models/user";
import {ModerationAction, ModerationType} from "./types/ModerationPageTypes";

export const getActiveAction = (user: IUser) : ModerationAction => {
  if(!user?.modules?.admin_moderation || user.modules.admin_moderation.length < 1) return null;

  const curDate = Date.now();

  let action: ModerationAction = null;

  for (const moderationAction of <ModerationAction[]>user.modules.admin_moderation) {
    if(![ModerationType.Suspension, ModerationType.Expulsion].includes(moderationAction.type)) continue;

    const until = moderationAction.date + moderationAction.duration;
    if(until > curDate && (action == null || until > action.date + action.duration)) {
      action = moderationAction;
    }
  }

  return action;
};

export const getActiveActions = () : Promise<{user: IUser, action: ModerationAction}[]> => {
  return new Promise<{user: IUser; action: ModerationAction}[]>((resolve, reject) => {
    User.find({}, (err, users) => {
      if(err) return reject(err);

      const output: {user: IUser, action: ModerationAction}[] = [];

      for (const user of users) {
        const action = getActiveAction(user);
        if(!action) continue;

        //@ts-ignore
        output.push({user: user.toObject(), action});
      }

      resolve(output);
    });
  });
};