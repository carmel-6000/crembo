import React, { Component } from 'react';
import notFound from '../common/notFound';
import AssistantRide from './assistantRide';
import AssistantSide from '../assistants/home';
import { BrowserRouter as Switch } from "react-router-dom";
import ChildrenList from './currentChildren';
import ChildDetails from '../crembo/childDetails';
import PrivateRoute from '../common/privateRoute';



class Assistant extends Component {

    render() {
        return (
        <div className="crembo-font">
        <div>
            <Switch>
                <PrivateRoute exact path="/assistant" component={AssistantSide} />
                <PrivateRoute exact path="/assistant/:rideId/ride-details" component={AssistantRide} />
                <PrivateRoute exact path="/assistant/:rideId/ride-details/:person" component={ChildrenList} />
                <PrivateRoute exact path="/assistant/:person/details/:id" component={ChildDetails} />
                <PrivateRoute exact path="/assistant/start" component={AssistantRide}/>
                <PrivateRoute component={notFound} />
            </Switch>
        </div>
    </div>
        );
    }
}


export default Assistant;