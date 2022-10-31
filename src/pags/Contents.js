import { Container, Navbar } from 'react-bootstrap'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import React, { useEffect, useRef, useState, useCallback } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from '@mui/material/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';

import Reply from './Reply';
import ReadReply from './ReadReply';
import UpdateReply from '../Components/UpdateReplyModal';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



const Contents = () => {
    const [contentdata, setcontentdata] = useState();
    return (
        <Grid item xs={16} >

        {
          contentdata && contentdata.map((e, idx) =>
            <div>
              <Item>
              <Navbar>
                  <Container>
                    <Navbar.Brand href="#home"><Chip label={e.contentsWriter} /></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                      <Navbar.Text>
                        <tr>
                          <td>    {e.contentsTime}  </td>
                          &nbsp;&nbsp;
                          <td>

                            <NavDropdown title="" id="basic-nav-dropdown">
                              <NavDropdown.Item type="submit" onClick={() => UpdateReply(e.replyNum)} >수정</NavDropdown.Item>
                              <NavDropdown.Item >삭제</NavDropdown.Item>
                              {/* onClick={() => DeleteReply(e.replyNum)}  */}
                            </NavDropdown>
                          </td>
                        </tr>
                      </Navbar.Text>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>


{/* 
                <h6>{e.contentsTime}</h6>
                <Stack direction="row" spacing={1}>
                  <Chip label={e.contentsWriter} />
                </Stack>
                <h6>{e.contentsText}</h6> */}
                 <Stack direction="row" spacing={1}>

                  </Stack>
                  <form>
                    <TextField fullWidth label="음성 텍스트 내용" id={e.replyNum} defaultValue={e.contentsText}></TextField>
                  </form>

              </Item>
              <br></br>
            </div>
          )
        }
      </Grid>
    );
};

export default Contents;