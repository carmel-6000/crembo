import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './sidebar.css';
import { Router, Route, Link } from "react-router-dom";


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
                <button className="navbar-toggler" onClick={() => this.changeModelState(true)} >
                        <span className="navbar-toggler-icon"></span>
                </button>

                <a  className={this.state.modalAppears ? "sidenav widthy" : "notwidthy"} onBlur = {() => this.changeModelState(false)}>
                    {this.state.modalAppears &&
                
                    <span className="text-right ">
                    <a className="closebtn text-left" onClick={() => this.changeModelState(false)}>&times;</a>
                    <h3 className="mr-3 title_person">אחראי הסעה בסניף</h3>
                    <Link  to='/contact/children' onClick={() => this.changeModelState(false)} >
                    <p className="mr-3">חניכים</p>
                    </Link>
                    <Link  to='/contact/drivers' onClick={() => this.changeModelState(false)} >
                    <p className="mr-3">נהגים</p>
                    </Link>
                    <Link  to='/contact/assistants' onClick={() => this.changeModelState(false)} >
                    <p className="mr-3">מלווים</p>
                    </Link>
                    <Link to={{ pathname:'/rides' }} onClick={() => this.changeModelState(false)} >
                    <p className="mr-3"> הסעות הסניף</p>
                    </Link>
                    <p>
                        <a onClick={this.props.logout} href="#">
                        <i className="fas fa-sign-in-alt mr-3" /> התנתק </a>
                    </p>
                    </span>}
                </a>
            </div>

        );
    }
}

export default Sidebar
