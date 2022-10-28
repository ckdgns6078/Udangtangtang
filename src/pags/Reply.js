import { TextField } from "@mui/material";
import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import InputGroup from 'react-bootstrap/InputGroup';


const Reply = () => {


    const [replyWriter, setReplyWriter] = useState(); //이름
    const [replyText, setReplyTestt] = useState(); //메모 내용
    const [replyDare, setReplyDate] =useState(); //시간
    const [data, setData] = useState();

 
    



    const handleSubmit = async  () => {
        
       console.log("asdas")
        //axios로 서버에 보낸다
        try{
            await axios.post('http://192.168.2.65:5000/createReply',{
                // replyWriter: replyWriter,
                replyText: replyText,
                // replyDare: replyDare
        })
        }
        catch (e){
           
          console.error(e);
        }
        
      }
    





    return (
        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="메모내용 입력"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"

                />
                <Button variant="outline-secondary" id="button-addon2" type="submit" onClick={handleSubmit} >
                    입력
                </Button>


                {/* <Form.Control id="roomKey" type="text" placeholder="방이름 입력하세요" />
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    전송
                </Button> */}
            </InputGroup>

        </div>
    );
};

export default Reply;