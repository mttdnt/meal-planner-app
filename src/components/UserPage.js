import React, { Component } from 'react';
import '../App.css';
import axios from "axios";

class UserPage extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.getUser(); 
    }

    getUser = async () => {
        const response = await axios.get('/users');
        console.log(response.data[0]);
        this.getMealsByUser(response.data[0]['_id']);
    }

    getMealsByUser = async (user_id) => { 
        console.log(user_id);
        const response = await axios.get('/meals/user/'+user_id);
        console.log(response.data[0]);
    }

    render() {
        return (
            <div>
                <h1>User Page</h1>
            </div>
        );
    }
}

export default UserPage;
