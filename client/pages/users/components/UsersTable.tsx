import {IconButton, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useToast} from "@chakra-ui/react";
import {UsersPageUser} from "../../../../shared/types/UsersPageTypes";
import React, {useState} from "react";
import UserPermissions from "./UserPermissions";
import {DeleteIcon, MinusIcon} from "@chakra-ui/icons";
import {UserDeleteButton} from "./UserDeleteButton";
import axios from "axios";

const UsersTable = ({ users, csrf } : { users: UsersPageUser[], csrf: string }) : JSX.Element => {
  const thProps = {color: "white", border: "1px solid white"};
  const tdProps = {border: "1px solid white"};

  const toast = useToast();

  const [usersArr, setUsers] = useState(users);

  const deleteUserButton = (user: number) => {
    axios.post("/adminmodulebackend/deleteuser", {csrf, user}).then(res => {
      toast({
        title: "Success",
        description: res.data,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });

      setUsers(usersArr.filter(userInfo => userInfo.userId !== user));
    }).catch(e => {
      if(e?.response?.data) {
        toast({
          title: "Error",
          description: e.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        });
      }
    });
  };

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
        {usersArr.map(user => {
          return (
            <Tr
              key={user.userId}
            >
              <Td {...tdProps} isNumeric>{user.userId}</Td>
              <Td {...tdProps}>{user.email}</Td>
              <Td {...tdProps}>{user.username}</Td>
              <Td {...tdProps} maxW="100vh">
                <UserPermissions csrf={csrf} permissions={user.permissions} user={user.userId}/>
              </Td>
              <Td {...tdProps}>
                <UserDeleteButton user={user.userId} callback={deleteUserButton}/>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default UsersTable;