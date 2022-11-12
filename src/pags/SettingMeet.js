
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import axios from 'axios';
import noData from '../img/NoData.png';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ModifyMeet from './ModifyMeet';
import DeleteMeet from './DeleteMeet';

const SettingMeet = () => {
    const [data, setData] = useState();
    const [isHave, setIsHave] = useState(true);

    const [change, setChange] = useState(0);

    useEffect(() => {
        const location = window.location.href;
        var room = parseInt(location.split("/")[4]);

        (async () => {
          try {
            const res = await axios.post('http://192.168.2.82:5000/readMeeting', { //창훈이형 그룹 내 회의 목록
              roomNum: room
            });
            setData(res.data);

          } catch (error) {
            console.log(error)
            setIsHave(false); 
          }
        })();
    }, []);

    const table = (num) => {
        //1->수정 2->삭제

        const e = document.getElementById("exp");

        if (num === 1) {
            setChange(1);
            e.innerHTML = "<h5>회의 수정 : 회의 명을 입력하고 버튼을 클릭하면 수정됩니다 </h5>"
        }

        else if (num == 2) {
            setChange(2);
            e.innerHTML = "<h5>회의 삭제 : 삭제하고자 하는 회의의 버튼을 클릭하세요. </h5>"
        }
    }


    return (
        //responsive 테이블은 반응 형으로 만들어 줌

        <Box width="100%" display="flex" flexDirection="column" m="20px">
            <Box width="100%" display="flex" flexDirection="column" >

                <Navbar>
                    <Container>
                        <Navbar.Brand ><h3>Setting</h3> - Meeting</Navbar.Brand>

                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <ToggleButtonGroup type="radio" name="options">
                                    <ToggleButton id="tbg-radio-1" variant="outline-secondary" value={1} onClick={(e) => table(1)}>
                                        회의 수정
                                    </ToggleButton>

                                    &nbsp;&nbsp;

                                    <ToggleButton id="tbg-radio-2" variant="outline-secondary" value={2} onClick={(e) => table(2)}>
                                        회의 삭제
                                    </ToggleButton>
                                    &nbsp;&nbsp;
                                   
                                </ToggleButtonGroup>

                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>



                <Table responsive="lg">
                    <thead>

                        <tr>
                            <td colSpan={5}>
                                <div id="exp"></div>
                            </td>

                        </tr>
                        <tr>
                            <th>번호</th>
                            <th>회의명</th>
                            <th>날짜</th>
                            <th>상세기능</th>


                        </tr>
                    </thead>

                    {
                        change === 0 ? ( //change===0이면 그냥 모든 목록 보여주기
                            data == null ? <tbody><tr>
                            <th colSpan={4} style={{ backgroundColor: 'white' }}>
                              <div style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white'
                              }} ><div><img src={noData} /></div> </div>
                            </th>
                          </tr></tbody> : <tbody>{data && data.map((e, idx) =>
                                <tr >
                                    <th>{idx + 1}</th>
                                    <th> {e.meetTitle}</th>
                                    <th>{e.meetDate}</th>
                                    <th></th>
                                </tr>
                            )}</tbody>
                        ) : (change === 1 ? <ModifyMeet /> : ( //0이 아니라 1이면 ~~~~ 회의 수정 tbody를 보여주기
                            change === 2 ? <DeleteMeet /> : null //0,1이 아니라 2면 ~~~~ 회의 삭제 tbody를 보여주기
                            )
                        )
                    }
                </Table>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }} >
                    <div id="ishave">
                        {
                            sessionStorage.getItem("id") === null ? <div><img src={noData} /></div> : <div></div>
                        }
                        {
                            !isHave ? <div></div> : <div><img src={noData} /></div>
                        }

                    </div>
                </div>
            </Box>
        </Box >


    )
}

export default SettingMeet;