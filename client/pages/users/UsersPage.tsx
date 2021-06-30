import React from "react";
import {UsersPageData} from "../../../shared/types/UsersPageTypes";
import UsersTable from "./components/UsersTable";
import {Box} from "@chakra-ui/react";

const UsersPage = ({config, userInfo, data}) : JSX.Element => {
  const users = data as UsersPageData;

  return (
    <Box
      width="100%"
      overflowX="auto"
    >
      <UsersTable users={users.users} />
    </Box>
  );
};

export default UsersPage;