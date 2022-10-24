import React, { useEffect, useRef } from 'react'
import Naverimg from '../img/NaverButton.png';
import { useLocation } from 'react-router-dom';
import axios from "axios";


function Naver() {
    const naverRef = useRef();
	const { naver } = window
    const NAVER_CLIENT_ID = "OcAsBqkibE994tAMco3N";
    const NAVER_CALLBACK_URL = "http://localhost:3000";


    useEffect(() => {
		const naverLogin = new naver.LoginWithNaverId({
            clientId: NAVER_CLIENT_ID,
            callbackUrl: NAVER_CALLBACK_URL,
            // 팝업창으로 로그인을 진행할 것인지?           
            isPopup: false,
            // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
            loginButton: { color: 'green', type: 3, height: 48 },
            callbackHandle: true,
        })
        naverLogin.init()
        naverLogin.getLoginStatus(async function (status) {
            if (status) {
                // 아래처럼 선택하여 추출이 가능하고, 
                const user_id = naverLogin.user.email;
                const user_name = naverLogin.user.getName();
                const profile = naverLogin.user.profile_image;
                // console.log(user_id);
                console.log(naverLogin.user.email);
                console.log(user_id);
                // console.log(profile);
                sessionStorage.setItem("id",user_id);
                sessionStorage.setItem("frontid",user_name);
                sessionStorage.setItem("profile",profile);
                console.log(user_name);
                // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
                // setUserInfo(naverLogin.user)
                console.log("로그인 완료");
                
                //서버에 데이터 보낼값
                //서버링크 / 로그인
                //아이디, 이름
                axios.post("http://Udangtangtangapp-env.eba-xaipu9ej.ap-northeast-2.elasticbeanstalk.com/login", {
                    id: user_id,
                    name: user_name
                })
                    .then(function (check) { //서버에서 주는 리턴값???
                        console.log(check); //data: '나 값이 들어온 것 같음', status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            }
        })
        naverLogin.logout();
    }, [])
    
    const handleClick = () => {
        naverRef.current.children[0].click();    
    }
    return (
        <>
            <div ref={naverRef} id="naverIdLogin"></div>
            <button onClick={handleClick} className="naverButton">
                <img src={Naverimg} className="img"/>
            </button>
        </>
    )
}
export default Naver;