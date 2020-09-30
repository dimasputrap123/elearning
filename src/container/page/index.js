import JoinPage from "./JoinPage";
import Loginpage from "./Loginpage";
import OtherPage from "./OtherPage";
// import Other2Page from "./Other2Page";
import RoomPage from "./RoomPage";
const pages = [
  {
    component: OtherPage,
    path: "/other",
    type: "public",
    // showLeaveConfirm: true,
    // manualLeave: true,
  },
  {
    component: RoomPage,
    path: "/room",
    type: "private",
  },
  {
    component: Loginpage,
    path: "/login",
    type: "public",
  },
  {
    component: JoinPage,
    path: "/",
    type: "private",
  },
];

export default pages;
