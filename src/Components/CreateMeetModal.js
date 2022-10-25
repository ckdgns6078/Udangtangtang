

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import axios from "axios";

const CreateMeetModal = ({ show, onHide }) => {
  const [meetingRoomTitle, setmeetRoomTitle] = useState("");
 
  

  const handleSubmit = async () => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]);
    // axios로 서버에 보낸다
    try {
      const res = await axios.post('http://192.168.2.65:5000/createMeetingRoom', {
        roomNum : room,
        meetingRoomTitle: meetingRoomTitle,
        meetingRoomHost: sessionStorage.getItem("id")
      })
      console.log(res.data.meetingRoomNum);
      window.location.href="http://localhost:3000/Client/"+room+"/"+res.data[0].meetingRoomNum;
    }
    catch (e) {
      console.error(e);
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
            <Form.Control type="text" placeholder="방제목 입력하세요" onChange={(e) => setmeetRoomTitle(e.target.value)} />
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
