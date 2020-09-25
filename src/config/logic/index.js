import * as authLogic from "./authLogic";
import * as stateLogic from "./stateLogic";
import * as roomLogic from "./roomLogic";
// export default [...Object.values(authLogic), ...Object.values(stateLogic)];
export default [
  Object.values(authLogic),
  Object.values(stateLogic),
  Object.values(roomLogic),
];
