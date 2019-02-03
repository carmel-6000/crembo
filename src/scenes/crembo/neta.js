import React, { Component } from 'react';
import './neta.css';
import Auth from '../../Auth/Auth';



class Neta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ridesForthJson: [],
            ridesBackJson: [],
        }
    }
    componentDidMount = () => {
        Auth.authFetch('api/rides').then(response => { return response.json() }).then(res => {
            console.log(res)
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
    }

    mapOfRidesArray = (direction) => {
        let card = direction.map((item) => (
            <div class="rideCard">
                <p> {item.branch} </p>
                <p> {item.direction} </p>
                <p> {item.title} </p>
            </div>
        ))
        return card;
    }
    render() {
        return (
            <div className="main-container">
                <ul class="nav topnav nav-pills mb-3 nav-fill" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link  btn-block" id="pills-forth-tab" data-toggle="pill" href="#pills-forth" role="tab" aria-controls="pills-forth" aria-selected="true">נסיעות הלוך</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-back-tab" data-toggle="pill" href="#pills-back" role="tab" aria-controls="pills-back" aria-selected="false">נסיעות חזור</a>
                    </li>
                </ul>
                <div class="tab-content content-of-selected-tab" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-forth" role="tabpanel" aria-labelledby="pills-forth-tab">
                        {this.mapOfRidesArray(this.state.ridesForthJson)}
                    </div>
                    <div class="tab-pane fade" id="pills-back" role="tabpanel" aria-labelledby="pills-back-tab">
                        {this.mapOfRidesArray(this.state.ridesBackJson)}
                    </div>
                </div>

            </div>

        );
    }
}

export default Neta;
