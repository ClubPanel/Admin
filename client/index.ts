import {ClientSide} from "../../../shared/module/moduleClient";
import {preRender, register, render} from "./client";

const output: ClientSide = {
  register,
  configs: ["client/admin.json"],
  events: {
    preRender,
    render
  },
  priority: 5687
};

export default output;