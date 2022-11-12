import React from 'react';
import {Row, Col} from "reactstrap";

const Footer = () => {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year
    };

    return (
        <div id="main-footer" className="text-center p-2"> 
            <Row>
                <Col>
                <br></br>
                    <p>
                        Udangtang &copy; <span>{thisYear()}</span>
                        <br></br><br></br>
                        <p>충청남도 아산시 탕정면 선문로 221번길 70 선문대학교</p>
                        <a href="https://github.com/ckdgns6078/Udangtangtang">https://github.com/ckdgns6078/Udangtangtang</a>
                    </p>
                </Col>
            </Row>
        </div>
    )
};

export default Footer;