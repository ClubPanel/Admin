import {DeleteIcon} from "@chakra-ui/icons";
import {Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import React, {useRef} from "react";

export const UserDeleteButton = ({user, callback} : { user: number, callback: Function }) : JSX.Element => {
  const triggerButton = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        ref={triggerButton}
        d="inline-block"
        bg="dark.700"
        aria-label="Delete user"
        icon={<DeleteIcon/>}
        onClick={onOpen}
        _hover={{bg: "dark.300"}}
        size="md"
        rounded="5px"
      />
      <Modal
        onClose={onClose}
        finalFocusRef={triggerButton}
        isOpen={isOpen}
        scrollBehavior="inside"
        colorScheme="dark"
      >
        <ModalOverlay />
        <ModalContent
          bg="dark.500"
        >
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Deleting a user will permanently wipe all of their data, including any moderation actions taken against them.
          </ModalBody>
          <ModalFooter>
            <Button bg="dark.600" onClick={() => {
              onClose();
              callback(user);
            }}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};