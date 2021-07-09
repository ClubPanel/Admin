import {chakra} from "@chakra-ui/react";
import React, {useRef} from "react";

const UserPermissionAddTextbox = ({value, callback} : { value: string, callback: Function }) => {
  return (
    <chakra.input
      mx={{base: "5px"}}
      type="text"
      bg="dark.700"
      value={value}
      onChange={(ev) => callback(ev.target.value)}
      rounded="2px"
    />
  );
};

export default UserPermissionAddTextbox;