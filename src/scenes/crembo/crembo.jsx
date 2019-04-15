import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import {Auth} from '../../Auth/Auth';
import NewActivity from './newActivity';
import ContactList from './contactlist';
import Rides from './rides'
import RideDetails from './rideDetails';
import ChildDetails from './childDetails';
import notFound from './../common/notFound';
import MapDirections from './mapDirections';
import './crembo.css';
import NavBar from './navbar';
import PrivateRoute from '../common/privateRoute';
import Drag from './drag';

const ActivityRoute = ({ component: Comp, state, ...rest }) => (
    <Route {...rest} render={(props) => (
        state.hasActivity === false ? <Redirect to='/' /> :
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
            activityId: null,
            title: null,
            setStateOfHasActivity: this.setStateOfHasActivity
        }
    }

    componentWillMount() {
        //gets the manager's live activity details by his id from local storage
        let branchId = localStorage.getItem('branchId')
        if(branchId){
            Auth.authFetch(`/api/branches/${branchId}`).then(response => { return response.json() }).then(res => {
                this.setState({branchName : res.city})
            })
        }
        let managerId = localStorage.getItem('userId');
        if (managerId) {
            Auth.authFetch(`/api/activities?filter={"where": {"managerId": ${managerId} , "isLive": true}}`).then(response => { return response.json() }).then(res => {
                console.log("רקד" , res)
                if (res.length === 0) {
                    this.setState({ haschecked: true });
                }
                else if (res.error) {
                    this.setState({ haschecked: true });
                }
                else {
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].isLive) {
                            this.setState({ hasActivity: true, haschecked: true, activityDate: res[i].activityDate, activityDay: res[i].activityDay, activityId: res[i].id });
                            this.setState({ haschecked: true });

                        }
                        if (i === res.length - 1) {
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
            console.log("no activity")
        }
    }

    setStateOfHasActivity = (activity ={}) => {
        this.setState({
            hasActivity: true,
            activityDate: activity.activityDate,
            activityDay: activity.activityDate,
            activityId: activity.id
        })
    }

    onStart = (title = '') =>{
        this.setState({title});
    }

    render() {
        if (!this.state.haschecked)
            return (
                //loading logo
                <div className="d-flex justify-content-center">
                    <div className="mt-5 spinner-border text-info" style={{ width: "7rem", height: "7rem" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

            )
        const extraState = {...this.state, onStart: this.onStart};

        return (

            <div className="crembo-font">
                    <NavBar title={this.state.title} />
                    <Switch>
                        <Route exact path="/" render={() => {
                            return this.state.hasActivity ? (
                                <Redirect to={{ pathname: "/rides" }} />
                            ) : <PrivateRoute  state={{...extraState}} setStateOfHasActivity={this.setStateOfHasActivity} component={NewActivity} />

                        }} />
                        <ActivityRoute state={{...extraState}} exact path="/rides" component={Rides} />
                        <ActivityRoute state={{...extraState}}  exact path="/rides/ride-details/:id" component={RideDetails} />
                        <PrivateRoute state={{onStart: this.onStart}} exact path="/contact/:person(assistants|children|drivers)/details/:id" component={ChildDetails} />
                        <ActivityRoute  state={{...extraState}} exact path="/rides/ride-details/:id/child-details/:id" component={ChildDetails} />
                        <ActivityRoute  state={{...extraState}} exact path="/rides/ride-details/:id/add/:person(assistants|drivers)" component={ContactList} />
                        <PrivateRoute state={{onStart: this.onStart}} exact path="/contact/:person(children|assistants|drivers)" component={ContactList} />
                        <ActivityRoute  state={{...extraState}} exact path="/rides/ride-details/:id/map" component={MapDirections} />
                        <PrivateRoute state={{onStart: this.onStart}} exact path="/drag" component={Drag} />

                        <PrivateRoute state={{onStart: this.onStart}} component={notFound} />
                    </Switch>
            </div>
        );
    }
}



export default Crembo 
