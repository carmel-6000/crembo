import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import Grid from '../../Grid/Grid';
import Login from '../../Auth/Login';
import Auth from '../../Auth/Auth';
import logoImage from '../../img/carmel.png';
import './crembo.css';
import NewActivity from './newActivity';
import ContactList from './contactlist';
import Rides from './rides'
import RideDetails from './rideDetails';
import ChildDetails from './childDetails';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated() === true ? <Component {...props} /> : <Redirect to='/login' />
    )} />
)


class Crembo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasActivity: null,
            activityDate: null,
            activityTime: null
        }
        this.toRender = true;
        // //doing redirect to main page: cant rewrite url
        // if (window.location.pathname != "/" && window.location.pathname != "/dashboard" && window.location.pathname != "/login") {
        //     window.location.pathname = "/";
        //     this.toRender = false;
        // }

    }
    componentWillMount() {
        //gets the manager's live activity details by his id from local storage
        let managerId = localStorage.getItem('userId');
        console.log("localStorage", localStorage)
        if (managerId) {
            Auth.authFetch(`api/activities?filter={"where": {"managerId" : ${managerId} }}`).then(response => { return response.json() }).then(res => {
                if (res.length) {
                    console.log("res",res)
                    let index_found = -1;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].isLive == true)
                            index_found = i;
                    }
                    if (index_found !== -1)
                        this.setState({ hasActivity: true, activityDate: res[index_found].activityDate, activityTime: res[index_found].activityTime, activityDay: res[index_found].activityDay })
                    else
                        this.setState({ hasActivity: false })
                }
                else {
                    this.setState({ hasActivity: false })
                }
            })
        }
    }


    render() {
        if (!this.toRender)
            return (
                //loading logo
                <div class="d-flex justify-content-center">
                    <div class="mt-5 spinner-border text-info" style={{width: "7rem", height: "7rem"}} role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>

            );
            console.log("state",this.state )
        return (
            <div className="crembo-font">
                <NavBar />
                <Route exact path="/" render={() => (
                    this.state.hasActivity === true ?
                        <Redirect to={{ pathname: "/rides", state: this.state }} />
                        : this.state.hasActivity === false ?
                            <Redirect to={{ pathname: "/new-activity" }} /> :
                            null

                )} />
                {/* <PrivateRoute exact path="/" component={Home} /> */}
                <PrivateRoute exact path="/rides" component={Rides} />
                <PrivateRoute exact path="/rides/ride-details/:id" component={RideDetails} />
                <PrivateRoute exact path="/rides/ride-details/:id/child-details/:id" component={ChildDetails} />
                <PrivateRoute exact path="/new-activity" component={NewActivity} />

                {/* <PrivateRoute exact path="/rides/ride-details/:id/child-details/:childid" component={() => (
                    <ChildDetails childApi={'/api/children/:childid'} />
                )} />  */}


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
            <ul className="navbar-nav mr-auto ">
                <li className="nav-item active">
                    <a className="nav-link nav-linker" onClick={this.props.logout} href="#">
                        <i className="fas fa-sign-in-alt" /> התנתק </a>
                </li>
                <li className="nav-item active" >
                    <a className="nav-link nav-linker" href="/user">
                        <i className="fas fa-user-tie" /> משתמש
                </a>
                </li>
            </ul>
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
                    <a className="navbar-brand" href="#">כנפיים של קרמבו</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        {navHeader}
                    </div>
                </nav>
            </header>

        );
    }
}

export default Crembo
