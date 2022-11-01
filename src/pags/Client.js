//회의중인방
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
import { ThreeDots } from 'react-loader-spinner';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




const Client = () => {
  const [room, setRoomNum] = useState();
  const [meet, setMeetNum] = useState();

  const [meetName, setMeetName] = useState();
  const [host, setHost] = useState();


  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [loading, setLoading] = useState(false);

  //카메라 음성녹음
  const [camState, setCamState] = useState(false);
  const [voiceState, setVoiceState] = useState(false);

  //음성 녹음 시작하면 나오는 ui
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [dataApi, setDataApi] = useState();


  //로드 창
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);


  const camtoggle = () => {
    setCamState(!camState);
  }
  const voicetoggle = () => {
    setVoiceState(!voiceState);
  }

  useEffect(() => {
    const location = window.location.href;
    var roomnum = parseInt(location.split("/")[4]); //roomnum
    setRoomNum(roomnum);
    console.log(roomnum);
    var meetnum = parseInt(location.split("/")[5]); //meetnum
    setMeetNum(meetnum);
    console.log(meetnum);

    (async () => {
      try {
        const res = await axios.post("http://192.168.2.82:5000/readMeetingRoomIn", {
          roomNum: roomnum,
          meetingRoomNum: meetnum

        });

        console.log(res.data);
        setMeetName(res.data[0].meetingroomTitle);
        setHost(res.data[0].meetingRoomHost);


      } catch (error) {
        console.log(error)
      }
    })();
  }, [])



  const onRecAudio = () => {
    setRunning(true);

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
          setRunning(false);
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
    setRunning(false);

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
    setTime(0);
    setLoading(true); //파일 변환 시작하면 로딩을 보여줌
    console.log(audioUrl);
    if (audioUrl) {
      const url = URL.createObjectURL(audioUrl);
      console.log(url); // 출력된 링크에서 녹음된 오디오 확인 가능 (blob:https://~~)


      let formdata = new FormData();
      formdata.append("fname", "audio.wav");
      formdata.append("data", URL.createObjectURL(audioUrl));


    }
    // 회의방 정보(data)
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //roomnum
    console.log(room);
    var meet = parseInt(location.split("/")[5]); //meetnum
    console.log(meet);

    // (날짜 변환)
    var today = new Date();

    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);

    var nowTime = hours + ':' + minutes + ':' + seconds;
    console.log("현재시간: ", nowTime);

    var nickName = sessionStorage.getItem("nickname");
    console.log("nickName : ", nickName);


    // 회의방 정보 세팅
    var data = {
      roomNum: room,
      meetNum: meet,
      contentsTime: nowTime,
      contentsWriter: nickName,
      contentsText: " "
    };

    const sound = new File([audioUrl], "recorder", { lastModified: new Date().getTime(), type: "audio/wav" });
    console.log("파일정보", sound);

    const formData = new FormData()

    // formData 형식으로 오디오파일, 필요한 data파일 세팅
    formData.append("file", sound)
    formData.append(
      "key",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    )


     // 서버에 POST형식으로 파일과 같이 보낼 데이터 전송
     axios.post('http://192.168.2.82:5000/yTest', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(function (check) { //서버에서 주는 리턴값???
        console.log(check.data); //data: '나 값이 들어온 것 같음', status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
        setLoading(false) //데이터를 변환 완료하면 로딩 없애기
        // 들어온 data값에서 '/'를 기준으로 자른다.

        var dataArr = check.data.split('/');
        var resultData = "";
        // 배열로 저장된 데이터에서 들어온 문단별로 "\n"을 삽입한다.
        dataArr.forEach(function (data) {
          resultData = resultData + data + "\n";
          console.log(resultData);
        });
        setDataApi(resultData);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false) // 오류났을 때 로딩 없애기
      });
  }, [audioUrl]);


  
  //회의 끝내기 버튼
  const endMeeting = () =>{
    {/* 회의끝낼 때 회의 종료된 데이터 베이스에 넣기, 소켓 종료, 목록으로 돌아가기 */}    
  }


  return (
    <Container maxWidth="sm" >
      <Grid container>
        <Box width="100%" display="flex" flexDirection="column" m="20px" sx={{ flexGrow: 1, }}>
          <Stack direction="horizontal" >
            <div className="bg-light border ms-auto">
              {/* 회의끝낼 때 회의 종료된 데이터 베이스에 넣기, 소켓 종료, 목록으로 돌아가기 */}
              <Button variant="outline-danger" onClick={endMeeting} style={{ right: 0, marginRight: 0, alignContent: 'flex-end' }}>회의끝내기</Button>
            </div>
          </Stack>

          <Navbar expand="lg" variant="light" bg="light">
            <Container>
              <Navbar.Brand ><h2>{meetName}</h2><h6>{host}</h6></Navbar.Brand>
            </Container>
            <div onClick={camtoggle} variant="light">
              {
                camState ?
                  <Fab size="small" color="inherit" aria-label="add">
                    <VideocamIcon />
                  </Fab> :
                  <Fab size="small" color="inherit" aria-label="add">
                    <VideocamOffIcon />
                  </Fab>
              }
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div onClick={voicetoggle} variant="light">
              {
                voiceState ?
                  <Fab size="small" color="inherit" aria-label="add">
                    <MicIcon />
                  </Fab> :
                  <Fab size="small" color="inherit" aria-label="add">
                    <MicOffIcon />
                  </Fab>
              }
            </div>


          </Navbar>

          <Grid container spacing={2} columns={16}>

            {/* 오른쪽 페이지 */}
            <Grid item xs={10} >
              <Item>
                <div>화면</div>
                <Grid item xs={16} >
                  <Item>





                  </Item>
                </Grid>
                &nbsp;&nbsp;

                <div>회의 </div>
                <Grid item xs={16} >
                  {/* 서버에 보내서 변환중인것을 보여줌 */}
                  <Item>
                    {
                      loading ? <div className='spinner'>
                        <ThreeDots justify="center" width="30" height="30" color="black" ariaLable="loading" />
                      </div> : <div></div>
                    }
                  </Item>
                </Grid>
              </Item>
            </Grid>


            {/* 왼쪽 페이지 */}
            <Grid item xs={6}>
              <Item>


                &nbsp;&nbsp;
                <Fab size="small" color="inherit" aria-label="add">
                  <PlayArrowIcon onClick={onRecAudio} />
                </Fab>
                &nbsp;&nbsp;
                <Fab size="small" color="inherit" aria-label="add">
                  <PauseIcon onClick={offRecAudio} />
                </Fab>
                &nbsp;&nbsp;
                <Fab size="small" color="inherit" aria-label="add">
                  <StopIcon onClick={onSubmitAudioFile} />
                </Fab>
                <Box>
                  {/* 몇 초인지 확인 하는 부분 */}
                  <div className="numbers">
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
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

export default Client;