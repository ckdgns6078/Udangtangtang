

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import axios from "axios";

const HomeLest = ({show , onHide}) => {
  const [roomPw,setRoomPw] = useState("");
  const [roomName,setRoomName] = useState("");
  const [roomKey,setRoomKey] = useState("");
  const id = sessionStorage.getItem("id");
  const handleSubmit = async  () => {
    //axios로 서버에 보낸다
    try{
        await axios.post('http://192.168.2.65:5000/createRoom',{
        roomName: roomName, 
        roomKey:roomKey,
        roomPw: roomPw,
        roomHost: id
    })
    }
    catch (e){
      console.error(e);
    }
    
  }


  return (
    <Modal
    show = {show}
    onHide = {onHide}
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


    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>방제목 </Form.Label>
        <Form.Control type="text" placeholder="방제목 입력하세요" onChange = {(e)=>setRoomKey(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>방이름(key)</Form.Label>
        <Form.Control  type="text" placeholder="방이름 입력하세요" onChange = {(e)=>setRoomName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="비밀번호를 입력 하세요"  onChange = {(e)=>setRoomPw(e.target.value)}/>
      </Form.Group>
{/*       
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>호스트</Form.Label>
        <Form.Control type="password" placeholder="호스트를 입력 하세요"  onChange = {(e)=>setRoomHost(e.target.value)}/>
      </Form.Group>
       */}
      
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
