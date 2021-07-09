import {Link, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useToast} from "@chakra-ui/react";
import {UsersPageUser} from "../../../../shared/types/UsersPageTypes";
import React, {useState} from "react";
import axios from "axios";
import {Config} from "../../../../../../shared/config/types/config";
import {GetConfig} from "../../../../../../shared/config/configStore";
import {ModerationConfigs} from "../../../../config/types/ModerationConfigs";
import UserPermissions from "./UserPermissions";
import {DeleteButton} from "../../../components/DeleteButton";

const UsersTable = ({ users, csrf, config } : { users: UsersPageUser[], csrf: string, config: Record<string, Config> }) : JSX.Element => {
  const thProps = {color: "white", border: "1px solid white"};
  const tdProps = {border: "1px solid white"};

  const toast = useToast();

  const [usersArr, setUsers] = useState(users);

  const moderationConfigs = GetConfig<ModerationConfigs>("client/admin/moderation.json", config);

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
          {moderationConfigs.moderationPageEnabled ? <Th {...thProps}>Moderation</Th> : null}
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
              {moderationConfigs.moderationPageEnabled ? <Td {...tdProps}><Link href={moderationConfigs.moderationPageURL+"/"+user.userId} color="cyan" textDecor="underline">View moderation actions</Link></Td> : null}
              <Td {...tdProps} maxW="50vh">
                <UserPermissions csrf={csrf} permissions={user.permissions} user={user.userId}/>
              </Td>
              <Td {...tdProps}>
                <DeleteButton index={user.userId} callback={deleteUserButton} warningMessage="Deleting a user will permanently wipe all of their data, including any moderation actions taken against them." aria="Delete user"/>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default UsersTable;