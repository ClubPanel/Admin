import {GetDataType} from "../../../shared/module/moduleServer";
import {UserInfo} from "../../../server/database/models/user";

export const dataFunctions: Record<string, (userInfo: UserInfo) => object | Promise<object>> = {};

export const getData: GetDataType = async (path, userInfo) => {
  const output: object = {};

  if(dataFunctions[path]) {
    Object.assign(output, await dataFunctions[path](userInfo));
  }

  return output;
};

