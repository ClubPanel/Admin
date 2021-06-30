import {RenderProps} from "../../../pages/[[...name]]";
import {GetConfig} from "../../../shared/config/configStore";
import {AdminConfig} from "../config/AdminConfig";
import {MenuLinks, RegisterAdminPage} from "./api";
import {PreRenderType, RegisterClientSideType, RenderType} from "../../../shared/module/moduleClient";
import {hasPermission} from "../../../shared/util/permissions";

const permissionReqs: Record<string, string[]> = {};

export const register: RegisterClientSideType = (RegisterClientPage) => {
  const configs = GetConfig<AdminConfig>("client/admin.json");

  for (const link of configs.sidebar) {
    RegisterAdminPage(link);
  }

  if(configs.usersPageEnabled) {
    RegisterClientPage(configs.usersPageURL, {
      name: configs.usersPageName
    }, "./client/pages/users/UsersPage.tsx");
    permissionReqs[configs.usersPageURL] = ["admin"];
  }
};

export const preRender: PreRenderType = (props) => {
  if(!permissionReqs.hasOwnProperty(props.props.location) || hasPermission(props.props.userInfo.permissions, permissionReqs[props.props.location])) return;

  props["redirect"] = {
    destination: "/",
    permanent: false
  };
};

export const render: RenderType = (props: RenderProps) => {
  const configs = GetConfig<AdminConfig>("client/admin.json", props.config);

  if(!props.mainConfig.sidebar.hasOwnProperty(configs.sidebarCategory)) return;

  if(!hasPermission(props.userInfo.permissions, "admin")) {
    delete props.mainConfig.sidebar[configs.sidebarCategory];
    return;
  }

  props.mainConfig.sidebar[configs.sidebarCategory] = MenuLinks;
};