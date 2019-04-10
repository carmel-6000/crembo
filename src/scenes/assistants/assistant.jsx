import React, { Component } from 'react';
import notFound from '../common/notFound';
import AssistantRide from './assistantRide';
import AssistantSide from '../assistants/home';
import { Switch } from "react-router-dom";
import ChildrenList from './currentChildren';
import ChildDetails from '../crembo/childDetails';
import PrivateRoute from '../common/privateRoute';
import NavBar from '../crembo/navbar';


class Assistant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null
        }
    }

    onStart = (title ='') =>{
        this.setState({title});
    }

    render() {
        return (
        <div className="crembo-font">
        <div>
            <NavBar  title={this.state.title}/>
            <Switch>
                <PrivateRoute state={{onStart: this.onStart}} exact path="/assistant" component={AssistantSide} />
                <PrivateRoute state={{onStart: this.onStart}}  exact path="/assistant/:rideId/ride-details" component={AssistantRide} />
                <PrivateRoute state={{onStart: this.onStart}} exact path="/assistant/:rideId/ride-details/:person" component={ChildrenList} />
                <PrivateRoute state={{onStart: this.onStart}}  exact path="/assistant/:person/details/:id" component={ChildDetails} />
                <PrivateRoute state={{onStart: this.onStart}}  exact path="/assistant/start" component={AssistantRide}/>
                <PrivateRoute component={notFound} />
            </Switch>
        </div>
    </div>
        );
    }
}


export default Assistant;