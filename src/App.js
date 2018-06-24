import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';

class App extends Component {

  componentWillMount(){
    this.healthCheck();
    this.login();
  }

  healthCheck = async () => {
    try{
      const response = await axios.get('/healthcheck');
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  }

  login = async () => {
    try{
      const response = await axios.post('/login');
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  }

  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          Meal Prep
          <IconButton color="inherit" aria-label="Menu">
            <DashboardIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="Menu">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default App;
