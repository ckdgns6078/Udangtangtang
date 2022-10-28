

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



  const InputNameEx = /^[가-힣a-zA-Z0-9]{2,15}$/;
  const InputKeyEx = /^[가-힣a-zA-Z0-9]{2,15}$/;
  const InputPwEx = /^[가-힣a-zA-Z0-9]{2,15}$/;




  const RoomNameCheck = (roomName)=>{
    if(roomName.match(InputNameEx)==null){
      alert("제목 형식에 맞게 입력 해주세요")
      return;
    }else{
      alert("잘입력 함 ㅎㅎ")
    }
  }

  
  const RoomKeyCheck = (setRoomKey)=>{
    if(roomKey.match(InputKeyEx)==null){
      alert("제목 형식에 맞게 입력 해주세요")
      return;
    }else{
      alert("잘입력 함 ㅎㅎ")
    }
  }

  
  const RoomPwCheck = (roomPw)=>{
    if(roomPw.match(InputPwEx)==null){
      alert("제목 형식에 맞게 입력 해주세요")
      return;
    }else{
      alert("잘입력 함 ㅎㅎ")
    }
  }






  // //정규식
  // var InputName = /^[가-힣a-zA-Z]{2,15}$/;
  // var InputKey =/^[가-힣a-zA-Z]{2,15}$/;
  // var InputPw =/^[가-힣a-zA-Z]{2,15}$/;



 

  //적규식
  //제목
    // const handleInpRoomName = (e) => {
    //     // 8자~16자 영문, 숫자 조합
    //     var regExp = /^(?=.*\d)(?=.*[a-z0-9가-힣])[0-9a-zA-Z]{1,10}$/
    //     setRoomName(regExp.test(e.target.value));
    // };

    // //키
    // const   handInputKey = (e) => {
    //     var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{1,10}$/
    //     setRoomKey(regExp.test(encodeURIComponent.target.value));
    // };

    // //비번
    // const handleInputPw = (e) => {
    //     // 2자~10자 영문, 숫자 조합
    //     var regExp = /^(?=.*[a-z0-9가-힣])[a-zA-Z0-9가-힣]{1,10}$/
    //     setRoomPw(regExp.test(e.target.value));
    // };

    // //정규식 조건
    // const onFinish = (values) => {
    //   if (handleInpRoomName == false) {
    //     alert("제목 입력 해주세요")
    //     roomName.focus();
    //     return;
    //   }
    //   if (handInputKey == false) {
    //     alert("key 값 입력 해주세요")
    //     roomKey.focus();
    //     return;
    //   }
    //   if (handleInputPw != false) {
    //     alert("비밀번호를 입력해주세요.")
    //     roomPw.focus();
    //     return;
  
  
  
    //     handleSubmit(values)
    //   };
  
    // }
    
    // //미입력 이벤트
    // const onFinishFailed = (errorInfo) => {
    //   console.log('Failed:', errorInfo);
    // };

  







  const handleSubmit = async  () => {
    var rn = document.getElementById("roomName");
    console.log(rn.value);
    alert("제목 형식에 맞게 입력 해주세요")


    //axios로 서버에 보낸다
    try{
        await axios.post('http://192.168.2.82:5000/createRoom',{
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


    <Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>방제목 </Form.Label>
        <Form.Control id="roomName" type="text" placeholder="방제목 입력하세요" 
        onChange={(e)=>{setRoomPw(e.target.value); 
                              RoomNameCheck(e.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>방이름(key)</Form.Label>
        <Form.Control id="roomKey"  type="text" placeholder="방이름 입력하세요" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control id="roomPw" type="password" placeholder="비밀번호를 입력 하세요"  />
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
