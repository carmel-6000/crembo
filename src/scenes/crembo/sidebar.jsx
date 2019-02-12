

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
        console.log("ll",boolean)
        this.setState({ modalAppears: boolean });
        console.log("this.state", this.state.modalAppears)
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
                    <a href="/contact/children">הסעות הסניף</a>
                    <a href="/contact/drivers">נהגים</a>
                    <a href="/contact/assistants">מלווים</a>
                    <a href="/contact/children">חניכים</a>
                    </span>}
                </a>
            </div>

        );
    }
}

export default Sidebar
