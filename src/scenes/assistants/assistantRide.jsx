import React, { Component } from 'react';
import { Auth } from '../../Auth/Auth';
import { Link } from "react-router-dom";



class AssistantRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watched: this.props.location.state.watched,
        }
    }

    componentDidMount() {
        console.log("in assistant rides");
        Auth.authFetch('/api/rides/3682?filter={"include": ["drivers",{"children": "requests"}, "activities"]}').then(response => { return response.json() }).then(res => {
            console.log("resiuiui", res);
            this.setState({ ride: res })
        }).catch((err) => {
            console.log('Fetch Error :-S', err);
        });
    }




    render() {
        let ride = this.state.ride;
        console.log('props', this.props.location.state.watched, 'state', this.state.watched)
            return (
                <div>
                    {ride?
                  <div> 
                      <h2>{ride.activities.activityDate}</h2>
                      <h1>{ride.title}</h1>
                      <h1>{ride.plannedTime}</h1>
                      {this.state.watched? 
                      <Link to={{ pathname: "/assistant"}}> <button> התחל נסיעה</button> </Link> :
                      <Link to={{ pathname: "/assistant/3682/ride-details/children", state:{ride:this.state.ride } }}> <button> צפייה בפרטי ההסעה</button> </Link>
                     }
                    
                  </div>:''}
                </div >
        );
    
    }
}

export default AssistantRide;