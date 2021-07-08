import React from "react";
import {UsersPageData} from "../../../shared/types/UsersPageTypes";
import {Box, chakra, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {RenderProps} from "../../../../../pages/[[...name]]";
import {ModerationPageData, ModerationTypesMap} from "../../../shared/types/ModerationPageTypes";
import {GetConfig} from "../../../../../shared/config/configStore";
import {ModerationConfigs} from "../../../config/types/ModerationConfigs";
import ModerationTable from "./components/ModerationTable";

const ModerationPage = ({config, userInfo, data, csrf} : Partial<RenderProps>) : JSX.Element => {
  const user = data as ModerationPageData;

  const moderationConfigs = GetConfig<ModerationConfigs>("client/admin/moderation.json", config);

  return (
    <ModerationTable user={user} csrf={csrf}/>
  );
};

export default ModerationPage;