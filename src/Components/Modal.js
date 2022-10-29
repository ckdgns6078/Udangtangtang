import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';

import axios from "axios";
const Modal1 = ({ show, onHide }) => {
  const [roomKey, setRoomKey] = useState("");
  const [roompw, setRoomPw] = useState("");

  const [testKey, setTestKey] = useState(true);
  const [testPw, setTestPw] = useState(true);

  const checkInput = /^[가-힣a-zA-Z0-9]{2,15}$/; //유효성 검사

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



  const handleSubmit = () => {

    if (testKey && testPw) {
      try {
        console.log(sessionStorage.getItem("id"))
        axios.post("http://192.168.2.82:5000/joinRoom", {
          id: sessionStorage.getItem("id"),
          roomKey: roomKey,
          roomPw: roompw
        })
      } catch (error) {
        console.error(error)
      }

      //유효성검사 초기화
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
          방 입장하기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>키를 입력(key)</Form.Label>
            <Form.Control type="text" placeholder="방이름 입력하세요" onChange={RoomKeyCheck} />
            {/* 유효성검사 true false 확인 경고창 */}
            {
              testKey ? <div></div> : <div style={{ color: "red" }} > 한글, 영문, 숫자로 2~15자 이내로 작성해주세요 </div>
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="비밀번호를 입력 하세요" onChange={RoomPwCheck} />
            {/* 유효성검사 true false 확인 경고창 */}
            {
              testPw ? <div></div> : <div style={{ color: "red" }} > 한글, 영문, 숫자로 2~15자 이내로 작성해주세요 </div>
            }
          </Form.Group>



        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Form>
          <Button onClick={handleSubmit} variant="primary" type="submit">
            Submit
          </Button>
          <Button onClick={onHide}>Close</Button>
        </Form>
      </Modal.Footer>

    </Modal>

  )
}

export default Modal1