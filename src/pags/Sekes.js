
import { Box } from "@mui/material";
import { React, useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import CreateMeetModal from '../Components/CreateMeetModal'
import noData from '../img/NoData.png';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Nav from 'react-bootstrap/Nav';
import { Container, Navbar } from 'react-bootstrap';
import Gear from '../img/gear.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';




const goClient = () => {
  const l = window.location.href;

  console.log(l);
  //window.location.href = 'http://localhost:3000/Client'
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const Sekes = () => {
  const [data, setData] = useState(); //회의 목록
  const [meetData, setMeetData] = useState();
  const [starthome, setModal] = useState(false);
  const [roomName, setRoomName] = useState(); 
  const [ishave, setIsHave] = useState(true);
  const [ishavemeet, setIsHaveMeet] = useState(true);

  const [check, setCheck] = useState(false);
  const [searchData, setSearchData] = useState();


  const ingmeetclick = idx => {
    console.log(idx);
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //그룹 번호
    //클라이언트 그 콘텐츠 
    window.location.href = '/Client/' + room + '/' + idx; //Client/그룹num/회의번호
  }

  const ingmeetclick2 = idx => {
    console.log(idx);
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //그룹 번호
    //클라이언트 그 콘텐츠 
    window.location.href = '/Client_2/' + room + '/' + idx; //Client/그룹num/회의번호
  }

  const settingMeet = () =>{
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //그룹 번호
    window.location.href="/SettingMeet/" + room;
  }

  useEffect(() => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]);

    (async () => {
      try {
        const res = await axios.post('http://192.168.2.82:5000/readMeeting', { //창훈이형 그룹 내 회의 목록
          roomNum: room
        });

        var checkmeetnum = res.data[0].meetNum;
        if (checkmeetnum != 0) {
          console.log("데이터가 있음");
          setData(res.data);
          console.log(res.data);
          setRoomName(res.data[0].roomName);
        }else{ //데이터가 없으면 
          setIsHave(false);
        }
        

      } catch (error) {
        console.log(error)
        setIsHave(false); 
      }
    })();



    (async () => {
      try {
        const ing = await axios.post('http://192.168.2.82:5000/readMeetingRoom', {//현재 진행중인 회의 리스트
          roomNum: room
        });
        console.log(ing.data);
        setMeetData(ing.data);
        setRoomName(ing.data[0].roomName);
      } catch (error) {
        console.log(error);
        setIsHaveMeet(false); //값을 못받으면 데이터가 없음을 보여줌
      }
    })();

  }, [])

  const back =() => {
    window.location.href="/"
  }
  const searchItem = () => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]);

    const searchinput = document.getElementById("search").value;
    console.log(searchinput);
    setCheck(true)
    if (sessionStorage.getItem("id") == null) {
      alert("로그인 해주세요");
      window.location.reload();
    }

    //database에서 값가져오기
    //axios로 아이디와 검색하려는 값을 보냄
    //서버에서는 검색하려는 값을 데이터베이스에 저장되어 있는
    //사용자가 들어가있는 회의방 테이블의 회의방 제목에 들어가있는 것만 데이터를 보내줌
    axios.post('http://192.168.2.82:5000/searchMeeting', {
      id: sessionStorage.getItem("id"),
      roomNum: room,
      meetTitle: searchinput
    })
      .then(function (response) {
        // response  
        console.log(response.data)
        setSearchData(response.data);

      }).catch(function (error) {
        // 오류발생시 실행
      }).then(function () {
        // 항상 실행
      });


  }


  return (
    <Box width="100%" display="flex" flexDirection="column" m="20px">
      <CreateMeetModal show={starthome} onHide={() => setModal(false)} />
      <Box display="flex" flexDirection="column" m="20px" >

        {/* <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">
          
            
              <tr >
                <th> 접속 방 이름 : {roomName}</th>
              </tr>
            
          
          </Navbar.Brand>
        </Container>
      </Navbar> */}

        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#">
              <tr >
                <th> 접속 방 이름 : {roomName}</th>
              </tr>

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >

              </Nav>

              <Button variant="outline-secondary" onClick={back} style={{ right: 0, marginRight: 0, alignContent: 'flex-end' }}>뒤로 가기</Button>


            </Navbar.Collapse>
          </Container>
        </Navbar>

        <br></br>
        <br></br>

        <Grid item xs={16} >
          <Item>
            <Table striped>
              <thead>
                <tr flexDirection="column">
                  <td>
                    회의중인 목록
                  </td>
                  <td bg="right"></td>

                  <td bg="right"> <Button variant="outline-secondary" onClick={() => setModal(true)}>회의 생성</Button></td>
                </tr>

                <tr>
                  <th>번호</th>
                  <th>회의명</th>
                  <th>호스트</th>

                </tr>
              </thead>

              <tbody>
                {
                  meetData && meetData.map((e, idx) =>
                    <tr id="test" className="blinking" onClick={() => ingmeetclick(e.meetingRoomNum)}>
                      <th> ing...</th>
                      <th>{e.meetingRoomTitle}</th> {/* 회의 이름 */}

                      <th>{e.meetingRoomHost}</th> {/* 회의 만든 사람 */}
                    </tr>
                  )

                }

                {
                  meetData == 0 ? <tr>
                    <th colSpan={3} style={{ backgroundColor: 'white' }}>
                      <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white'
                      }} ><div><img src={noData} /></div> </div>
                    </th>
                  </tr> : null
                }
              </tbody>
            </Table>
          </Item>
        </Grid>


        <br></br>
        <br></br>
        <br></br>

        <Grid item xs={16} >
          <Item>
            <Navbar>
              <Container>
                <Navbar.Brand>회의내용</Navbar.Brand>
                <Navbar.Toggle />

                <Navbar.Collapse className="justify-content-end">
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      id="search"
                    />
                  </Search>
                  <Button variant="outline-secondary" onClick={searchItem}>Search</Button>
                  <Navbar.Text>
                    {/* 회의를 만든 호스트면 보여주기 */}
                    <Button variant="text" onClick={settingMeet}>
                      <div class="gearbox">
                        {/* <Link to="/SettingMing/">
                        <MoreVertIcon class="gear" src={Gear}></MoreVertIcon>
                      </Link> */}
                        <MoreVertIcon class="gear" src={Gear}></MoreVertIcon>
                      </div>
                    </Button>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>





            <Table striped>
              <thead>
                <tr flexDirection="column">
                  <td>
                    회의 목록
                  </td>
                  <td bg="right"></td>
                  <td bg="right"></td>


                </tr>

                <tr>
                  <th>번호</th>
                  <th>회의명</th>
                  <th>날짜</th>
                  {/* <th>호스트</th> */}

                </tr>
              </thead>
              {
                !check ? <tbody>
                  {
                    data && data.map((e, idx) =>
                      <tr onClick={() => ingmeetclick2(e.meetNum)}>
                        {/* id="test" class="blinking" 위에 깜박 거리는 css*/}
                        <th> {idx + 1}</th>
                        <th >{e.meetTitle}</th> {/* 회의 이름 */}
                        <th>{e.meetDate}</th> {/* 회의 종료 날짜 */}
                        {/* <th>{e.meetingRoomHost}</th> 회의 만든 사람 */}
                      </tr>
                    )
                  }

                  {
                    data == null ? <tr>
                      <th colSpan={3} style={{ backgroundColor: 'white' }}>
                        <div style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'white'
                        }} ><div><img src={noData} /></div> </div>
                      </th>
                    </tr> : null

                  }
                </tbody> : <tbody>
                  {
                    searchData && searchData.map((e, idx) =>
                      <tr onClick={() => ingmeetclick2(e.meetNum)}>
                        {/* id="test" class="blinking" 위에 깜박 거리는 css*/}
                        <th> {idx + 1}</th>
                        <th >{e.meetTitle}</th> {/* 회의 이름 */}
                        <th>{e.meetDate}</th> {/* 회의 종료 날짜 */}
                        {/* <th>{e.meetingRoomHost}</th> 회의 만든 사람 */}
                      </tr>
                    )
                  }
                </tbody>
              }


            </Table>
          </Item>
        </Grid>


      </Box>
    </Box>
  )
}

export default Sekes







