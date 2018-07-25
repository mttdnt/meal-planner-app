import React, { Component } from 'react';
import '../App.css';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

const Logout = (props) => {
    return (
      <div>
        <Link to='' onClick={props.logout}><Icon>exit_to_app</Icon></Link>
      </div>
    );
}

export default Logout;