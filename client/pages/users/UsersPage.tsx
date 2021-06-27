import React from "react";
import {UsersPageData} from "../../../shared/types/UsersPageTypes";

const UsersPage = ({config, userInfo, data}) : JSX.Element => {
  console.log("data", data);

  const users = data as UsersPageData;

  return (
    <ul>
      {users.users.map(user => {
        return (
          <li
            key={user.userId}
          >
            {user.username} - {user.userId}
          </li>
        );
      })}
    </ul>
  );
};

export default UsersPage;