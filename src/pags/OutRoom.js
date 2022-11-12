
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import noData from '../img/NoData.png';

const OutRoom = () => {
    const [data, setData] = useState();


    useEffect(() => {
        //호스트가 아닌 값만 보여줌
        //request id을 보내줌
        //sql문은 id값에 해당되는 readRoom을 하되 roomHost가 id가 아닌값을 보내줌
        (async () => {
            try {
                console.log(sessionStorage.getItem("id"));
                const res = await axios.post("http://192.168.2.82:5000/outReadRoom", {
                    id: sessionStorage.getItem("id")
                });

                console.log(res.data)
                setData(res.data);
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])




    const OutRoom = roomnum => {
        console.log(roomnum);
        const result = window.confirm("정말 탈퇴하시겠습니까?");
        if (result){
            //roomnum이랑 id값 post
            axios.post("http://192.168.2.82:5000/outRoom", {
                roomNum: roomnum,
                id: sessionStorage.getItem("id")
            }).then((response) => {
                console.log(response.data); //true 탈퇴 성공, false 탈퇴 실패
                if (response.data){
                    alert("탈퇴에 성공하였습니다.")
                }else{
                    alert("탈퇴에 실패하였습니다.")
                }
            }).catch((response) => {
                console.log('Error!');
            })

        }else{
            alert("취소되었습니다.")
        }
        
    }


    return (
        //tdoby안에 들어갈 값만 불러오기
        //data는 탈퇴할 때 쓸 데이터 테이블만 불러옴 
        //탈퇴는 버튼만
        <tbody>
            {
                data == null?<tr>
                <th colSpan={4} style={{ backgroundColor: 'white' }}>
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                  }} ><div><img src={noData} /></div> </div>
                </th>
              </tr> : data.map((e, idx) =>
                    <tr >
                        <th>{idx + 1}</th>
                        <th> {e.roomName}</th>
                        <th>{e.roomHost}</th>
                        <th>{e.roomMember}</th>
                        <th><Button variant="outline-secondary" onClick={() => OutRoom(e.roomNum)}>탈퇴</Button></th>
                    </tr>
                )
            }
        </tbody>

    )
}

export default OutRoom