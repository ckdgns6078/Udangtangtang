import { Box } from "@mui/material";
import { Outlet, useRoutes } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { SidebarData } from "../Components/SidebarData";
import Client from "../pags/Client";
import Home from "../pags/Home";
import Sekes from "../pags/Sekes";
import Client_2 from "../pags/Client_2";
import Setting from "../pags/Setting";
import SettingMeet from '../pags/SettingMeet';

const Routes = () => useRoutes([{
  path: "/", element: <div> <SidebarData />
    <div className="main" >
      <Box display={["none", "initial", "initial"]}>
        <Sidebar />
      </Box>
      <Outlet />
      {/* {/* <Routes>
    <Route path="/" element={< Home />}></Route>
    <Route path="/Sekes" element={<Sekes />}></Route>
    <Route path="/Client" element={<Client />}></Route>
  </Routes> */}
    </div>

  </div>, children: [{ index: true, element: <Home /> },
  { path: "/Sekes/:id", element: <Sekes /> },
  { path: "Client/:id/:id", element: <Client /> },
  { path: "Client_2/:id/:id", element: <Client_2 /> },
  { path: "Setting", element: <Setting /> },
  { path: "SettingMeet/:id", element: <SettingMeet /> }
  ]
}]);




export default Routes;