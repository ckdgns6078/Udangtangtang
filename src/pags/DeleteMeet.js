
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import axios from 'axios';


const OutRoom = () => {
    const [data, setData] = useState();


    useEffect(() => {
        const location = window.location.href;
        const l = location.split('/')[4];


        //사용자가 호스트인 값만 보여줌
        //request id을 보내줌
        //sql문은 id값에 해당되는 readRoom을 하되 사용자가 호스트인값만
        (async () => {
            try {
                console.log(sessionStorage.getItem("id"));
                const res = await axios.post("http://192.168.2.82:5000/updateReadMeeting", {
                    roomNum:l
                });

                console.log(res.data)
                setData(res.data);
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])




    const deleteRoom = meetnum => {
        console.log(meetnum)
        //roomnum이랑 id값 post
        const location = window.location.href;
        const l = location.split('/')[4];

        const result = window.confirm("정말 삭제하시겠습니까?")
        if (result) {
            axios.post("http://192.168.2.82:5000/deleteMeeting", {
                meetNum: meetnum,
                roomNum:l
            }).then((response) => {
                console.log(response.data); //true 삭제 성공, false 삭제 실패
                if (response.data){
                    alert("삭제 성공하였습니다.")
                    window.location.reload();
                } else{
                    alert("삭제 실패하였습니다.")
                }
            }).catch((response) => {
                console.log('Error!');
            })
        } else{
            alert("취소되었습니다.")
        }
    }


    return (
        //tdoby안에 들어갈 값만 불러오기
        //data는 삭제할 때 쓸 데이터 테이블만 불러옴 
        //삭제는 버튼만
        <tbody>
            {
                data && data.map((e, idx) =>
                    <tr >
                        <th>{idx + 1}</th>
                        <th> {e.meetTitle}</th>
                        <th>{e.meetDate}</th>
                        <th><Button variant="outline-secondary" onClick={() => deleteRoom(e.meetNum)}>삭제</Button></th>
                    </tr>
                )
            }
        </tbody>

    )
}

export default OutRoom