
import axios from 'axios';
import { React, useState, useEffect } from "react";

import Card from 'react-bootstrap/Card';
import Box from '@mui/material/Box';

const ReadReply = () => {
  const [roonum, setRoomNum] = useState();
  const [meetnum, setMeetNum] = useState();

  const [replyWriter, setReplyWriter] = useState(); //이름
  const [replyText, setReplyTestt] = useState(); //메모 내용
  const [replyDate, setReplyDate] = useState(); //시간
  const [replyNum, setReplyNum] = useState(); //메모 넘버
  const [data, setData] = useState();

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
      
 



  

        {
          data && data.map((e, idx) =>
          <Card border="light" style={{ width: '18rem' }}>
          <Card.Header>닉네임:{e.replyWriter} 시간: {e.replyDate} </Card.Header>
          <Card.Body>
            {/* <Card.Title>Light Card Title</Card.Title> */}
            <Card.Text>
             {e.replyText}
            </Card.Text>
          </Card.Body>
        </Card>
          )
        }






    </Box>
  );
};

export default ReadReply;