import { React, useState } from "react";
import HomeLest from '../Components/HomeLest'
import Button from 'react-bootstrap/Button';
import Modal from "../Components/Modal";
import SidHome from "../pags/SidHome";
import { Box } from "@mui/material";
// eslint-disable-line no-unused-vars
const Sidebar = () => {

    const [gohome, setHomeLest] = useState(false);
    const [starthome, setModal] = useState(false);


    return (

        <Box display="flex" flexDirection="column" m="20px" className='Sidebar'>
            <HomeLest show={gohome} onHide={() => setHomeLest(false)} />
            <Modal show={starthome} onHide={() => setModal(false)} />

            <ul>
                <div className="d-grid gap-2">
                    <Button variant="outline-secondary" size="lg" onClick={() => setHomeLest(true)}>+ 방 만들기</Button>
                    <Button variant="outline-secondary" size="lg" onClick={() => setModal(true)}>+ 방 입장하기</Button>
                </div>
                <div >
                    
                </div>
         
                <li>
                    <SidHome></SidHome>
                </li>
            </ul>
        </Box>

    )
}

export default Sidebar;

