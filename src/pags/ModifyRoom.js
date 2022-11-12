
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { TextField } from '@mui/material';
import { ConstructionOutlined } from '@mui/icons-material';
import noData from '../img/NoData.png';

const OutRoom = () => {
    //목록 데이터 값 = [ roomNum , roomName , roomKey , roomPw] 
    const [data, setData] = useState();
    const [roomNumber, setRoomNum] = useState();  
    
    

    useEffect(() => {
        //사용자가 호스트인 값만 보여줌
        //request id을 보내줌
        //sql문은 id값에 해당되는 readRoom을 하되 사용자가 호스트인값만

        (async () => {
            try {
                console.log(sessionStorage.getItem("id"));
                const res = await axios.post("http://192.168.2.82:5000/updateReadRoom", {
                    roomHost: sessionStorage.getItem("id")
                })

                console.log(res.data)
                setData(res.data);
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])




    const modifyRoomName = (roomnum,roomkey) => {
        console.log(roomnum); //그룹 번호
        setRoomNum(roomnum);
        console.log(roomkey); //그룹 키


        const modifyName = document.getElementById(roomnum).value; //바꿀 제몰
        console.log(modifyName);

        const defName = document.getElementById(roomnum).defaultValue; //원래 제목
        console.log(defName);


        if (modifyName != defName) { //입력한 값이 즉 제목이 다른 값이면 
            const prom = prompt("비밀번호를 입력해주세요", "");
            console.log(prom); //입력한 비밀번호
            //서버에 modifyName, pw, roomnum
            axios.post("http://192.168.2.82:5000/updateRoom", {
                roomNum: roomnum, 
                roomKey : roomkey,
                roomPw : prom, //사용자가 입력한 비밀번호
                roomName : modifyName //수정한 방 이름
            }).then((response) => {
                console.log(response.data); //true 삭제 성공, false 삭제 실패
                if (response.data){ //성공하면
                    alert("방 이름 수정을 성공하였습니다.")
                }else { //실패하면
                    alert("방이름 수정에 실패하였습니다.")
                }
            }).catch((response) => {
                console.log('Error!');
            })

        } else { // 제목이 같으면
            alert("원래 방 이름과 동일합니다. 다시 입력해주세요")  ;
        }



    }

    return (
        
        //tdoby안에 들어갈 값만 불러오기
        //data는 수정할 때 쓸 데이터 테이블만 불러옴 
        //수정는 textField, 버튼
        <tbody>
            {
                data==null?<tr>
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
                        <th>
                            <form>
                                <TextField fullWidth label="메모 내용" id={e.roomNum} defaultValue={e.roomName}></TextField>
                            </form>
                        </th>
                        <th>{e.roomKey}</th>
                        <th>{e.roomMember}</th>
                        <th><Button type="submit" variant="outline-secondary" onClick={() => modifyRoomName(e.roomNum,e.roomKey)}>수정</Button></th>
                    </tr>
                )
            }
            
        </tbody>

    )
}

export default OutRoom