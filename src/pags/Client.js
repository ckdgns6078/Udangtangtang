import { Container, Navbar } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import PauseIcon from '@mui/icons-material/Pause';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState, useCallback,useRef} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { buttonBaseClasses, getListItemSecondaryActionClassesUtilityClass, Link } from '@mui/material';
import Button from 'react-bootstrap/Button';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { RestaurantMenu } from '@mui/icons-material';
import io from "socket.io-client";


// const io = require('socket.io-client');

const socket = io("http://192.168.2.82:3000",{cors: { origin: '*' }});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




const Client = () => {
  const [meetName, setMeetName] = useState();
  const [host, setHost] = useState();
  const [stream, setStream] = useState();
  const [room, setRoomNum] = useState();              //roomNum socket 으로 넘겨야되는 변수
  const [meet, setMeetNum] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [bloburl, setbloburl] = useState();
  const [file, setFile] = useState();
  let test1;
  const [camState, setCamState] = useState(false);
  const [voiceState, setVoiceState] = useState(false);
  const camtoggle = () => {
    setCamState(!camState);
  }
  const voicetoggle = () =>{
    setVoiceState(!voiceState);
  }


  let myFace;
  useEffect(() => {
    const location = window.location.href;
    var roomnum = parseInt(location.split("/")[4]); //roomnum
    setRoomNum(roomnum);
    //console.log("roomnum :" ,roomnum);
    var meetnum = parseInt(location.split("/")[5]); //meetnum
    setMeetNum(meetnum);
   // console.log("meetnum :",meetnum);

    (async () => {
      try {
        const res = await axios.post("http://192.168.2.82:5000/readMeetingRoomIn", {
          roomNum : roomnum,  
          meetingRoomNum: meetnum
        });
       // console.log(res.data);
        setMeetName(res.data[0].meetingroomTitle);
        setHost(res.data[0].meetingRoomHost);


      } catch (error) {
        console.log(error)
      }
    })();
    myFace = document.getElementById("myFace");
    handleWelcomeSubmit();
    
    
  }, [])
  
  

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
  
  // 소켓 필드 ----------------------------------
  let hello;
  // const muteBtn = document.getElementById("mute");
  // const cameraBtn = document.getElementById("camera");
  const camerasSelect = document.getElementById("cameras"); // 카메라 드롭바 사용하는 변수
  
  // 방만들기 변수
  // const welcome = document.getElementById("welcome");
  // const call = document.getElementById("call");

  let myStream;     // 정보 저장해서 보여주는 변수
  let roomNumber;  //입장한 방의 번호
  
  //보유 카메라 가져오는 함수 드롭다운으로 카메라 보여주는 함수
// async function getCameras(){
//   try{
//       const devices = await navigator.mediaDevices.enumerateDevices();        // user의 미디어 장치 가져오는 함수
//       console.log("devices : " , devices);
//       const cameras = devices.filter(device => device.kind ==="videoinput"); // kind 가 videoinput인 것만 가져옴 ( 카메라 찾기)
//       const currentCamera = myStream.getVideoTracks()[0];
//       cameras.forEach(camera => {                                            // 인식된 카메라들을 가져와서 드롭바로 보여주는 함수
//           const option = document.createElement("option");
//           option.value = camera.deviceId;
//           option.innerText = camera.label;
//           if(currentCamera.label == camera.label){
//               option.selected = true;
//           }
//           camerasSelect.appendChild(option);
//       })
//       //console.log(devices);
//   }catch(e){
//       console.log(e);
//   }
// }

//카메라 , 마이크 켜는 기능
async function getMedia(deviceId){
  const initialConstrains = {     // camera가 없을때 사용되는 변수
      audio : true,
      video : { facingMode : "user"},
  };
  const cameraConstraints = {     // camera devided가 있을 때 사용 되는 변수
      audio : true,
      video : { devicedId : {exact : deviceId} },
  }
  try{
    myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstrains
    );
    console.log("myStream : " , myStream);
    myFace.srcObject = myStream;
    console.log("srcObject : " ,myFace.srcObject);
   
  } catch(e){
      
      console.log(e);
  }
}


//함수 실행되는 함수
async function initCall(){
  await getMedia();
  makeConnection();


}

let myPeerConnection;



// useEffect(() => {
//   handleWelcomeSubmit();
//   console.log("useEffect 실행");
// },[]);


