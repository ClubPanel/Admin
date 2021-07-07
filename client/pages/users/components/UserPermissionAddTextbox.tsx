import { chakra } from "@chakra-ui/react";
import React, {useRef} from "react";

const UserPermissionAddTextbox = ({value, callback} : { value: string, callback: Function }) => {
  const ref = useRef<HTMLInputElement>();

  return (
    <chakra.input
      mx={{base: "5px"}}
      type="text"
      ref={ref}
      bg="dark.700"
      value={value}
      onChange={() => callback(ref.current.value)}
      rounded="2px"
    />
  );
};

export default UserPermissionAddTextbox;