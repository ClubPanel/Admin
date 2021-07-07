import React, {useState} from "react";
import UserPermission from "./UserPermission";
import UserPermissionAddTextbox from "./UserPermissionAddTextbox";
import {AddIcon} from "@chakra-ui/icons";
import {Box, IconButton, useToast} from "@chakra-ui/react";
import axios from "axios";

const UserPermissions = ({csrf, permissions, user} : { csrf: string, permissions: string[], user: number }) : JSX.Element => {
  const [perms, setPerms] = useState(permissions);
  const [text, setText] = useState("");

  const toast = useToast();

  const addNew = () => {
    const fixedPermission = text.trim().toLowerCase();
    if(!fixedPermission || perms.includes(fixedPermission)) return;

    axios.post("/adminmodulebackend/adduserpermission", {csrf, permission: fixedPermission, user}).then(res => {
      toast({
        title: "Success",
        description: res.data,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
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

    setPerms(perms.concat([fixedPermission]));
    setText("");
  };

  const removePermission = (name: string) => {
    axios.post("/adminmodulebackend/removeuserpermission", {csrf, permission: name, user}).then(res => {
      toast({
        title: "Success",
        description: res.data,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
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