import React, { Component } from 'react';
import './rideDetails.css';
import { Auth } from '../../Auth/Auth';
import { Link } from "react-router-dom";
import loading_dots from '../../img/loading_dots.svg';


class Rides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ridesForthJson: [],
            ridesBackJson: [],
            hasJoined: [],
            numberOfJoinedKids: null,
            rides: null
        }
        props.activityDetails.onStart('הסעות הסניף')
    }

    componentDidMount = () => {
        // filters the rides by their direction
        console.log("the props page rides", this.props.location)
        Auth.authFetch(`/api/activities/${this.props.activityDetails.activityId}/rides?filter={"include": [{"children": "requests"}, "drivers", "assistants"]}`).then(response => { return response.clone().json() }).then(res => {
            this.setState({ rides: res })
            let ridesBackJson = [];
            let ridesForthJson = [];
            for (let i = 0; i < res.length; i++) {
                switch (res[i].direction) {
                    case "back":
                        ridesBackJson.push(res[i])
                        break;
                    case "forth":
                        ridesForthJson.push(res[i])
                        break;
                    default:
                        console.log("Ride direction is not specify.")
                }
                this.setState({ ridesForthJson, ridesBackJson })
            }
        }).catch((err) => {
            console.log('Fetch Error :-S', err);
        });
        // takes the children that their status is hasJoined
        Auth.authFetch('/api/ChildrenRides').then(response => { return response.json() }).then(res => {
            let hasJoined = []
            for (let i = 0; i < res.length; i++) {
                if (res[i].hasJoined) {
                    hasJoined.push(res[i])
                }
            }
            this.setState({ hasJoined })
        }).catch((err) => {
            console.log('Fetch Error :-S', err);
        });
        var date = new Date(this.props.activityDetails.activityDate);
        var options = { weekday: 'long' };
        options.timeZone = 'UTC';
        let finalDay = date.toLocaleDateString('he-IS', options);
        this.setState({ activityDay: finalDay })
    }

    // counts how many children has joined to a spasific ride (by its id)
    hasJoinedToThisRideFunc = (idOfRide) => {
        let hasJoinesToThisRide = [];
        for (let i = 0; i < this.state.hasJoined.length; i++) {
            if (this.state.hasJoined[i].rideId === idOfRide) {
                hasJoinesToThisRide.push(this.state.hasJoined[i])
            }
        }
        return hasJoinesToThisRide.length + "/"
    }


    preventDefaultOfLink = (event) => {
        event.preventDefault()
    }
    //renders the rides cards
    mapOfRidesArray = (direction,boolean) => {
        let result = null;
        if(boolean === true){
             result = direction.filter( x => x.status !=="disabled")
        } else if (boolean === false){
             result = direction.filter( x => x.status ==="disabled")
        }
       if(result){
        let card = result.map((item, i) => (
            <div>
                {/* {boolean === false && item.status !=="ready" && */}
                <Link onClick={item.status === "disabled" && this.preventDefaultOfLink} key={i} to={{ pathname: `/rides/ride-details/${item.id}` }} >
                    <div className={`rideCard p-2 ${item.status === "disabled" && "disabledMode"}`}>
                        <div className="row" >
                            <div className="col">
                                <p className="text-right" key={item.title} style={{ fontSize: "4.5vw" }}> {item.title} </p>
                                <p className=" float-right d-inline-block" key={item.plannedTime} style={{ fontSize: "3.5vw" }}>  שעת יציאה: {item.plannedTime} </p>
                                <p className=" numOfChildren float-right d-inline-block " key={item.id} ><i className="fas fa-user-friends fa-1x" style={{ color: "grey" }}></i> {item.status === "driving" && this.hasJoinedToThisRideFunc(item.id)}{item.children.length} נוסעים </p>
                            </div>
                            <div className="col-3">
                                <div style={{ fontSize: "3.5vw" }} key={item.status}>{
                                    item.status === "editing" ? <div><i className="fas fa-edit fa-3x" style={{ color: "grey" }} /><br /> בתכנון</div> :
                                        item.status === "ready" ? <div><i className="fas fa-check fa-3x" style={{ color: "rgb(110, 195, 129)" }} /><br /> מוכן</div> :
                                            item.status === "driving" ? <div><i className="fas fa-car-alt fa-3x" style={{ color: "#ffc107" }} /><br /> בנסיעה</div> :
                                                item.status === "finished" ? <div><i className="fab fa-font-awesome-flag fa-3x" style={{ color: "#66c3e9" }} /><br /> הורד חניכים</div> :
                                                    item.status === "disabled" ? <div><i className="far fa-calendar-check fa-3x" style={{ color: "grey" }} /><br /> הסתיימה</div> :
                                                        null
                                } </div>
                            </div>
                        </div>
                    </div>
                </Link>
                {/* } */}
            </div>
        ))
        return card;
        }
    }
    render() {
        console.log("state", this.props)
        return (
            <div>

                <div className="row top">
                    <div className="col basicDataOnActivity"><p>{this.props.activityDetails.activityDay}</p></div>
                    <div className="col basicDataOnActivity"><p>{this.props.activityDetails.activityDate}</p></div>
                    <div className="col basicDataOnActivity"><p>{this.props.activityDetails.branchName}</p></div>
                </div>
                <div className="main-container">
                    <ul className="nav rideNav topnav nav-pills mb-3 nav-fill" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active btn-block bnf-font" id="pills-forth-tab" data-toggle="pill" href="#pills-forth" role="tab" aria-controls="pills-forth" aria-selected="true">נסיעות הלוך</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link bnf-font" id="pills-back-tab" data-toggle="pill" href="#pills-back" role="tab" aria-controls="pills-back" aria-selected="false">נסיעות חזור</a>
                        </li>
                    </ul>
                    <div className="tab-content content-of-selected-tab" id="pills-tabContent">

                        <div className="tab-pane fade show active" id="pills-forth" role="tabpanel" aria-labelledby="pills-forth-tab">
                            <div>
                                {this.state.rides ? this.mapOfRidesArray(this.state.ridesForthJson , true) : <img src={loading_dots} alt="loading.io/spinner/"></img>}
                            <div className="classOfTheDivOfDisabled">
                               div number 2 {this.state.rides && this.mapOfRidesArray(this.state.ridesForthJson , false)}
                            </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-back" role="tabpanel" aria-labelledby="pills-back-tab">
                            {this.state.rides ? this.mapOfRidesArray(this.state.ridesBackJson, true) : <img src={loading_dots} alt="loading.io/spinner/"></img>}
                        <div className="classOfTheDivOfDisabled">
                               div number 2 {this.state.rides && this.mapOfRidesArray(this.state.ridesBackJson , false)}
                        </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default Rides;
