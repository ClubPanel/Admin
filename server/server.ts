import {GetDataType} from "../../../shared/module/moduleServer";
import {UserInfo} from "../../../server/database/models/user";
import {SessionData} from "express-session";
import {MatchURLPattern} from "../../../shared/util/url";

export const dataFunctions: Record<string, (userInfo: UserInfo, session: SessionData, params: object) => object | Promise<object>> = {};

export const getData: GetDataType = async (path, userInfo, session) => {
  const output: object = {};

  for (const key of Object.keys(dataFunctions)) {
    const params = MatchURLPattern(path, key);
    if(!params) continue;

    Object.assign(output, await dataFunctions[key](userInfo, session, params));
    break;
  }

  return output;
};

