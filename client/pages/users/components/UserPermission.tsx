import {Box, chakra, IconButton} from "@chakra-ui/react";
import React from "react";
import {MinusIcon} from "@chakra-ui/icons";

const UserPermission = ({callback, permission}: { callback: Function, permission: string }) : JSX.Element => {
  return (
    <Box
      d="inline-block"
      my="2px"
      mr="10px"
    >
      <chakra.div
        mx={{base: "5px"}}
        d="inline-block"
      >
        {permission}
      </chakra.div>
      <IconButton
        d="inline-block"
        mx={{base: "5px"}}
        bg="dark.700"
        aria-label="Add permission"
        icon={<MinusIcon/>}
        onClick={() => callback(permission)}
        _hover={{bg: "dark.300"}}
        size="sm"
        rounded="5px"
      />
    </Box>
  );
};

export default UserPermission;