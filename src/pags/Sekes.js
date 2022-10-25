
import { Box } from "@mui/material";
import { React, useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import CreateMeetModal from '../Components/CreateMeetModal'

const goClient = () => {
  const l = window.location.href;

  console.log(l);
  //window.location.href = 'http://localhost:3000/Client'
}



const Sekes = () => {
  const [data, setData] = useState(); //회의 목록
  const [meetData, setMeetData] = useState();
  const [starthome, setModal] = useState(false);
  const [roomName, setRoomName] = useState();

  const testonclick = idx => {
    console.log(idx);
    window.location.href = '/Sekes/' + idx;

  }
  const ingmeetclick = idx =>{
    console.log(idx);
    window.location.href = '/Client/'+idx;
  }

  useEffect(() => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]);
    
    //창훈이형 그룹 내 회의 목록
    (async () => {
      try {
        const res = await axios.post('http://192.168.2.65:5000/readMeeting', {
          roomNum: room
        });
        // console.log(res.data);
        setData(res.data);
        // console.log(res.data[0].roomName);
        setRoomName(res.data[0].roomName);

      } catch (error) {
        console.log(error)
      }
    })();


    
    //현재 진행중인 회의 리스트
    (async () => {
      try {
        const ing = await axios.post('http://192.168.2.65:5000/readMeetingRoom', {
          roomNum: room
        });
        console.log(ing.data);
        setMeetData(ing.data);

      } catch (error) {
        console.log(error)
      }
    })();

  }, [])



  return (
    <Box width="100%" display="flex" flexDirection="column" m="20px">
      <CreateMeetModal show={starthome} onHide={() => setModal(false)} />
      <Box display="flex" flexDirection="column" m="20px" >

        <Table striped>
          <thead>
            <tr flexDirection="column">
              <td>

              </td>
              <td bg="right"></td>
              <td bg="right"></td>
              <td bg="right"> <Button variant="outline-secondary" onClick={() => setModal(true)}>회의 생성</Button></td>
            </tr>

            <tr>
              <th>번호</th>
              <th>회의명</th>
              <th>시간</th>
              <th>호스트</th>

            </tr>
          </thead>

          <tbody>
            {

              
            }
            
            {
              data && data.map((e, idx) =>
                <tr  id="test" class="blinking" onClick={() => testonclick(e.roomNum)}>
                  {/* id="test" class="blinking" 위에 깜박 거리는 css*/ }
                  <th> {idx + 1}</th>
                  <th >{e.meetTitle}</th> {/* 회의 이름 */}
                  <th>{e.meetDate}</th> {/* 회의 종료 날짜 */}
                  <th>{e.meethost}</th> {/* 회의 만든 사람 */}
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