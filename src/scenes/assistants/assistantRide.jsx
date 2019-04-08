import React, { Component } from 'react';
import Auth from '../../Auth/Auth';
import { Link } from "react-router-dom";



class AssistantRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        console.log("in assistant rides");
        Auth.authFetch('/api/rides/1?filter={"include": ["drivers", "children", "activities"]}').then(response => { return response.json() }).then(res => {
            console.log("resiuiui", res);
            this.setState({ ride: res })
        }).catch((err) => {
            console.log('Fetch Error :-S', err);
        });
    }




    render() {
        let ride = this.state.ride;
            return (
                <div>
                    {ride?
                  <div> 
                      <h2>{ride.activities.activityDate}</h2>
                      <h1>{ride.title}</h1>
                      <h1>{ride.plannedTime}</h1>
                     <Link to={{ pathname: "/assistant/children", state: this.state }}> <button> צפייה בפרטי ההסעה</button> </Link>
                     <Link to={{ pathname: "/assistant/children", state: this.state }}> <button> התחל נסיעה</button> </Link>
                  </div>:''}
                </div >
        );
    
    }
}

//this.props.location.state.?? console log this.props 
export default AssistantRide;