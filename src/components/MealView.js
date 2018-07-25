import React, { Component } from 'react';
import '../App.css';
import axios from "axios";

class MealView extends Component {

  async componentDidMount(){
    const res = await axios.get('/users');
    console.log(res.data);
  }

  render() {
    return (
      <div>
        <h1>Meal View</h1>
      </div>
    );
  }
}

export default MealView;
