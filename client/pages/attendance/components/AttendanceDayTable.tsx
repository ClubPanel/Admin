import {IconButton, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useToast} from "@chakra-ui/react";
import React, {useState} from "react";
import {ModerationType} from "../../../../shared/types/ModerationPageTypes";
import axios from "axios";
import AttendanceAdd from "./AttendanceAdd";
import {AddIcon, CloseIcon} from "@chakra-ui/icons";
import {AttendanceUser} from "../../../../shared/types/AttendancePageTypes";

const AttendanceDayTable = ({day, users, availableUsers, isToday, csrf}: {day: string, users: AttendanceUser[], availableUsers: AttendanceUser[], isToday: boolean, csrf: string}) => {
  const thProps = {color: "white", border: "1px solid white"};
  const tdProps = {border: "1px solid white"};

  const toast = useToast();

  const [usersArr, setUsers] = useState(users);

  const modifyAttendance = (text: string, id: number, isDelete?: boolean) => {
    axios.post((isDelete ? "/adminmodulebackend/deleteattendance" : "/adminmodulebackend/createattendance"), {csrf, id}).then(res => {
      toast({
        title: "Success",
        description: res.data,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });

      console.log(usersArr, usersArr.concat([{text, id}]));
      if(isDelete) setUsers(usersArr.filter(user => user.id !== id));
      else setUsers(usersArr.concat([{text, id}]));
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
      <TableCaption placement="top" color="white">Attendance for {day}</TableCaption>
      <Thead>
        <Tr>
          <Th {...thProps}>Name</Th>
          {isToday ? <Th {...thProps}>Add/Remove</Th> : null}
        </Tr>
      </Thead>
      <Tbody>
        {usersArr.map((user) => {
          return (
            <Tr key={user.id}>
              <Td {...tdProps}>{user.text}</Td>
              {isToday ? (
                <Td {...tdProps}><IconButton
                  mx={{base: "5px"}}
                  bg="dark.700"
                  aria-label="Remove user from attendance list"
                  icon={<CloseIcon/>}
                  onClick={() => {
                    modifyAttendance(user.text, user.id, true);
                  }}
                  _hover={{bg: "dark.300"}}
                  size="sm"
                  rounded="5px"
                /></Td>
              ) : null}
            </Tr>
          );
        })}
        {isToday ? <AttendanceAdd tdProps={tdProps} callback={modifyAttendance} availableUsers={availableUsers} currentUsers={usersArr}/> : null}
      </Tbody>
    </Table>
  );
};

export default AttendanceDayTable;