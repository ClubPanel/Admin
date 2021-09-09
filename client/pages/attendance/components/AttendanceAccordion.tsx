import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";
import React from "react";
import AttendanceDayTable from "./AttendanceDayTable";
import {AttendanceUser} from "../../../../shared/types/AttendancePageTypes";

const AttendanceAccordion = ({attendances, availableUsers, csrf}: {attendances: Record<string, AttendanceUser[]>, availableUsers: AttendanceUser[], csrf: string}) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <Accordion defaultIndex={[1]} allowMultiple allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex={1}>
              Previous Days
            </Box>
            <AccordionIcon/>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Accordion allowMultiple allowToggle>
            {Object.keys(attendances).sort().filter(key => key !== today).map(key => ({key, value: attendances[key]})).map(({key, value}) => {
              return (
                <AccordionItem key={key}>
                  <h2>
                    <AccordionButton>
                      <Box flex={1}>
                        {key}
                      </Box>
                      <AccordionIcon/>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <AttendanceDayTable day={key} users={value} availableUsers={availableUsers} isToday={false} csrf={csrf}/>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex={1}>
              Today
            </Box>
            <AccordionIcon/>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <AttendanceDayTable day={today} users={attendances[today] || []} availableUsers={availableUsers} isToday={true} csrf={csrf}/>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AttendanceAccordion;