import React from "react";
import {UsersPageData} from "../../../shared/types/UsersPageTypes";
import {Box, chakra} from "@chakra-ui/react";
import {RenderProps} from "../../../../../pages/[[...name]]";
import {ModerationPageData} from "../../../shared/types/ModerationPageTypes";

const ModerationPage = ({config, userInfo, data, csrf} : Partial<RenderProps>) : JSX.Element => {
  const users = data as ModerationPageData;

  return (
    <chakra.div>Test</chakra.div>
  );
};

export default ModerationPage;