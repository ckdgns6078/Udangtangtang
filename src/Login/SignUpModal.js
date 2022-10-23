import React from 'react';
import {Modal} from 'react-bootstrap';
import KakaoLogin from'../Login/KakaoLogin';
import Naver from '../Login/Naver';
import Facebook from '../Login/Facebook';


const SignUpModal = ({show, onHide})=>{
    function handleClose() {
        onHide(false);
       
    }
    

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
          
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Login
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <div className="d-grid gap-2" align="center">
                <KakaoLogin></KakaoLogin>
                <Naver/>
                <Facebook></Facebook>
            </div>
            </Modal.Body>
        
        </Modal>
    )
}

export default SignUpModal;