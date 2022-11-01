import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'


const UpdateReply = ({ show, onHide }) => {
    const onChange1 = (event) => {
        setrroomKey(event.target.value)
    }
    const [roomKey, setrroomKey] = useState("");
    const [roompw, setroompw] = useState("");
    
    const [roonum, setRoomNum] = useState();
    const [meetnum, setMeetNum] = useState();


    //메모수정
    const UpdateReply = async () => {
        const location = window.location.href;
        var room = parseInt(location.split("/")[4]); //roomnum
        setRoomNum(room); //roomnum  set
        console.log(room);

        var meet = parseInt(location.split("/")[5]); //meetnum
        setMeetNum(meet); // meetnum  set
        console.log(meet);

        const replyText = document.getElementById("inputmemo").value;
        console.log(replyText);


        try {
            await axios.post('http://192.168.2.82:5000/updateReply', {
                replyText: replyText,
                roomNum: room,
                meetNum: meet,
                replyWriter: sessionStorage.getItem("nickname")


            })
            window.location.href = location;
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
                    메모 수정
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>수정 내용을 입력 하세요</Form.Label>
                        <Form.Control id="inputmemo" type="text" placeholder="수정 내용 입력" onChange={onChange1} />
                    </Form.Group>

                        


                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Form>
                    <Button onClick={UpdateReply} variant="primary" type="수정 하기">
                       수정

                    </Button>
                    <Button onClick={onHide}>닫기</Button>
                </Form>
            </Modal.Footer>

        </Modal>
    );
};

export default UpdateReply;