import {Table, TableCaption, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {UsersPageUser} from "../../../../shared/types/UsersPageTypes";
import React from "react";

const UsersTable = ({ users } : { users: UsersPageUser[] }) => {
  const thProps = {color: "white", border: "1px solid white"};
  const tdProps = {border: "1px solid white"};

  return (
    <Table
      size="md"
      width="90%"
      m="auto"
      borderWidth="1px"
    >
      <TableCaption placement="top" color="white">Accounts</TableCaption>
      <Thead>
        <Tr>
          <Th {...thProps} isNumeric>ID</Th>
          <Th {...thProps}>Email</Th>
          <Th {...thProps}>Username</Th>
          <Th {...thProps}>Permissions</Th>
          <Th {...thProps}>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map(user => {
          return (
            <Tr
              key={user.userId}
            >
              <Td {...tdProps} isNumeric>{user.userId}</Td>
              <Td {...tdProps}>{user.email}</Td>
              <Td {...tdProps}>{user.username}</Td>
              <Td {...tdProps}>TODO</Td>
              <Td {...tdProps}>TODO</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default UsersTable;