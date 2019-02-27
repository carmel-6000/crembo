import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import Auth from '../../Auth/Auth';
import './crembo.css';
import NewActivity from './newActivity';
import ContactList from './contactlist';
import Rides from './rides'
import RideDetails from './rideDetails';
import ChildDetails from './childDetails';
import notFound from './notFound';
import Sidebar from './sidebar';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated() === true ? <Component {...props} /> : <Redirect to='/login' />
    )} />
    
)

class Crembo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasActivity: false,
            activityDate: null,
            activityTime: null,
            haschecked: null
        }
        this.toRender = true;
    }

    componentWillMount() {
        //gets the manager's live activity details by his id from local storage
        let managerId = localStorage.getItem('userId');
        if (managerId) {
            Auth.authFetch(`api/activities?filter={"where": {"managerId":  ${managerId} , "isLive": true}}`).then(response => { return response.json() }).then(res => {
                console.log("res.isLive", res)
                for (let i = 0; i < res.length; i++)
                    if (res[i].isLive) {
                        this.setState({ hasActivity: true })
                        this.setState({ haschecked: true });
                        console.log("the activity ")
                    } 

            }).catch((err) => {
                console.log('Fetch Error :-S', err);
            });

        }
        else { this.setState({ haschecked: true });
    console.log("no activity")}
    }


    render() {
            console.log("this.state.hasActivity", this.state.hasActivity)
            console.log("haschecked", this.state.haschecked)
            if (!this.toRender)
                return (
                    //loading logo
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 spinner-border text-info" style={{ width: "7rem", height: "7rem" }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>

                );
            
            return (
                <div className="crembo-font">
                    <div>
                        <NavBar />
                        <Switch>
                        <Route exact path="/" render={() => (
                            this.state.hasActivity && this.state.haschecked ? (
                                <Redirect to={{ pathname: "/rides", state: this.state }} />
                             ) : <NewActivity/>
                        )} />
                        <PrivateRoute exact path="/rides" component={Rides} />
                        <PrivateRoute exact path="/rides/ride-details/:id" component={RideDetails} />
                        <PrivateRoute exact path="/contact/:person(assistants|children|drivers)/details/:id" component={ChildDetails} />
                        <PrivateRoute exact path="/rides/ride-details/:id/child-details/:id" component={ChildDetails} />
                        <PrivateRoute exact path="/rides/ride-details/:id/add/:person(assistants|drivers)" component={ContactList} />
                        <PrivateRoute exact path="/contact/:person(children|assistants|drivers)" component={ContactList} />
                        <PrivateRoute component={notFound} />
                        </Switch>
                    </div>
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
                <Sidebar/>
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
