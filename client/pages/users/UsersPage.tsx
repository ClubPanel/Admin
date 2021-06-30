import React from "react";
import {UsersPageData} from "../../../shared/types/UsersPageTypes";
import UsersTable from "./components/UsersTable";

const UsersPage = ({config, userInfo, data}) : JSX.Element => {
  const users = data as UsersPageData;

  return (
    <UsersTable users={users.users} />
  );
};

export default UsersPage;