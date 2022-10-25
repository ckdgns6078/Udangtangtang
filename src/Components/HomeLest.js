

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



  const onroomName = (event) => {
    setRoomName(event.currentTarget.value)
  }

  const onroomPw = (event) => {
    setRoomPw(event.currentTarget.value)
  }

  const onroomKey = (event) => {
    setRoomKey(event.currentTarget.value)
  }



// //오류 메시지 상태 저장
// const [roomPwMsg, setRoomPwMsg] = useState('')
// const [roomNameMsg, setRoomNameMsg] = useState('')
// const [roomKeyMsg, setRoomKeyMsg] = useState('')


// // 유효성 검사
// const [isroomPwMsg, setIsRoomPw] = useState<boolean>(false)
// const [isroomName, setIsRoomName] = useState<boolean>(false)
// const [isroomKey, setIsRoomKey] = useState<boolean>(false)
// const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false)
// const router = useRouter()

// const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//   setName(e.target.value)
//   if (e.target.value.length < 2 || e.target.value.length > 5) {
//     setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.')
//     setIsName(false)
//   } else {
//     setNameMessage('올바른 이름 형식입니다 :)')
//     setIsName(true)
//   }
// }, [])








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
