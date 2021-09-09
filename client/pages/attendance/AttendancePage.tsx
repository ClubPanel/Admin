import React from "react";
import {RenderProps} from "../../../../../pages/[[...name]]";
import AttendanceAccordion from "./components/AttendanceAccordion";
import {AttendancePageData} from "../../../shared/types/AttendancePageTypes";

const AttendancePage = ({config, userInfo, data, csrf} : Partial<RenderProps>) : JSX.Element => {
  const info = data as AttendancePageData;

  return (
    <AttendanceAccordion attendances={info.attendance} availableUsers={info.users} csrf={csrf}/>
  );
};

export default AttendancePage;