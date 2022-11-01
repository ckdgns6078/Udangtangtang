import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";

export default class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: "",
        checklog: false
    };

    responseFacebook = (response) => {
        console.log(response);
        if (response.status !== "unknown") {
            this.setState({
                isLoggedIn: true,
                userID: response.userID,
                name: response.name,
                email: response.email,
                picture: response.picture.data.url,
                check:true
            });
        }
        sessionStorage.setItem("nickname", response.name);
        sessionStorage.setItem("profile", response.picture.data.url);
        sessionStorage.setItem("id", response.userID);

    };

    componentClicked = () => {
        console.log("clicked");
        this.setState({
            isLoggedIn: false,
            userID: "",
            name: "",
            email: "",
            picture: "",
            checklog : true
        })
    };

    render() {
        const { email, isLoggedIn, name, picture } = this.state;
        let fbContent;

        if (isLoggedIn) {
            fbContent = (
                <div id="face"
                    style={{
                        width: "22px",
                       
                        background: "#f4f4f4",
                        padding: "20px"
                    }}
                >
                    <img    
                       src={picture} alt={name} />
                    <h2>Welcome {name}</h2>
                    Email: {email}
                </div>
            );
        } else {
            fbContent = (
                <FacebookLogin
                    appId="1480672229110640"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                    icon="fa-facebook"
                />
            );
        }

        return  (
        
        <div>{fbContent}</div>
            // <button id="facebookbutton" className="facebookbutton" onClick={this.componentClicked}>
            //     Login with Facebook
            //     {
            //         this.checklog &&
            //         <FacebookLogin appId="1480672229110640" autoLoad={true} fields="name,email,picture" onClick={this.componentClicked} callback={this.responseFacebook} icon="fa-facebook" />
            //     }
            // </button>

        )

            
    }
}

