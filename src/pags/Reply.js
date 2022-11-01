import { Box, TextField } from "@mui/material";
import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import InputGroup from 'react-bootstrap/InputGroup';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Reply = () => {


    const [replyWriter, setReplyWriter] = useState(); //이름
    // const [replyText, setReplyTestt] = useState(); //메모 내용
    // const [replyDate, setReplyDate] =useState(); //시간
    const [data, setData] = useState();
    const [roonum, setRoomNum] = useState();
    const [meetnum, setMeetNum] = useState();
    const [deleteReply, setdeleteReply] = useState();
    const [updateReply, setupdateReply] = useState();



    const handleSubmit = async () => {
        const location = window.location.href;
        var room = parseInt(location.split("/")[4]); //roomnum
        setRoomNum(room); //roomnum  set
        console.log(room);
        var meet = parseInt(location.split("/")[5]); //meetnum
        setMeetNum(meet); // meetnum  set
        console.log(meet);


        const date = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0]
        const time = new Date().toTimeString().split(" ")[0];

        const setDate = date + ' ' + time;


        // setReplyDate(setDate);
        console.log(setDate);

        console.log(sessionStorage.getItem("nickname"));


        // const replyText = document.getElementById("inputText");
        const replyText = document.getElementById("inputmemo").value;
        console.log(replyText);


        //axios로 서버에 보낸다
        try {
            await axios.post('http://192.168.2.82:5000/createReply', {
                replyWriter: sessionStorage.getItem("nickname"),
                replyText: replyText,
                roomNum: room,
                meetNum: meet,
                replyDate: setDate

            })
            //refesh
            window.location.href = location;
        }

        catch (e) {
            console.error(e);
        }

    }








    return (
        <div>

            <InputGroup className="mb-3" >
                <InputGroup.Text id="inputText" />
                <Form.Control
                    placeholder="메모내용 입력"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    id="inputmemo"

                />


                <Button variant="outline-secondary" id="button-addon2" type="submit" onClick={handleSubmit} >
                    입력
                </Button>
            </InputGroup>

        </div>

    );
};

export default Reply;