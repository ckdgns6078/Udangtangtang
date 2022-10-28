import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';

class KakaoLogin extends Component {

    componentDidMount() {

        const kakaoScript = document.createElement("script");

        kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
        document.head.appendChild(kakaoScript);

        kakaoScript.onload = () => {
            window.Kakao.init("6c34601c92d0556aa8d56ace8308b5ba");

            window.Kakao.Auth.createLoginButton({
                container: "#kakao-login-btn",
                success: (auth) => {
                    //console.log("Kakao 로그인 완료", auth.access_token);

                    window.Kakao.API.request({
                        url: "/v2/user/me",
                        success: (res) => {
                            console.log("Kakao 사용자 정보", res);
                            sessionStorage.setItem("id",res.id);
                            sessionStorage.setItem("profile", res.properties.profile_image);
                            sessionStorage.setItem("nickname", res.properties.nickname);
                            //console.log(window.Kakao.Auth.getAccessToken());//토큰

                            //서버에 데이터 보낼값
                            //서버링크 / 로그인
                            //아이디, 이름
                            axios.post("http://192.168.2.82:5000/login", {
                                id:res.id,
                                name:res.properties.nickname
                            })
                                .then(function (check) { //서버에서 주는 리턴값???
                                    console.log(check); //data: '나 값이 들어온 것 같음', status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });

                            //로그인 후 들어갈 곳
                            //window.location.href = "http://localhost:3000";
                        },
                        fail: (err) => {
                            console.log(err);
                        },
                    })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                fail: (err) => {
                    console.log(err);
                },
            });
            window.Kakao.init();
        };

    }
    render() {
        return (
            <div>
                <div type="button" id="kakao-login-btn"></div>
            </div>
        )
    }
}

export default KakaoLogin;