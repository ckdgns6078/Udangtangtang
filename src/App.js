
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Sidebar from './Components/Sidebar';
import { SidebarData } from './Components/SidebarData';

import Home from './pags/Home';
import Client from './pags/Client';
import Sekes from './pags/Sekes';

import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Routes from './routes/Routes';





function App() {
  return (
    <BrowserRouter>

      <Routes />
    
    </BrowserRouter>
  );
}

export default App;