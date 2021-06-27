import {ServerSide} from "../../../shared/module/moduleServer";
import {getData} from "./server";
import {register} from "./pages";

const output: ServerSide = {
  register,
  events: {
    getData
  },
  priority: 5687
};

export default output;