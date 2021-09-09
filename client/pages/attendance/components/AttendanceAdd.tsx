import {IconButton, Select, Td, Tr} from "@chakra-ui/react";
import React, {useState} from "react";
import {AddIcon} from "@chakra-ui/icons";
import {AttendanceUser} from "../../../../shared/types/AttendancePageTypes";

const AttendanceAdd = ({availableUsers, tdProps, callback, currentUsers}: {availableUsers: AttendanceUser[], tdProps: object, callback: Function, currentUsers: AttendanceUser[]}) => {
  const [newID, setNewID] = useState(-1);

  const currentIDs = currentUsers.map(user => user.id);

  return (
    <>
      <Tr
        height="10vh"
      />
      <Tr>
        <Td {...tdProps}>
          <Select placeholder="Select user" onChange={(ev) => setNewID(((parseInt(ev.target.value) + 1) || 0) - 1 /* gross solution, just turns NaN to -1 */)} value={newID}>
            {availableUsers.filter(user => !currentIDs.includes(user.id)).map(user => {
              return (
                <option value={user.id} key={user.id}>{user.text}</option>
              );
            })}
          </Select>
        </Td>
        <Td {...tdProps}>
          <IconButton
            mx={{base: "5px"}}
            bg="dark.700"
            aria-label="Add user to attendance list"
            icon={<AddIcon/>}
            onClick={() => {
              if(newID === -1) return;
              const text = availableUsers.filter(user => user.id === newID)[0]?.text;
              if(text == null) return;

              callback(text, newID);
            }}
            _hover={{bg: "dark.300"}}
            size="sm"
            rounded="5px"
          />
        </Td>
      </Tr>
    </>
  );
};

export default AttendanceAdd;