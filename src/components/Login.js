import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import {Card, Button, Row, Col} from 'react-materialize';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
            signup: false
        }
    }

    setUser = async () => {
        try{
            const response = await axios.post("/users/login", {
                email: this.state.email,
                password: this.state.password
            });
            this.props.login(response.data.payload);
        }catch(e){
            console.error(e);
        }
    }

    onFormChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    signup = () => {
        this.setState({signup: true})
    }

    render() {
        if(this.state.signup){
            return(
                <Redirect to="/signup" />
            );
        }
        return (
            <div>
                <Row>
                    <Col s={6} offset="s3">
                        <Card style={styles.loginCard}>
                            <input name="email" onChange={this.onFormChange} type="text" placeholder="email" value={this.state.email} />
                            <input name="password" onChange={this.onFormChange} type="password" placeholder="password" value={this.state.password} />
                            <Button onClick={this.setUser}>Sign In</Button> or <Button onClick={this.signup}>Sign up</Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;

const styles = {
    loginCard: {
        "marginTop": "2rem"
    }
};