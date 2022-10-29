

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import axios from "axios";

const CreateMeetModal = ({ show, onHide }) => {
  const [meetingRoomTitle, setMeetRoomTitle] = useState("");

  const [testMeetRoom, setTestMeetRoom] = useState(true);

  const checkInput = /^[가-힣a-zA-Z0-9]{2,15}$/; //유효성 검사

  const MeetingRoom = (e) => {
    // setRoomName(e.target.value); //이벤트가 발생되면 저장 -- 유효성 검사 후 저장으로 변환해야함
    const check = e.target.value;
    console.log(check);
    console.log("유효성 검사 : ", checkInput.test(e.target.value));
    if (checkInput.test(e.target.value)) { //true이면, 즉 유효성검사를 통과하면
      setMeetRoomTitle(e.target.value);
      setTestMeetRoom(true); //true이면 유효성 경고창 안보이게
    } else {
      setTestMeetRoom(false);
    }
  }


  const handleSubmit = async () => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]);
    if (testMeetRoom) { //true 이면
      // axios로 서버에 보낸다
      try {
        const res = await axios.post('http://192.168.2.82:5000/createMeetingRoom', {
          roomNum: room,
          meetingRoomTitle: meetingRoomTitle,
          meetingRoomHost: sessionStorage.getItem("id")
        })
        console.log(res.data.meetingRoomNum);
        window.location.href = "http://localhost:3000/Client/" + room + "/" + res.data[0].meetingRoomNum;
      }
      catch (e) {
        console.error(e);
      }
      setTestMeetRoom(true);
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
          회의 만들기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>


        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>회의 제목 </Form.Label>
            <Form.Control type="text" placeholder="방제목 입력하세요" onChange={MeetingRoom} />
            {
              testMeetRoom ? <div></div> : <div style={{ color: "red" }} > 한글, 영문, 숫자로 2~15자 이내로 작성해주세요 </div>
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

export default CreateMeetModal
