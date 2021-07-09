import React from "react";
import {UsersPageData} from "../../../shared/types/UsersPageTypes";
import UsersTable from "./components/UsersTable";
import {Box} from "@chakra-ui/react";
import {RenderProps} from "../../../../../pages/[[...name]]";

const UsersPage = ({config, userInfo, data, csrf} : Partial<RenderProps>) : JSX.Element => {
  const users = data as UsersPageData;

  return (
    <Box
      width="100%"
      overflowX="auto"
    >
      <UsersTable users={users.users} csrf={csrf} config={config} />
    </Box>
  );
};

export default UsersPage;