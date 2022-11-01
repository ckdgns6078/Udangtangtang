
import axios from 'axios';
import { React, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UpdateReplyModal from '../Components/UpdateReplyModal';
import { TextField } from '@mui/material';
import { FormControl } from 'react-bootstrap';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const ReadReply = () => {
  const [signUpModalOn, setSignUpModalOn] = useState(false);


  const [roonum, setRoomNum] = useState();
  const [meetnum, setMeetNum] = useState();

  const [replyWriter, setReplyWriter] = useState(); //이름
  const [replyText, setReplyTestt] = useState(); //메모 내용
  const [replyDate, setReplyDate] = useState(); //시간
  const [replyNum, setReplyNum] = useState(); //메모 넘버
  const [data, setData] = useState();

  // 메모 삭제
  // const DeleteReply = () => {
  //   (async (renum) => {
  //     const location = window.location.href;
  //     var room = parseInt(location.split("/")[4]); //roomnum
  //     setRoomNum(room); //roomnum  set
  //     console.log(room);
  //     var meet = parseInt(location.split("/")[5]); //meetnum
  //     setMeetNum(meet); // meetnum  set
  //     console.log(meet);


  //     setReplyNum(renum);
  //     try {
  //       await axios.post('http://192.168.2.82:5000/deleteReply', {
  //         roomNum: room,
  //         meetNum: meet,
  //         replyWriter: sessionStorage.getItem("nickname"),
  //         replyNum: renum
  //       })
  //       console.log(renum);
  //     }

  //     catch (e) {
  //       console.error(e);
  //     }

  //   })();
  // }



  const DeleteReply = renum => {
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
      replyWriter: sessionStorage.getItem("nickname"),
      replyNum: renum
    })
      .then(function (response) {
        // response  
        console.log(response.data)

      }).catch(function (error) {
        // 오류발생시 실행
      }).then(function () {
        // 항상 실행
      });
  }











  //메모수정
  const UpdateReply = (renum) => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //roomnum
    setRoomNum(room); //roomnum  set
    console.log(room);

    var meet = parseInt(location.split("/")[5]); //meetnum
    setMeetNum(meet); // meetnum  setx
    console.log(meet);

    const udreplyText = document.getElementById(renum).value; //수정하려는 값을 가져옴
    const result = window.confirm("정말 수정하시겠습니까?");
    if (result) {
      axios.post('http://192.168.2.82:5000/updateReply', {
        roomNum: room,
        meetNum: meet,
        replyNum: parseInt(renum),
        replyText: udreplyText,
        replyWriter: sessionStorage.getItem("nickname")
      })
        .then(function (response) {
          // response  
          console.log(response.data)
          if (response.data){
            alert("수정되었습니다.")
            window.location.reload();
          }else{
            alert("메모 작성자만 수정할 수 있습니다")
            window.location.reload();
          }
        }).catch(function (error) {
          // 오류발생시 실행
        }).then(function () {
          // 항상 실행
        });
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
        // console.log("asd")
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
                              <NavDropdown.Item type="submit" onClick={() => UpdateReply(e.replyNum)} >수정</NavDropdown.Item>
                              <NavDropdown.Item onClick={() => DeleteReply(e.replyNum)} >삭제</NavDropdown.Item>

                            </NavDropdown>
                          </td>
                        </tr>
                      </Navbar.Text>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>


                <Stack direction="row" spacing={1}>

                </Stack>
                <form>
                  <TextField fullWidth label="메모 내용" id={e.replyNum} defaultValue={e.replyText}></TextField>
                </form>
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


