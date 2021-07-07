import React, {useState} from "react";
import UserPermission from "./UserPermission";
import UserPermissionAddTextbox from "./UserPermissionAddTextbox";
import {AddIcon} from "@chakra-ui/icons";
import {Box, IconButton} from "@chakra-ui/react";

const UserPermissions = ({csrf, permissions, user} : { csrf: string, permissions: string[], user: number }) : JSX.Element => {
  const [perms, setPerms] = useState(permissions);
  const [text, setText] = useState("");

  const addNew = () => {
    const fixedPermission = text.trim().toLowerCase();
    if(!fixedPermission || perms.includes(fixedPermission)) return;

    setPerms(perms.concat([fixedPermission]));
    setText("");
  };

  const removePermission = (name: string) => {
    setPerms(perms.filter(perm => perm !== name));
  };

  return (
    <>
      {perms.map(permission => {
        return (
          <UserPermission callback={removePermission} permission={permission} key={permission}/>
        );
      })}
      <Box>
        <UserPermissionAddTextbox value={text} callback={setText}/>
        <IconButton
          mx={{base: "5px"}}
          bg="dark.700"
          aria-label="Add permission"
          icon={<AddIcon/>}
          onClick={() => addNew()}
          _hover={{bg: "dark.300"}}
          size="sm"
          rounded="5px"
        />
      </Box>
    </>
  );
};

export default UserPermissions;