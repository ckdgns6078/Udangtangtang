
import axios from 'axios';
import { React, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const ReadReply = () => {
  const [roonum, setRoomNum] = useState();
  const [meetnum, setMeetNum] = useState();

  const [replyWriter, setReplyWriter] = useState(); //이름
  const [replyText, setReplyTestt] = useState(); //메모 내용
  const [replyDate, setReplyDate] = useState(); //시간
  const [replyNum, setReplyNum] = useState(); //메모 넘버
  const [data, setData] = useState();

   // 메모 삭제
  const DeleteReply = () => {

    (async (renum) => {
      const location = window.location.href;
      var room = parseInt(location.split("/")[4]); //roomnum
      setRoomNum(room); //roomnum  set
      console.log(room);
      var meet = parseInt(location.split("/")[5]); //meetnum
      setMeetNum(meet); // meetnum  set
      console.log(meet);

      
      setReplyNum(renum);
      try {
        await axios.post('http://192.168.2.82:5000/deleteReply', {
          roomNum: room,
          meetNum: meet,
          replyWriter: sessionStorage.getItem("id"),
          replyNum: renum
        })
      }
      catch (e) {
        console.error(e);
      }

    })();
  }



  const delet = renum => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //roomnum
    setRoomNum(room); //roomnum  set
    console.log(room);
    var meet = parseInt(location.split("/")[5]); //meetnum
    setMeetNum(meet); // meetnum  set
    console.log(meet);

    console.log(renum);
    axios.post('http://192.168.2.82:5000/deleteReply', {
      roomNum: room,
      meetNum: meet,
      replyWriter: sessionStorage.getItem("id"),
      replyNum: renum
    })
    .then(function (response) {
        // response  
        console.log(response.data)
        
    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });
  }











//메모수정
const  UpdateReply = async () =>{
  try{
      await axios.post('http://192.168.2.82:5000/updateReply',{
  
  })
  }
  catch (e){
    console.error(e);
  }

}



  useEffect(() => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //roomnum
    setRoomNum(room); //roomnum  set
    console.log(room);
    var meet = parseInt(location.split("/")[5]); //meetnum
    setMeetNum(meet); // meetnum  set
    console.log(meet);

    (async () => {
      try {
        const res = await axios.post("http://192.168.2.82:5000/readReply",
          {
            roomNum: room,
            meetNum: meet    
          });
        console.log("asd")
        console.log(res.data)
        setData(res.data);
        // setReplyNum(res.data);
      } catch (error) {
        console.log(error)
      }
    })();


  }, [])












  return (
    <Box width="100%" display="flex" flexDirection="column" m="20px">
      <Grid item xs={15} >
        {
          data && data.map((e, idx) =>
            <div>
              <Item>
                <Navbar>
                  <Container>
                    <Navbar.Brand href="#home"><Chip label={e.replyWriter} /></Navbar.Brand>

                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                      <Navbar.Text>
                        <tr>
                          <td>   {e.replyDate}   </td>
                          &nbsp;&nbsp;
                          <td>  
                            <NavDropdown title="" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">수정</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => delet(e.replyNum)} >삭제</NavDropdown.Item>
                            </NavDropdown>
                          </td>
                        </tr>


               

                      </Navbar.Text>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>


                <Stack direction="row" spacing={1}>

                </Stack>
                <h6>{e.replyText}</h6>

              </Item>
              <br></br>
            </div>
          )
        }
      
      </Grid> 
    </Box>

  );
};

export default ReadReply;


