import React from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import KakaoLogout2 from '../Login/KakaoLogout2';



const LogOutModal = ({ show, onHide }) => {

    function logoutAll() {
        sessionStorage.clear();
        //네이버
        var testPopUp;
        function openPopUp() {
            testPopUp = window.open("https://nid.naver.com/nidlogin.logout", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1,height=1");
        }
        function closePopUp() {
            testPopUp.close();
            sessionStorage.clear();
        }
        openPopUp();
        setTimeout(function () {
            closePopUp();
            handleClose();
        }, 1000);

        //카카오
        if (window.Kakao.Auth.getAccessToken()) {
            window.Kakao.API.request({
                url: "/v1/user/unlink",
                success: function (response) {
                    console.log(response);
                },
                fail: function (error) {
                    console.log(error);
                },
            });
            window.Kakao.Auth.setAccessToken(undefined);
        }

    }
    function handleClose() {
        onHide(false);
        window.location.replace("http://localhost:3000");
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        LogOut
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="d-grid gap-2" align="center">
                        <br></br>
                        정말 로그아웃 하시겠습니까?
                        <div>
                            <br></br>
                            {/* <KakaoLogout></KakaoLogout> */}
                            <KakaoLogout2 />
                            <Button variant="outline-primary" onClick={logoutAll}>Yes</Button>{' '}
                            <Button variant="outline-primary" onClick={logoutAll}>No</Button>{' '}
                        </div>
                    </div>
                </Modal.Body>
            </Container>
        </Modal>
    )
}

export default LogOutModal;