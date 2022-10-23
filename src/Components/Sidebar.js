import {React, useState}  from "react";
import  HomeLest from '../Components/HomeLest'
import Button from 'react-bootstrap/Button';
import Modal from "../Components/Modal";
import Sekes from "../pags/Sekes";
import { Link } from "react-router-dom";
import Client from "../pags/Client"

// import Meeting from '../Components/Meeting';

import SidHome from "../pags/SidHome";

// eslint-disable-line no-unused-vars
const Sidebar = () => {

    const [gohome, setHomeLest] =useState(false);
    const [starthome, setModal] = useState(false);
    const [gomeeting, setMeeting] = useState(false);
  

    return(
        
        <div className='Sidebar'>
            <HomeLest show = {gohome} onHide = {()=> setHomeLest(false)}/>
            <Modal  show = {starthome} onHide= {() => setModal(false) }/>
            {/* <Meeting  show = {gomeeting} onHide= {() => setMeeting(false) }/>    */}

            <ul >
                <li>
                <Button variant="outline-secondary" size="lg" onClick={() => setHomeLest(true)}>+ 방 만들기</Button> 
                </li>

                <li>
                <Button variant="outline-secondary" size="lg" onClick={() => setModal(true)}>+ 방 입장하기</Button> 
                </li>


                {/* <li>
                <Button variant="outline-secondary" size="lg" onClick={() => setMeeting(true)}>+ 방 입장하기</Button> 
                </li> */}


                
                <li>
                    <SidHome></SidHome>
                 
                </li>
                
            </ul>   

        </div>
    )
}

export default  Sidebar;

