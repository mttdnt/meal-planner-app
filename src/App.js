import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { Navbar, Icon, NavItem } from 'react-materialize'; 
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import UserPage from './components/UserPage';
import MealView from './components/MealView';

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
        <BrowserRouter>
          <div>
            <Navbar brand='Meal Planner' right>
              <div style={{"display": "-webkit-box"}}>
                <Link to="/user"><Icon>account_circle</Icon></Link>
                <Link to="/"><Icon>fastfood</Icon></Link>
              </div>
            </Navbar>

            <Switch>
              <Route exact path='/user' component={UserPage} />
              <Route exact path='/' component={MealView} />  
            </Switch>
          </div>

        </BrowserRouter>
    );
  }
}

export default App;
