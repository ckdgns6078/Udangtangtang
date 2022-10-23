import { Box } from "@mui/material";
import { Outlet, useRoutes } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { SidebarData } from "../Components/SidebarData";
import Client from "../pags/Client";
import Home from "../pags/Home";
import Sekes from "../pags/Sekes";

const Routes = () => useRoutes([{path: "/", element: <div> <SidebarData /> 
<div class="main" >
    <Box display={["none","initial","initial"]}>
        <Sidebar />
    </Box>
  <Outlet/> 
  {/* {/* <Routes>
    <Route path="/" element={< Home />}></Route>
    <Route path="/Sekes" element={<Sekes />}></Route>
    <Route path="/Client" element={<Client />}></Route>
  </Routes> */}  
</div>
</div>, children: [{index: true, element: <Home/>},
{path:"/Sekes/:id", element: <Sekes/>},
{path:"Client/:id/:id", element: <Client />}]}]);

export default Routes;