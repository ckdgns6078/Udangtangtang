import { Link } from 'react-router-dom';
import react, { useEffect, useState } from 'react';
import SignUpModal from '../Login/SignUpModal';
import LogOutModal from '../Login/LogOutModal'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from "@mui/material/styles";
import udttang from "../img/udttang.png"
import InputBase from "@mui/material/InputBase";
import SearchIcon from '@mui/icons-material/Search';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import Gear from '../img/gear.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

export const SidebarData = () => {
  const [signUpModalOn, setSignUpModalOn] = useState(false);
  const [logOutModalOn, setLogOutModalOn] = useState(false);


  const id = sessionStorage.getItem("id");
  const nickname = sessionStorage.getItem("nickname");
  const profile = sessionStorage.getItem("profile")
  console.log(id);
  console.log(nickname);
  console.log(profile)
  useEffect(() => {
    var src = document.getElementById("box");
    console.log(sessionStorage.getItem("nickname"))
    if (id != null) {

      src.innerHTML =
        "<div>" +
        "<Nav.Link>"
        + sessionStorage.getItem("nickname") + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "</Nav.Link>" +

        "<button class='profilebutton'> <div class='box'> <img class='profile' src='"
        + sessionStorage.getItem("profile") + "'/></div></Button>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>";


    }
  })






  return (
    <Box sx={{ flexGrow: 1 }}>

      <SignUpModal show={signUpModalOn} onHide={() => setSignUpModalOn(false)} />
      <LogOutModal show={logOutModalOn} onHide={() => setLogOutModalOn(false)} />


      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>


            <Link to="/">
              <img src={udttang} className='log' />
            </Link>


          </Typography>

          <Typography>

          </Typography>

          <div id="box"></div>
          <div>
            {
              id === null ? <Button color="inherit" variant='outlined' onClick={() => setSignUpModalOn(true)}>Login</Button> :
                <Button color="inherit" variant='outlined' onClick={() => setLogOutModalOn(true)}>Logout</Button>
            }
          </div>

          &nbsp;&nbsp;&nbsp;&nbsp;

          {

            id === null ? null :

              <div class="gearbox">
                <Link to="/Setting">
                  <MoreVertIcon class="gear" src={Gear}></MoreVertIcon>
                </Link>
              </div>
          }

        </Toolbar>
      </AppBar>
    </Box>
  )
}
