import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Auth } from '../../Auth/Auth';

class Rides extends Component{
    constructor(props){
        super(props);
        this.state = {
           phone: this.props.location.state.phone, 
           myRides: null,
           watched: false
        }
    }
    componentDidMount(){
        // gettingRidesData = () =>{
            Auth.authFetch(`/api/assistants/${this.state.phone}/login`).then(response => { return response.json() }).then(res => {
                console.log("res", res);
                this.setState({ myRides: res })
            }).catch((err) => {
                console.log('Fetch Error :-S', err);
            });
        // }
    }

    displayRides = (myRides) => {
        console.log('rides', myRides);
        return ( myRides[0].rides.map((ride)=>{
            return(<div>
                <Link to={`/assistant/${ride.id}/ride-details`} >
                <button>
                {ride.title}
                </button>
                </Link>
            </div>)
        }))
    }
    


    render() {
        return(<div>
            {console.log("in rides", this.state.myRides)}
            {this.state.myRides && this.displayRides(this.state.myRides)}
        </div>)
    }

    }



export default Rides;