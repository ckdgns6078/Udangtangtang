//회의 한방
import { Container, Navbar } from 'react-bootstrap'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import React, { useEffect,useRef, useState, useCallback } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from '@mui/material/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';

import Reply from './Reply';
import ReadReply from './ReadReply';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const options = [ '수정', '삭제' ];

const Client_2 = () => {
  const [condata, setConData] = useState();
  const [redata, setReData] = useState();


  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [bloburl, setbloburl] = useState();
  const [file, setFile] = useState();

  const [state, setState] = useState(false);

 

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  };





  useEffect(() => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //roomnum
    console.log(room);
    var meet = parseInt(location.split("/")[5]); //meetnum
    console.log(meet);

    (async () => {
      try {
        const res = await axios.post("http://192.168.2.82:5000/readContents", {
          roomNum: room,
          meetNum: meet
        });
        const res2 = await axios.post("http://192.168.2.82:5000/readReply", {
          roomNum: room,
          meetNum: meet
        });
        //readContents
        console.log(res.data);
        console.log(res.data);
        setConData(res.data);
        //readReply
        console.log(res2.data);
        setReData(res2.data);
        console.log(res2.data);
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])





  return (
    <Container maxWidth="sm" >
      <Grid container>
        <Box width="100%" display="flex" flexDirection="column" m="20px" sx={{ flexGrow: 1, }}>
          <Navbar expand="lg" variant="light" bg="light">
            <Container>
              <Navbar.Brand href="#">회의방</Navbar.Brand>
            </Container>

       
          </Navbar>
          <br/>

          <Grid container spacing={2} columns={16}>

            {/* 오른쪽 페이지 */}
            <Grid item xs={10} >
              <Item>
                
              
              <hr></hr>
                <div>
                <Navbar bg="light" expand="lg">
                  <Container>
                    <Navbar.Brand >회의 내용</Navbar.Brand>
           
                 
                    <Navbar.Collapse className="justify-content-end">
                    <NavDropdown title="" id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">수정</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">삭제</NavDropdown.Item>
                        </NavDropdown>
                  </Navbar.Collapse>
                  </Container>
                </Navbar>

                </div>
                <hr></hr>
                <Grid item xs={16} >
                  {
                    condata && condata.map((e, idx) =>
                      <div>
                        <Item>
                          <h6>{e.contentsTime}</h6>
                          <Stack direction="row" spacing={1}>
                            <Chip label={e.contentsWriter}  />
                          </Stack>
                          <h6>{e.contentsText}</h6>

                        </Item>
                        <br></br>
                      </div>
                    )
                  }
                </Grid>
              </Item>
            </Grid>


            {/* 왼쪽 페이지 */}
            <Grid item xs={6}>
              <Item>

             
                <Box>
                  {/* 네브바 */}
                <hr></hr>
                <div>
                <Navbar bg="light" expand="lg">
                  <Container>
                    <Navbar.Brand >메모</Navbar.Brand>
           
                 
                    <Navbar.Collapse className="justify-content-end">
                    <NavDropdown title="" id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">수정</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">삭제</NavDropdown.Item>
                        </NavDropdown>
                  </Navbar.Collapse>
                  </Container>
                </Navbar>

                </div>
                <hr></hr>

                {/* 메모장 기능 */}

                  <Box>


                  <ReadReply/>

                  <Reply/>

         
              
                  {/* <Form.Control type="text" placeholder="매모 내용" ></Form.Control> */}
           
                  </Box>
                  <br></br>
                  <br></br>

                  <div>
              
                  </div>
                  
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  )
}

export default Client_2;