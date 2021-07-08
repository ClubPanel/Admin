import {DeleteIcon} from "@chakra-ui/icons";
import {Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import React, {useRef} from "react";

export const DeleteButton = ({index, callback, warningMessage, aria} : { index: number, callback: Function, warningMessage: string, aria: string }) : JSX.Element => {
  const triggerButton = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        ref={triggerButton}
        d="inline-block"
        bg="dark.700"
        aria-label={aria}
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
            {warningMessage}
          </ModalBody>
          <ModalFooter>
            <Button bg="dark.600" onClick={() => {
              onClose();
              callback(index);
            }}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};