import React, { Component, useEffect, useState } from 'react';

class KakaoLogout2 extends Component {

    componentDidMount() {
        const kakaoScript = document.createElement("script");

        kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
        document.head.appendChild(kakaoScript);

        kakaoScript.onload = () => {
            window.Kakao.init("6c34601c92d0556aa8d56ace8308b5ba");

            window.Kakao.Auth.logout({
                success: (auth) => {
                    console.log("kakao 로그아웃",auth.access_token);
                }
            })
            .then(function(response){
                console.log(response);
               
            })
            .catch(function (error){
                console.log(error);
                console.log('Not log in.')
            })

        };

    }
    render() {
        //const {user_id,nickName,profileImage} = this.state;

        return (
            <div>
                <div type="button" id="kakao-login-btn"></div>
            </div>
        )
    }
}

export default KakaoLogout2;