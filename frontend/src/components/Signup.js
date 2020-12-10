import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Signup extends Component {
    componentDidMount(){
        
    }
    
    render() {
        return (
            <React.Fragment>
                <Link to={"http://localhost:3001/auth/google"}>Click Me</Link>
                <a href="http://localhost:3001/auth/google">maaro</a>
            </React.Fragment>
        )
    }
}