let b;
//방입장하면 실행되는 함수
async function handleWelcomeSubmit(){
  await initCall();
  const location = window.location.href;
  var a = parseInt(location.split("/")[4]);
  b = a;
  socket.emit("join_room", b); //input.value값에 다른걸 입력하면 그 값으로 가능
  console.log("message from Client :" , b);
}

//Peer A 가 offer 생성하고 서버에 offer 값 보내기
socket.on("welcome", async () => {
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log("send the offer");
  console.log("offer:",offer);
  socket.emit("offer", offer , b);
});

//Peer B가 A가 서버에 올린 offer를 받고 받은 offer를 가지고 answer로 변환
socket.on("offer",async(offer) =>{
  console.log("received the offer");
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer",answer , b);
  console.log("send the answer");
  console.log("answer:",answer);
});

socket.on("answer",answer=>{
  console.log("received the answer");
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", ice =>{
  console.log("received candidate");
  myPeerConnection.addIceCandidate(ice);

});

// socket.on("outClient", (outClientId) =>{
//   console.log("outClientId : " , outClientId )
//   console.log(outClientId);

// });

socket.on("outClient", () => {
  console.log("ㅇㄻ어리먼이런마러나ㅣ더");
  hello.hidden = true;
  // console.log(outClientId);
  // console.log(reason);
  // // 소켓 연결 해제 이벤트 발생 시,
  // if (reason === "transport close") {
  //   console.log(socket);
  //   console.log(socket.id);
  // }else{
  //   // 직접적인 연결 해제의 경우가 아닐 시, 다시 연결
  //   socket.connect();
  // }
});

function makeConnection(){
   
  myPeerConnection = new RTCPeerConnection({
      iceServers :[
          {
              urls: [
                  "stun:stun.l.google.com:19302",
                  "stun:stun1.l.google.com:19302",
                  "stun:stun2.l.google.com:19302",
                  "stun:stun3.l.google.com:19302",
                  "stun:stun4.l.google.com:19302",
              ],
          },
      ],
  });
  myPeerConnection.addEventListener("icecandidate",handleIce); //중계 프로토콜을 받기 위한 선언
  myPeerConnection.addEventListener("addstream",handleAddStream);
  myStream
  .getTracks()
  .forEach(track => myPeerConnection.addTrack(track , myStream));
}
//icecandidate가 함수 호출되면 socket에 ice를 보냄
function handleIce(data){
  console.log("send candidate");
  socket.emit("ice", data.candidate,b);

}




//stream이 add될 때마다 이벤트 데이터 확인하는 함수
function handleAddStream(data){
  const videotag = document.getElementById("testvideo"); // welcome div를 가져온다
  videotag.innerHTML = '<video id="hello" autoplay="autoplay" playsinline="playsinline" width="400" height="400"></video>'
  hello = document.getElementById("hello");
  hello.srcObject = data.stream;


  //-----------------------------------------
  // peerFace = document.getElementById("peerFace");
  // peerFace.srcObject = data.stream;
  // // const peerFace = document.getElementById("peerFace");
  // peerFace.hidden = true;
}











  

  return (



    <Container maxWidth="sm" >
      <Grid container>
        <Box width="100%" display="flex" flexDirection="column" m="20px" sx={{ flexGrow: 1, }}>
          <Navbar expand="lg" variant="light" bg="light">
            <Container>
              <Navbar.Brand ><h2>{meetName}</h2><h6>{host}</h6></Navbar.Brand>
            </Container>
            <div onClick={camtoggle} variant="light">
              {
                camState ?

                // 카메라 비디오 버튼
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
                <div id = "welcome">
                {/* 본인이 사용하는 카메라 나오는 화면 */}
                <video id="myFace" autoplay="autoplay" playsinline="playsinline" width="400" height="400"></video>
                {/* 다른사람 접속했을때 나오는 카메라  */}
                <video id="peerFace" autoplay="autoplay" playsinline="playsinline" width="400" height="400" ></video>
                
                <div id = "testvideo">


                </div>
             
                <select id ="cameras"></select>
                  
                </div>
               {/* <input type = "button" onclick = {handleWelcomeSubmit()}  />  */}
               
                {/* 본인이 사용하는 카메라 드롭바 */}
               
                
                <Grid item xs={16} >
                  <Item>
                  </Item>
                </Grid>
                &nbsp;&nbsp;

                <div>회의 </div>
                <Grid item xs={16} >
                  
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