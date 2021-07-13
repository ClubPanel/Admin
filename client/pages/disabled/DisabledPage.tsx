import {RenderProps} from "../../../../../pages/[[...name]]";
import DisabledTable from "./components/DisabledTable";
import {DisabledPageData} from "../../../shared/types/DisabledPageTypes";
import React from "react";

const DisabledPage = ({config, userInfo, data, csrf} : Partial<RenderProps>) : JSX.Element => {
  const info = data as DisabledPageData;

  return (
    <DisabledTable config={config} {...info}/>
  );
};

export default DisabledPage;