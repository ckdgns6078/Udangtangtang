

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import axios from "axios";

const HomeLest = ({ show, onHide }) => {
  const [roomName, setRoomName] = useState("");
  const [roomPw, setRoomPw] = useState("");
  const [roomKey, setRoomKey] = useState("");

  const [testName, setTestName] = useState(true);
  const [testPw, setTestPw] = useState(true);
  const [testKey, setTestKey] = useState(true);

  const checkInput = /^[가-힣a-zA-Z0-9]{2,15}$/; //유효성 검사


  const RoomNameCheck = (e) => {
    // setRoomName(e.target.value); //이벤트가 발생되면 저장 -- 유효성 검사 후 저장으로 변환해야함
    const check = e.target.value;
    console.log(check);
    console.log("유효성 검사 : ", checkInput.test(e.target.value));
    if (checkInput.test(e.target.value)) { //true이면, 즉 유효성검사를 통과하면
      setRoomName(e.target.value);
      setTestName(true); //true이면 유효성 경고창 안보이게
    } else {
      setTestName(false);
    }
  }

  const RoomKeyCheck = (e) => {
    // setRoomName(e.target.value); //이벤트가 발생되면 저장 -- 유효성 검사 후 저장으로 변환해야함
    const check = e.target.value;
    console.log(check);
    console.log("유효성 검사 : ", checkInput.test(e.target.value));
    if (checkInput.test(e.target.value)) { //true이면, 즉 유효성검사를 통과하면
      setRoomKey(e.target.value);
      setTestKey(true); //true이면 유효성 경고창 안보이게
    } else {
      setTestKey(false);
    }
  }

  const RoomPwCheck = (e) => {
    // setRoomName(e.target.value); //이벤트가 발생되면 저장 -- 유효성 검사 후 저장으로 변환해야함
    const check = e.target.value;
    console.log(check);
    console.log("유효성 검사 : ", checkInput.test(e.target.value));
    if (checkInput.test(e.target.value)) { //true이면, 즉 유효성검사를 통과하면
      setRoomPw(e.target.value);
      setTestPw(true); //true이면 유효성 경고창 안보이게
    } else {
      setTestPw(false);
    }
  }



  const handleSubmit = async () => {
    var rn = document.getElementById("roomName");
    console.log(rn.value);
    if (testName && testKey && testPw){
      //axios로 서버에 보낸다
      try {
        await axios.post('http://192.168.2.82:5000/createRoom', {
          roomName: roomName,
          roomKey: roomKey,
          roomPw: roomPw,
          roomHost: sessionStorage.getItem("id")
        })
      }
      catch (e) {
        console.error(e);
      }
      //유효성검사 초기화
      setTestName(true);
      setTestKey(true);
      setTestPw(true);
    }
  }



  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          방 만들기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>


        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>방제목 </Form.Label>
            <Form.Control  id="roomName" type="text" placeholder="방제목 입력하세요" onChange={RoomNameCheck} />
            {/* <Form.Control id="roomName" type="text" placeholder="방제목 입력하세요" onChange={(e)=>{setRoomPw(e.target.value); }} /> */}
            {/* 유효성검사 true false 확인 경고창 */}
            {
              testName? <div></div> : <div style={{color:"red"}} > 한글, 영문, 숫자로 2~15자 이내로 작성해주세요 </div>
              
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>방이름(key)</Form.Label>
            <Form.Control type="text" placeholder="방이름 입력하세요" onChange={RoomKeyCheck} />
            {/* <Form.Control controlid="roomKey"  type="text" placeholder="방이름 입력하세요" /> */}
            {/* 유효성검사 true false 확인 경고창 */}
            {
              testKey ? <div></div> : <div style={{color:"red"}} > 한글, 영문, 숫자로 2~15자 이내로 작성해주세요 </div>
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="비밀번호를 입력 하세요" onChange={RoomPwCheck} />
            {/* <Form.Control controlid="roomPw" type="password" placeholder="비밀번호를 입력 하세요"  /> */}
            {/* 유효성검사 true false 확인 경고창 */}
            {
              testPw ? <div></div> : <div style={{color:"red"}} > 한글, 영문, 숫자로 2~15자 이내로 작성해주세요 </div>
            }
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} variant="primary" type="submit">
          Submit
        </Button>
        <Button onClick={onHide} >Close</Button>
      </Modal.Footer>

    </Modal>

  )
}

export default HomeLest