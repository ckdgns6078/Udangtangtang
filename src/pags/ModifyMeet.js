
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TextField } from '@mui/material';
import { AltRouteTwoTone, ConstructionOutlined } from '@mui/icons-material';


const OutRoom = () => {
    const [data, setData] = useState();




    useEffect(() => {
        const location = window.location.href;
        const l = location.split('/')[4];

        //사용자가 호스트인 값만 보여줌
        //meetNum
        (async () => {
            try {
                console.log(sessionStorage.getItem("id"));
                const res = await axios.post("http://192.168.2.82:5000/updateReadMeeting", {
                    roomNum: l
                });

                console.log(res.data)
                setData(res.data);
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])




    const modifyRoomName = (meetnum) => {
        const location = window.location.href;
        const l = location.split('/')[4];

        console.log(meetnum); //meetnum

        const modifyTitle = document.getElementById(meetnum).value;
        console.log(modifyTitle); //수정할 회의명 

        const defTitle = document.getElementById(meetnum).defaultValue;
        console.log(defTitle);//수정하기 전 원래 회의명

        if (modifyTitle != defTitle) { //수정할 값과 전 값이 다르면
            const result = window.confirm("정말 수정하시겠습니까?");
            if (result) {
                axios.post("http://192.168.2.82:5000/updateMeeting", {
                    meetNum: meetnum,
                    roomNum: l,
                    meetTitle: modifyTitle //수정한 방 이름
                }).then((response) => {
                    console.log(response.data); //true 삭제 성공, false 삭제 실패
                    if (response.data) { //성공하면
                        alert("회의 명 수정을 성공하였습니다.")
                    } else { //실패하면
                        alert("회의 명 수정에 실패하였습니다.")
                    }
                }).catch((response) => {
                    console.log('Error!');
                })
            } else {
                alert("취소되었습니다.")
            }
        }else{
            alert("원래 회의 이름과 동일합니다. 다시 입력해주세요");
        }
    }

    return (

        //tdoby안에 들어갈 값만 불러오기
        //data는 수정할 때 쓸 데이터 테이블만 불러옴 
        //수정는 textField, 버튼
        <tbody>
            {
                data && data.map((e, idx) =>
                    <tr >
                        <th>{idx + 1}</th>
                        <th>
                            <form>
                                <TextField fullWidth label="메모 내용" id={e.meetNum} defaultValue={e.meetTitle}></TextField>
                            </form>
                        </th>
                        <th>{e.meetDate}</th>
                        <th><Button type="submit" variant="outline-secondary" onClick={() => { modifyRoomName(e.meetNum) }}>수정</Button></th>
                    </tr>
                )
            }
        </tbody>

    )
}

export default OutRoom