
import { Container, Navbar } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import PauseIcon from '@mui/icons-material/Pause';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { Link } from '@mui/material';
import { Button } from 'bootstrap';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const data = [
  {
    src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
      


  }]









  
const Client = () => {

    const param = useParams()
    
    const  params  = useParams()
    
    
    const [data, setData] = useState();
    
      useEffect( () =>{
    
     (async ()=>{
      try {
        console.log(window.location.href);
        console.log(params);
           const res = await axios.post("http://192.168.2.65:5000/readContents",{
            roomNum : params.id,
            
            // meetNum : "ASd" 
           });const res2 = await axios.post("http://192.168.2.65:5000/readReply",{
            roomNum : params.id,
            // meetNum : "ASd" 
            
          
           });


        
           console.log(res.data);
           setData(res.data);
           console.log(res2.data);
           setData(res2.data);
        } catch (error) {
            console.log(error)
        }
      })();
        
    },[])
    useEffect( () =>{

      (async ()=>{
       try {
         console.log(window.location.href);
         console.log(params);
            const res = await axios.post("http://192.168.2.65:5000/readMeeting",{
             roomNum : params.id
            });
            console.log(res.data);
            setData(res.data);
         } catch (error) {
             console.log(error)
         }
       })();
         
     },[])
     
    
    
  return (

     
        <Container maxWidth="sm" >
   
          <Grid container>

          <Box width="100%" display="flex" flexDirection="column" m="20px" sx={{ flexGrow: 1 , }}>

                     
                      <Navbar expand="lg" variant="light" bg="light">
                        <Container>
                          <Navbar.Brand href="#">회의방</Navbar.Brand>
                        </Container>
                       
                  <Fab size="small" color="inherit" aria-label="add">
                  <MicIcon />
                  </Fab>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Fab size="small" color="inherit" aria-label="add">
                  <MicOffIcon />
                  </Fab>
                      </Navbar>
             
            <Grid container spacing={2} columns={16}>

              {/* 오른쪽 페이지 */}
              <Grid item xs={10} >
                <Item>
   

                </Item>
              </Grid>


              {/* 왼쪽 페이지 */}
              <Grid item xs={6}>
                <Item>
                  
                  <Fab size="small" color="inherit" aria-label="add">
                  <StopIcon />
                  </Fab>
                  &nbsp;&nbsp;
                  <Fab size="small" color="inherit" aria-label="add">
                   
                    <PlayArrowIcon />
                  </Fab>
                  &nbsp;&nbsp;
                  <Fab size="small" color="inherit" aria-label="add">
                    <PauseIcon />
                  </Fab>
                  &nbsp;&nbsp;
                  <Fab size="small" color="inherit" aria-label="add">
                    <AudioFileIcon />
                  </Fab>
                  
                  <Box>
                  <hr></hr>
                    <h4>메모</h4>
                    <hr></hr>
                    <Table responsive="xl">
                      <tr>
                        <th>닉네임</th>
                        <th>날짜</th>
                      </tr>
                      <tbody>
                        <tr>
                          <td>
                            
                            조창훈
                            <br></br>
                            <br></br>
                            <br></br>

                            <div>
                              메모 내용 
                              

                            </div>
                            ㅁㄴㅇㅁㄴ


                          </td>
                          
                          <td>2020/10-19 - 19:00
                          </td>
                            

                      
                        </tr>

                        <tr>
                          <td>
                            
                            조창훈
                            <br></br>
                            <br></br>
                            <br></br>

                            <div>
                              메모 내용 
                              

                            </div>
                            ㅁㄴㅇㅁㄴ


                          </td>
                          
                          <td>2020/10-19 - 19:00
                          </td>
                            

                      
                        </tr>
                        <tr>
                          <td>
                            
                            조창훈
                            <br></br>
                            <br></br>
                            <br></br>

                            <div>
                              메모 내용 
                              

                            </div>
                            ㅁㄴㅇㅁㄴ


                          </td>
                          
                          <td>2020/10-19 - 19:00
                          </td>

                        </tr>
                        
                      </tbody>

                    </Table>
                  </Box>
                    
                </Item>
              </Grid>
            </Grid>
          </Box>




          
          </Grid>
          <Grid item xs={10}>
                <Item>
       

                
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

   
    </Box>
    </Item>
              </Grid>

        </Container>


          

     
  )
}

export default Client