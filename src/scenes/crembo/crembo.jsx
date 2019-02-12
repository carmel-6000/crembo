import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import Grid from '../../Grid/Grid';
import Login from '../../Auth/Login';
import Auth from '../../Auth/Auth';
import logoImage from '../../img/carmel.png';
import './crembo.css';
import Home from './home';
import Neta from './neta';
import NewActivity from './newActivity';
import ContactList from './contactlist';
import Sidebar from './sidebar';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated() === true ? <Component {...props} /> : <Redirect to='/login' />
    )} />
)
class Crembo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="crembo-font">

                <NavBar />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/neta" component={Neta} />
                <PrivateRoute exact path="/new-activity" component={NewActivity} />

                <PrivateRoute exact path="/contact/assistants" component={() => (
                    <ContactList contactApi={'/api/assistants'} />
                )} />
                <PrivateRoute exact path="/contact/children" component={() => (
                    <ContactList contactApi={'/api/children'} />
                )} />
                <PrivateRoute exact path="/contact/drivers" component={() => (
                    <ContactList contactApi={'/api/drivers'} />
                )} />


            </div>
        );
    }
}

class NavHeaderComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <ul class="navbar-nav mr-auto ">
                    <li class="nav-item active">
                        <a class="nav-link nav-linker" onClick={this.props.logout} href="#">
                            <i className="fas fa-sign-in-alt" /> התנתק </a>
                    </li>
                    <li className="nav-item active" >
                        <a className="nav-link nav-linker" href="/user">
                            <i className="fas fa-user-tie" /> משתמש
                    </a>
                    </li>
                </ul>
                <Sidebar/>
            </div>
        );
    }
}



//THIS IS WHERE THE CARMEL6000LOGO, ADMIN AND LOGIN IS. 
class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navHeader: Auth.isAuthenticated() === true ? true : false,
        }

    }

    updateNav = () => {
        this.setState({ navHeader: true })
    }

    // Calling Auth.logout -> clears cache and returns back. hitting route login
    logOut = () => {
        Auth.logout();
        this.setState({ navHeader: false });
    }
    render() {
        let navHeader = this.state.navHeader === true ? <NavHeaderComponent logout={this.logOut} /> : "";
        return (

            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top shadow primary ">
                    <a class="navbar-brand" href="#">כנפיים של קרמבו</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        {navHeader}
                    </div>
                </nav>
            </header>

        );
    }
}

export default Crembo
