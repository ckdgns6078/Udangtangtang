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
import OutRoom from '../pags/OutRoom';
import ModifyRoom from '../pags/ModifyRoom';
import DeleteRoom from '../pags/DeleteRoom';


const Setting = () => {
    const [data, setData] = useState();
    const [isHave, setIsHave] = useState(true);

    //테이블 변환
    //아무것도 안눌렀을 때(0)는 그냥 readRoom 데이터 보여주기
    //1-> 탈퇴
    //2-> 수정
    //3-> 삭제
    const [changeT, setChangeT] = useState(0);


    useEffect(() => {
        //제일 처음에는 모든 데이터를 불러옴 data
        (async () => {
            try {
                console.log(sessionStorage.getItem("id"));
                const res = await axios.post("http://192.168.2.82:5000/readRoom",

                    {
                        id: sessionStorage.getItem("id")
                    });

                console.log(res.data)
                setData(res.data);
            } catch (error) {
                console.log(error)
            }
        })();

    }, [])


    const table = (num) => {
        // const t = document.getElementById("table");//tbody내용을 가져옴
        // t.innerHTML = null;
        //1->탈퇴, 2->수정 3->삭제

        const e = document.getElementById("exp");

        if (num === 1) {
            setChangeT(1);
            e.innerHTML = "<h5>방 탈퇴 : 방의 '탈퇴' 버튼을 클릭하면 탈퇴됩니다. </h5>"
        }

        else if (num == 2) {
            setChangeT(2);
            e.innerHTML = "<h5>방 수정 : 방 명을 입력하고 '수정' 버튼을 클릭하면 수정됩니다 </h5>"
        }
        else if (num == 3) {
            setChangeT(3);
            e.innerHTML = "<h5>방 삭제 : 방의 '삭제' 버튼을 클릭하면 삭제됩니다. </h5>"
        }
    }



    return (
        //responsive 테이블은 반응 형으로 만들어 줌

        <Box width="100%" display="flex" flexDirection="column" m="20px">
            <Box width="100%" display="flex" flexDirection="column" >

                <Navbar>
                    <Container>
                        <Navbar.Brand href="#home"><h3>Setting</h3> - Total</Navbar.Brand>

                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <ToggleButtonGroup type="radio" name="options">
                                    {/* <ToggleButton id="tbg-radio-1" variant="outline-secondary" value={1} onClick={(e) => <OutRoom/>}> */}

                                    <ToggleButton id="tbg-radio-1" variant="outline-secondary" value={1} onClick={(e) => table(1)}>
                                        방 탈퇴
                                    </ToggleButton>

                                    &nbsp;&nbsp;

                                    <ToggleButton id="tbg-radio-2" variant="outline-secondary" value={2} onClick={(e) => table(2)}>
                                        방 수정
                                    </ToggleButton>
                                    &nbsp;&nbsp;
                                    <ToggleButton id="tbg-radio-3" variant="outline-secondary" value={3} onClick={(e) => table(3)}>
                                        방 삭제
                                    </ToggleButton>
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
                        {
                            changeT===0 ? <tr>
                                <th>번호</th>
                                <th>방이름</th>
                                <th>관리자명</th>
                                <th>인원</th>
                                <th>상세기능</th>
                            </tr> : (changeT===1 ? <tr>
                                <th>번호</th>
                                <th>방이름</th>
                                <th>관리자명</th>
                                <th>인원</th>
                                <th>상세기능</th>
                            </tr> : <tr>
                                <th>번호</th>
                                <th>방이름</th>
                                <th>키값(key)</th>
                                <th>인원</th>
                                <th>상세기능</th>
                            </tr>
                            )
                        }
                        
                    </thead>

                    {
                        changeT === 0 ? ( //changeT===0이면 그냥 모든 목록 보여주기
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
                                    <th> {e.roomName}</th>
                                    <th>{e.roomHost}</th>
                                    <th>{e.roomMember}</th>
                                    <th></th>
                                </tr>
                            )}</tbody>
                        ) : (changeT === 1 ? <OutRoom /> : ( //0이 아니라 1이면 outRoom 탈퇴 tbody를 보여주기
                            changeT === 2 ? <ModifyRoom /> : ( //0,1이 아니라 2면 modifyRoom 수정 tbody를 보여주기
                                changeT === 3 ? <DeleteRoom /> : null //3이면 deleteRoom 삭제 tbody를 보여주기 아니면 아무것도 아닌거
                            )
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

export default Setting