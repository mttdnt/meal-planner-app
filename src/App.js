import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { Navbar, Icon, NavItem } from 'react-materialize'; 
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import UserPage from './components/UserPage';
import MealView from './components/MealView';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';

import { setToken, getToken, removeToken } from "./services/tokenService";

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      user: null
    } 
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  login = (token) => {
    setToken(token);
    this.getCurrentUser();
  }

  logout = (token) => {
    removeToken();
    this.setState({user: null});
  }

  getCurrentUser = () =>{
    this.setState({user: getToken()})
  }

  render() {
    return (
      <Router>
        <div> 
          <Navbar brand='Meal Planner' right>
          {
            this.state.user?
            <div style={{"display": "-webkit-box"}}>
              <Link to="/"><Icon>account_circle</Icon></Link>
              <Link to="/meals"><Icon>fastfood</Icon></Link>
              <Logout logout={this.logout}/>
            </div>
            :
            null
          }
          </Navbar>

          <Route exact path='/' render={ ()=>
            this.state.user?
            <UserPage user={this.state.user}/>
            :
            <Redirect to="/login"/>
          }/>
          <Route exact path="/login" render={ ()=>
            this.state.user?
            <Redirect to="/"/>
            :
            <Login login={this.login}/>
          }/>
          <Route exact path='/meals' render={ ()=>
            this.state.user?
            <MealView user={this.state.user}/>
            :
            <Redirect to="/login"/>
          } />  
          <Route exact path="/signup" render={ ()=>
            this.state.user?
            <Redirect to="/"/>
            :
            <Signup />
          }/>          
        </div>
      </Router>
    );
  }
}

export default App;
