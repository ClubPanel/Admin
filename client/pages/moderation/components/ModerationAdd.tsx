import React, {useState} from "react";
import {IconButton, Input, Select, Td, Tr} from "@chakra-ui/react";
import moment from "moment";
import {UserInfo} from "../../../../../../server/database/models/user";
import ReactDatePickup from "react-datepicker";
import {AddIcon} from "@chakra-ui/icons";

const ModerationAdd = ({tdProps, currentUser, callback} : { tdProps: object, currentUser: UserInfo, callback: Function}) : JSX.Element => {
  const [curDate, setCurDate] = useState(new Date());

  const [newType, setNewType] = useState(-1);
  const [newMessage, setNewMessage] = useState("");
  const [newExpiryDate, setNewExpiryDate] = useState(curDate);

  const reset = () => {
    setCurDate(new Date());
    setNewType(-1);
    setNewMessage("");
    setNewExpiryDate(curDate);
  };

  return (
    <>
      <Tr
        height="10vh"
      />
      <Tr>
        <Td {...tdProps}>
          <Select placeholder="Select type" onChange={(ev) => setNewType(((parseInt(ev.target.value) + 1) || 0) - 1 /* gross solution, just turns NaN to -1 */)} value={newType}>
            <option value={0}>Warning</option>
            <option value={1}>Activity Suspension</option>
            <option value={2}>Suspension</option>
            <option value={3}>Expulsion</option>
          </Select>
        </Td>
        <Td {...tdProps}>{currentUser.username} (UserID: {currentUser.userId}, Email: {currentUser.email})</Td>
        <Td {...tdProps}>
          <Input
            type="text"
            bg="dark.700"
            value={newMessage}
            onChange={(ev) => setNewMessage(ev.target.value)}
            rounded="2px"
            placeHolder="Message"
          />
        </Td>
        <Td {...tdProps}>{moment(curDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Td>
        <Td {...tdProps}>
          <ReactDatePickup
            selected={newExpiryDate}
            onChange={(date) => setNewExpiryDate(date as Date)}
            selectsEnd
            startDate={curDate}
            endDate={newExpiryDate}
            minDate={curDate}
          />
        </Td>
        <Td {...tdProps}>
          <IconButton
            mx={{base: "5px"}}
            bg="dark.700"
            aria-label="Add moderation action"
            icon={<AddIcon/>}
            onClick={() => callback(moment(newExpiryDate).subtract(+curDate, "milliseconds").unix(), newMessage, newType, reset)}
            _hover={{bg: "dark.300"}}
            size="sm"
            rounded="5px"
          />
        </Td>
      </Tr>
    </>
  );
};

export default ModerationAdd;