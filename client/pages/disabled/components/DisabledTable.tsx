import {ActiveActionsType} from "../../../../shared/moderation";
import {Link, Table, TableCaption, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React from "react";
import {Config} from "../../../../../../shared/config/types/config";
import {GetConfig} from "../../../../../../shared/config/configStore";
import {ModerationConfigs} from "../../../../config/types/ModerationConfigs";
import {UsersPageUser} from "../../../../shared/types/UsersPageTypes";
import {IssuerInfo, ModerationTypesMap} from "../../../../shared/types/ModerationPageTypes";
import moment from "moment";

const DisabledTable = ({actions, user, issuers, config}: { actions: ActiveActionsType[], user: UsersPageUser, issuers: Record<number, IssuerInfo>, config: Record<string, Config> }) => {
  const thProps = {color: "white", border: "1px solid white"};
  const tdProps = {border: "1px solid white"};

  const moderationConfigs = GetConfig<ModerationConfigs>("client/admin/moderation.json", config);

  return (
    <Table
      size="md"
      width="90%"
      m="auto"
      borderWidth="1px"
    >
      <TableCaption placement="top" color="white">Users with disabled accounts.</TableCaption>
      <Thead>
        <Tr>
          <Th {...thProps} isNumeric>ID</Th>
          <Th {...thProps}>Email</Th>
          <Th {...thProps}>Username</Th>
          {moderationConfigs.moderationPageEnabled ? <Th {...thProps}>Moderation</Th> : null}
          <Th {...thProps}>Type</Th>
          <Th {...thProps}>Issuer</Th>
          <Th {...thProps}>Message</Th>
          <Th {...thProps}>Time</Th>
          <Th {...thProps}>Expires</Th>
        </Tr>
      </Thead>
      <Tbody>
        {actions.map(action => {
          const dateSeconds = Math.floor(action.action.date / 1000);
          const date = new Date(action.action.date);

          return (
            <Tr key={action.action.date}>
              <Td {...tdProps} isNumeric>{user.userId}</Td>
              <Td {...tdProps}>{user.email}</Td>
              <Td {...tdProps}>{user.username}</Td>
              {moderationConfigs.moderationPageEnabled ? <Td {...tdProps}><Link href={moderationConfigs.moderationPageURL+"/"+user.userId} color="cyan" textDecor="underline">View moderation actions</Link></Td> : null}
              <Td {...tdProps}>{ModerationTypesMap[action.action.type]}</Td>
              <Td {...tdProps}>{issuers[action.action.issuer].username} (UserID: {action.action.issuer}, Email: {issuers[action.action.issuer].email})</Td>
              <Td {...tdProps}>{action.action.message}</Td>
              <Td {...tdProps}>{moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Td>
              <Td {...tdProps}>{action.action.duration < 1 ? "N/A" : moment(date).add(action.action.duration, "seconds").format("dddd, MMMM Do YYYY, h:mm:ss a") + ", " + moment.duration((dateSeconds+action.action.duration)-moment().unix(), "seconds").humanize(true)}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default DisabledTable;