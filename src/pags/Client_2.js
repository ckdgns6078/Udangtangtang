//회의 한방
import { Container, Navbar } from 'react-bootstrap'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import PauseIcon from '@mui/icons-material/Pause';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { Link } from '@mui/material';
import Button from 'react-bootstrap/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



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

  const toggle = () => {
    setState(!state);
  }
  const toggle2 = () => {
    setState(!state);
  }


  useEffect(() => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //roomnum
    console.log(room);
    var meet = parseInt(location.split("/")[5]); //meetnum
    console.log(meet);

    (async () => {
      try {
        const res = await axios.post("http://192.168.2.65:5000/readContents", {
          roomNum: room,
          meetNum: meet
        });
        const res2 = await axios.post("http://192.168.2.65:5000/readReply", {
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


  //텍스트 필드
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const onRecAudio = () => {
    console.log("녹음 시작")
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    //const analyser = audioCtx.AudioWorkletNode(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      console.log("마이크 사용 가능");
      const options = {
        audioBitsPerSecond: 128000,
        mimeType: 'audio/webm;codecs=opus'
      };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 1분(60초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 59) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {

            setAudioUrl(e.data);
            setOnRec(true);
          };
          console.log("dddddd");
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    console.log("녹음 중지")
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      console.log(e);
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });


    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();



  };


  const onSubmitAudioFile = useCallback(() => {
    console.log(audioUrl);
    if (audioUrl) {
      const url = URL.createObjectURL(audioUrl);
      setbloburl(url);
      console.log(url); // 출력된 링크에서 녹음된 오디오 확인 가능 (blob:https://~~)


      let formdata = new FormData();
      formdata.append("fname", "audio.wav");
      formdata.append("data", URL.createObjectURL(audioUrl));


    }

    const sound = new File([audioUrl], "recorder", { lastModified: new Date().getTime(), type: "audio/wav" });
    console.log("파일정보", sound);
    setFile(sound);



    let formData = new FormData();
    formData.append("file", sound);

    axios.post('http://192.168.2.82:5000/yTest', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(function (check) { //서버에서 주는 리턴값???
        console.log(check); //data: '나 값이 들어온 것 같음', status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
      })
      .catch(function (error) {
        console.log(error);
      });



  }, [audioUrl]);




  return (
    <Container maxWidth="sm" >
      <Grid container>
        <Box width="100%" display="flex" flexDirection="column" m="20px" sx={{ flexGrow: 1, }}>
          <Navbar expand="lg" variant="light" bg="light">
            <Container>
              <Navbar.Brand href="#">회의방</Navbar.Brand>
            </Container>

            <ButtonGroup>
              
              <Button variant="contained" color="success">
                  Modify
              </Button>
              <Button variant="contained" color="success">
              Delete
              </Button>
            
                        
            </ButtonGroup>
                  


          </Navbar>

          <Grid container spacing={2} columns={16}>

            {/* 오른쪽 페이지 */}
            <Grid item xs={10} >
              <Item>
                
              
              <hr></hr>
                <div>회의 내용</div>
                <hr></hr>
                <Grid item xs={16} >
                  {
                    condata && condata.map((e, idx) =>
                      <div>
                        <Item>
                          <h6>{e.contentsTime}</h6>
                          <Stack direction="row" spacing={1}>
                            <Chip label={e.contentsWriter} color="primary" />
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
                  <hr></hr>
                  <h4>메모</h4>
                  <hr></hr>


                  <div>
                  {
                    redata && redata.map((e, idx) =>
                      <div>
                        <Item>
                          <h6>{e.replyDate}</h6>
                          <Stack direction="row" spacing={1}>
                            <Chip label={e.replyWriter} color="primary" />
                          </Stack>
                          <h6>{e.replyText}</h6>
                        </Item>
                        <br></br>
                      </div>
                    )
                  }
                  </div>

                  <Box>
                 
                  <Form.Control type="text" placeholder="매모 내용" />
                  <Form.Control type="text" placeholder="매모 내용" />
                  <Form.Control type="text" placeholder="매모 내용" />

                  <Form.Control type="text" placeholder="매모 내용" />
                  <Form.Control type="text" placeholder="매모 내용" />
                    {/* <TextField
                        id="outlined-textarea"
                        label="HOSTNAME"
                        placeholder="매모내용"
                        multiline
                      /> */}
                  </Box>
                  <br></br>
                  <br></br>

                  <div>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="메모내용 입력"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                      입력
                    </Button>
                  </InputGroup>
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