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

const PrivateRoute = ({ component: Component, state, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated() === true ? <Component activityDetails={state} {...props}/> : <Redirect to='/login' />
    )} />
    
)

const ActivityRoute = ({ component: Comp, state, ...rest }) => (
    <Route {...rest} render={(props)=>  (
        state.hasActivity  === false ? <Redirect to='/'/>: 
        <PrivateRoute state={state} {...props} component={Comp} />
    )} />
   )

class Crembo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasActivity: false,
            activityDate: null,
            activityDay: null,
            haschecked: null,
        }
    }

    componentWillMount() {
        //gets the manager's live activity details by his id from local storage
        let managerId = localStorage.getItem('userId');
        if (managerId) {
            Auth.authFetch(`/api/activities?filter={"where": {"managerId": ${managerId} , "isLive": true}}`).then(response => { return response.json() }).then(res => {
                console.log("res.isLive", res);
                if(res.length === 0) {
                    this.setState({ haschecked: true });
                } 
                else if (res.error){
                    this.setState({ haschecked: true });
                } 
                else {
                  for (let i = 0; i < res.length; i++){
                        if (res[i].isLive) {
                            this.setState({ hasActivity: true ,haschecked: true , activityDate: res[i].activityDate , activityDay: res[i].activityDay });
                            this.setState({ haschecked: true });
                            console.log("the activity ", res[i].activityDate ,res[i].activityDay )
                        } 
                        if(i === res.length -1) {
                            this.setState({ haschecked: true });
                        }
                    }  
                }
                

            }).catch((err) => {
                console.log('Fetch Error :-S', err);
            });

        }
        else { 
        this.setState({ haschecked: true });
        console.log("no activity")}
    }



    render() {
       
        console.log("state is", this.state)
            if (!this.state.haschecked)
                return (
                    //loading logo
                    <div className="d-flex justify-content-center">
                        <div className="mt-5 spinner-border text-info" style={{ width: "7rem", height: "7rem" }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>

                )
                
    
            return (
                <div className="crembo-font">
                    <div>
                        <NavBar />
                        <Switch>
                        <Route exact path="/" render={() => {
                            return this.state.hasActivity ? (
                                <Redirect to={{ pathname: "/rides" }} />
                             ) : <NewActivity/>
                        }} />
                        <ActivityRoute state= {this.state} exact path="/rides" component={Rides} />
                        <ActivityRoute  state= {this.state}  exact path="/rides/ride-details/:id" component={RideDetails} />
                        <PrivateRoute exact path="/contact/:person(assistants|children|drivers)/details/:id" component={ChildDetails} />
                        <ActivityRoute  state= {this.state}  exact path="/rides/ride-details/:id/child-details/:id" component={ChildDetails} />
                        <ActivityRoute  state= {this.state}  exact path="/rides/ride-details/:id/add/:person(assistants|drivers)" component={ContactList} />
                        <PrivateRoute exact path="/contact/:person(children|assistants|drivers)" component={ContactList} />
                        <PrivateRoute component={notFound} />
                        </Switch>
                    </div>
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

    // Calling Auth.logout -> clears cache and returns back. hitting route login
    logOut = () => {
        Auth.logout();
        this.setState({ navHeader: false });
    }
    render() {
        let navHeader = this.state.navHeader === true ?  <Sidebar logout={this.logOut} /> : "";
        return (

            <header>
                <nav className="navbar navWithChanges navbar-dark fixed-top shadow primary ">
                    {navHeader}
                    <a className="navbar-brand" >כנפיים של קרמבו</a>
                </nav>
            </header>

        );
    }
}

export default  Crembo 
