import {ClientSide} from "../../../shared/module/moduleClient";
import {preRender, register, render} from "./client";

const output: ClientSide = {
  register,
  events: {
    preRender,
    render
  },
  priority: 5687,
  identifier: "admin"
};

export default output;