
import axios from 'axios';
import { React, useState, useEffect } from "react";

const ReadReply = () => {
  const [roonum, setRoomNum] = useState();
  const [meetnum, setMeetNum] = useState();

  const [replyWriter, setReplyWriter] = useState(); //이름
  const [replyText, setReplyTestt] = useState(); //메모 내용
  const [replyDate, setReplyDate] = useState(); //시간
  const [replyNum, setReplyNum] = useState(); //메모 넘버
  const [data, setData] = useState();

  useEffect(() => {
    const location = window.location.href;
    var room = parseInt(location.split("/")[4]); //roomnum
    setRoomNum(room); //roomnum  set
    console.log(room);
    var meet = parseInt(location.split("/")[5]); //meetnum
    setMeetNum(meet); // meetnum  set
    console.log(meet);

    (async () => {
      try {
        const res = await axios.post("http://192.168.2.82:5000/readReply",
          {
            roomNum: room,
            meetNum: meet
          });
        console.log("asd")
        console.log(res.data)
        setData(res.data);
        // setReplyNum(res.data);
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])


  return (
    <div>
      <tr>
        <td>이름</td>
        <td>시간</td>
        <td>내용</td>

      </tr>
      <tr>

        {
          data && data.map((e, idx) =>
            <tr >
              <th> {e.replyWriter}</th>
              <th>{e.replyDate}</th>
              <th>{e.replyText}</th>
            </tr>
          )
        }


      </tr>





    </div>
  );
};

export default ReadReply;