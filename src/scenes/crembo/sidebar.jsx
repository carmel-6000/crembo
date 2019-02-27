

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PrivateRoute from '../../App'
import './sidebar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAppears: false
        }
    }
    changeModelState = (boolean) => {
 
        this.setState({ modalAppears: boolean });

    }


    render() {
        return (
            <div>
                <a onClick={() => this.changeModelState(true)}>
                    <i className="fas fa-star" />  תפריט
                </a>

                <a  className={this.state.modalAppears ? "sidenav widthy" : "notwidthy"} onBlur = {() => this.changeModelState(false)}>
                    {this.state.modalAppears &&
                    <span>
                    <a className="closebtn" onClick={() => this.changeModelState(false)}>&times;</a>
                    <h3>אחראי הסעה בסניף</h3>
                    <Link to={{ pathname: '/contact/children' }} >
                    <p>חניכים</p>
                    </Link>
                    <Link to={{ pathname: '/contact/drivers'}} >
                    <p>נהגים</p>
                    </Link>
                    <Link  to={{ pathname: '/contact/assistants' }} >
                    <p>מלווים</p>
                    </Link>
                    <a href="/rides" >הסעות הסניף</a>
                    </span>}
                </a>
            </div>

        );
    }
}

export default Sidebar
