import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import {Card, Button, Row, Col} from 'react-materialize';
import { Redirect } from 'react-router-dom';

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
            name: null,
            signedUp: false
        }
    }

    signup = async () => {
        try{
            const response = await axios.post("/users/signup", {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            });
            this.setState({ signedUp: true });
        }catch(e){
            console.log(e);
        }
    }

    login = () => {
        this.setState({ signedUp: true });
    }

    onFormChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        if(this.state.signedUp){
            return(<Redirect to="/login"/>);
        }

        return (
            <div>
                <Row>
                    <Col s={6} offset="s3">
                        <Card style={styles.signupCard}>
                            <input name="name" onChange={this.onFormChange} type="text" placeholder="name" value={this.state.name} />
                            <input name="email" onChange={this.onFormChange} type="text" placeholder="email" value={this.state.email} />
                            <input name="password" onChange={this.onFormChange} type="password" placeholder="password" value={this.state.password} />
                            <Button onClick={this.signup}>Sign Up</Button> 
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Signup;

const styles = {
    signupCard: {
        "marginTop": "2rem"
    }
};