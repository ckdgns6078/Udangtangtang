
import { Box } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Modal from "../Components/Modal";

const goCient = () => {
  window.location.href = 'http://localhost:3000/Client'
}



const Sekes = () => {
const param = useParams()

const  params  = useParams()


const [data, setData] = useState();

  useEffect( () =>{

 (async ()=>{
  try {
    console.log(window.location.href);
    console.log(params);
       const res = await axios.post("http://192.168.2.65:5000/readMeeting",{
        roomNum : params.id

        

       });
       console.log(res.data);
       setData(res.data);
    } catch (error) {
        console.log(error)
    }
  })();
    
},[])

const Clientgo = () => {
  {
    data && data.map((e, idx) =>

      
    <Link key={idx} to={`/Client/${e.roomNum}/${e.meetNum}`}> {e.meetNum}</Link>
       

    )
  }
}







  return (
    <Box display={"flex"} flexDirection={"column"} width="100%">
      
      <Box width="100%" display="flex" flexDirection="column" m="20px" >
    <Table striped>
     

    <thead>
      <tr>
        <th>링크</th>
        <th>번호</th>
        <th>회의 목록</th>
        <th>시간</th>
      </tr>
    </thead>

    <tbody>
          {
            data && data.map((e, idx) =>

              <tr onClick={Clientgo()} >
                 <th> {e.meetNum}</th>
                <th>{e.meetNum}</th>
                <th>{e.meetTitle}</th>
           
               
                <th>{e.meetDate}</th>


              </tr>

            )
          }

        </tbody>
     
    
  </Table>
  </Box>
  
  </Box>
  )
}

export default Sekes 