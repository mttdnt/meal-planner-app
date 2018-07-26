import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { Row, Col, Card, Table, Button, Modal } from 'react-materialize';

class MealView extends Component {

  constructor(props){
    super(props);
    this.state={
      users: null
    }
  }

  async componentDidMount(){
    const res = await axios.get('/users');
    this.setState({
      users: res.data
    });
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
                    </tr>
                )})}
            </tbody>
        </Table>
    );
  }

  renderMeals = (index) => {
    return this.state.users[index].meals.map( (meal, index) => {
        return(
            <Col s={4} offset="s4">
                <Card>
                    <h3>Meal {index+1}</h3>
                    {this.renderFoodItems(meal.foodList.slice())}
                </Card>
            </Col>    
        );
    });
  }

  renderUserCards = () => {
    if(this.state.users!==null){
      return this.state.users.map((user, index) =>{
        return(
          <Col s={4}>
            <Card>
              <h5>{user.name}'s Meals</h5>
              <Modal
                header={`${user.name}'s Meals`}
                trigger={<Button>See Meals</Button>}
                >
                <div>
                  {this.renderMeals(index)}
                </div>
              </Modal>
            </Card>
           </Col>
        ); 
       });
    }
  }

  render() {
    return (
      <div>
        <Row>
          {this.renderUserCards()}
        </Row>
      </div>
    );
  }
}

export default MealView;
