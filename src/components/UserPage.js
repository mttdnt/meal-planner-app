import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { Row, Col, Preloader, Card, Table, Button, Modal } from 'react-materialize';

class UserPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            meals: null,
            currentFood: null,
            currentAmount: null,
            currentUnit: null,
            currentMeal: null
        }
    }

    componentDidMount(){
        this.getMealsByUser();
    }

    mealFormChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    getMealsByUser = async (user_id) => { 
        try{
            const res = await axios.get('/meals/user', {
                headers: {
                  Authorization: `Bearer ${this.props.user}`
                }
              })
            this.setState({user: user_id, meals: res.data, loading: false});
        }catch(e){
            console.error(e);
        }

    }

    addMeal = async() =>{
        try{
            const res = await axios.post('/meals/user', {}, {
                headers: {
                  Authorization: `Bearer ${this.props.user}`
                }
              });
            console.log(res.data)
            let meals = this.state.meals.slice();
            meals.push(res.data);
            this.setState({meals: meals});
        }catch(e){
            console.error(e);
        }
    }

    deleteMeal = async(e) =>{
        try{
            let index = e.target.name;
            let meal_id=this.state.meals[index]._id

            const response = await axios.delete('/meals/'+meal_id,{
                headers: {
                    Authorization: `Bearer ${this.props.user}`
                  }
            });
            
            let meals = this.state.meals.slice();
            meals.splice(index, 1);
    
            this.setState({meals: meals});
        }catch(e){
            console.error(e);
        }
    }

    toggleAddFoodItem = (e) => {
        this.setState({currentMeal: e.target.name});
    }

    cancelAddFoodItem = (e) => {
        this.setState({currentAmount: null, currentFood: null, currentUnit: null, currentMeal: null});
    }

    addFoodItem = async (e) => {

        if(this.state.currentAmount===null || this.state.currentUnit===null || this.state.currentFood===null  ){
            alert("Please fill in all fields");
        }else{
            try{
                let index = e.target.name;
                let payload = {
                    meal: this.state.meals[index]._id,
                    name: this.state.currentFood,
                    amount: this.state.currentAmount,
                    unit: this.state.currentUnit            
                }
                const response = await axios.post('/meals/food/addFood', payload, {
                    headers: {
                        Authorization: `Bearer ${this.props.user}`
                      }
                });
        
                const updatedMeals = this.state.meals;
                updatedMeals[index].foodList.push(response.data);
        
                this.setState({meals: updatedMeals, currentAmount: null, currentFood: null, currentUnit: null, currentMeal: null});
            }catch(e){
                console.error(e);
            }
        }
    }

    removeFoodItem = async (e) => {
        let updatedMeals = this.state.meals;
        let indexFood = e.target.getAttribute("index");
        let indexMeal;
        for(let i=0; i<updatedMeals.length; i++){
            if(updatedMeals[i]._id === e.target.name){
                indexMeal=i;
            } 
        }
        try{
            const response = await axios.delete(`/meals/food/deleteFood/${e.target.name}/${e.target.id}`,{
                headers: {
                    Authorization: `Bearer ${this.props.user}`
                  }
            });
            updatedMeals[indexMeal].foodList.splice(indexFood, 1);
            this.setState({meals: updatedMeals})
        }catch(e){
            console.error(e);
        }   
    }

    renderFoodItems = (foodList) => {
        return (
            <Table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Unit</td>
                    </tr>
                </thead>
                <tbody>
                    {foodList.map( (item, index) => {
                        
                        return(
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>{item.unit}</td>
                            <Button index={index} name={item.meal} id={item._id} onClick={this.removeFoodItem} style={{"marginTop": "1rem"}} waves='light'>Remove</Button>
                        </tr>
                    )})}
                </tbody>
            </Table>
        );
    }

    renderMeals = () => {
        return this.state.meals.map( (meal, index) => {
            return(
                <Col s={4} offset="s4">
                    <Card>
                        <Button name={index} onClick={this.deleteMeal} style={{"position": "absolute", "top": "0", "left": "0"}}waves='light'>Delete</Button>
                        <h3>Meal {index+1}</h3>
                        {this.renderFoodItems(meal.foodList.slice())}
                        { 
                        this.state.currentMeal===null?
                        <Button name={index} onClick={this.toggleAddFoodItem} style={{"marginTop": "1rem"}} waves='light'>Add</Button> 
                        :
                        null
                        }
                        {
                        Number(this.state.currentMeal)===index && this.state.currentMeal!==null?
                        <tr>
                            <td><input type="text" name="currentFood" onChange={this.mealFormChange} placeholder="Name" value={this.state.currentFood}/></td>
                            <td><input type="text" name="currentAmount" onChange={this.mealFormChange} placeholder="Amount" value={this.state.currentAmount}/></td>
                            <td><input type="text" name="currentUnit" onChange={this.mealFormChange} placeholder="Unit" value={this.state.currentUnit}/></td>
                            <td><Button name={index} onClick={this.addFoodItem} style={{"marginTop": "1rem"}} waves='light'>Add</Button></td>
                            <td><Button onClick={this.cancelAddFoodItem} style={{"marginTop": "1rem"}} waves='light'>Cancel</Button></td>
                        </tr>
                        :
                        null
                        }
                    </Card>
                </Col>    
            );
        });
    }

    render() {
        console.log(this.state.currentMeal)
        if(this.state.loading || this.state.meals===null){
            return(
                <Row>
                    <Col s={4}>
                        <Preloader size='big'/>
                    </Col>
                </Row>
            );
        }
        return (
            <div style={{"textAlign": "center"}}>
                <Row>
                    {this.renderMeals()}
                </Row>
                {this.state.meals.length < 6 ? <Button floating large className='red' waves='light' icon='add' onClick={this.addMeal}/> : null}
            </div>
        );
    }
}

export default UserPage;
