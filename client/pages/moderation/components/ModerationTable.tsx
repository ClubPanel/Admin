import {ModerationPageData, ModerationType, ModerationTypesMap} from "../../../../shared/types/ModerationPageTypes";
import {Input, Select, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useToast} from "@chakra-ui/react";
import React, {useRef, useState} from "react";
import {DeleteButton} from "../../../components/DeleteButton";
import axios from "axios";
import moment from "moment";
import {UserInfo} from "../../../../../../server/database/models/user";
import ModerationAdd from "./ModerationAdd";

const ModerationTable = ({ user, csrf, currentUser } : { user: ModerationPageData, csrf: string, currentUser: UserInfo }) : JSX.Element => {
  const thProps = {color: "white", border: "1px solid white"};
  const tdProps = {border: "1px solid white"};

  const toast = useToast();

  const [actions, setActions] = useState(user.actions);

  const deleteActionButton = (date: number) => {
    axios.post("/adminmodulebackend/deletemoderationaction", {csrf, date, user: user.user.userId}).then(res => {
      toast({
        title: "Success",
        description: res.data,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });

      setActions(actions.filter(actions => actions.date !== date));
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

  const createActionButton = (duration: number, message: string, type: ModerationType, reset: Function) => {
    axios.post("/adminmodulebackend/createmoderationaction", {csrf, duration, message, type, user: user.user.userId}).then(res => {
      toast({
        title: "Success",
        description: res.data,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });

      setActions(actions.concat([{type, duration, message, date: Date.now(), issuer: currentUser.userId}]));
      reset();
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
      <TableCaption placement="top" color="white">Moderation Actions for {user.user.username} (UserID: {user.user.userId}, Email: {user.user.email})</TableCaption>
      <Thead>
        <Tr>
          <Th {...thProps}>Type</Th>
          <Th {...thProps}>Issuer</Th>
          <Th {...thProps}>Message</Th>
          <Th {...thProps}>Time</Th>
          <Th {...thProps}>Expires</Th>
          <Th {...thProps}>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {actions.map((action, idx) => {
          const dateSeconds = Math.floor(action.date / 1000);
          const dateNow = Date.now();
          const date = new Date(action.date);

          return (
            <Tr key={action.date}>
              <Td {...tdProps}>{ModerationTypesMap[action.type]}</Td>
              <Td {...tdProps}>{user.issuers[action.issuer].username} (UserID: {action.issuer}, Email: {user.issuers[action.issuer].email})</Td>
              <Td {...tdProps}>{action.message}</Td>
              <Td {...tdProps}>{moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Td>
              <Td {...tdProps}>{action.duration < 1 ? "N/A" : moment(date).add(action.duration, "seconds").format("dddd, MMMM Do YYYY, h:mm:ss a") + ", " + moment.duration((dateSeconds+action.duration)-moment().unix(), "seconds").humanize(true)}</Td>
              <Td {...tdProps}><DeleteButton index={action.date} callback={deleteActionButton} warningMessage="This will permanently delete this moderation action, and will remove any effect it has if it is still active." aria="Delete moderation action"/></Td>
            </Tr>
          );
        })}
        <ModerationAdd tdProps={tdProps} currentUser={currentUser} callback={createActionButton}/>
      </Tbody>
    </Table>
  );
};

export default ModerationTable;