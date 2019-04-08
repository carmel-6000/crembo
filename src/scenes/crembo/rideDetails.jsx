import React, { Component } from 'react';
import './rides.css';
import Auth from '../../Auth/Auth';
import { Link } from "react-router-dom";


class RideDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null
        }
        props.activityDetails.onStart('פרטי הסעה')
    }

    componentDidMount() {
        Auth.authFetch(`/api/rides/${this.props.match.params.id}?filter={"include": [{"children": "requests"}, {"drivers": "requests"}, {"assistants": "requests"}, "branches"]}`).then(response => { return response.clone().json() }).then(res => {
            this.setState({ item: res })
        })


        //m
        // if (this.props.location.state) {
        //     this.setState({ item: this.props.location.state.item });
        // } else {
        //     Auth.authFetch(`/ /rides/${this.props.match.params.id}?filter={"include": [{"children": "requests"}, "drivers", "assistants"]}`).then(response => { return response.clone().json() }).then(res => {
        //         this.setState({ item: res })
        //     })
        // }
    }

    changeItemDetails = (e) => {
        let x = e.target.value;
        let item = { ...this.state.item };
        switch (e.target.id) {
            case "planned_time":
                item.plannedTime = x;
                this.setState({ item })
                break;
            case "title":
                item.title = x;
                this.setState({ item })
                break;
            default:
                console.log("error in changeItemDetails().")
        }
    }

    chooseAssis = (num) => {
        let assis = null;
        switch (num) {
            case 0:
                assis = <Link to={{ pathname: '/rides/ride-details/' + this.props.match.params.id + '/add/assistants', state: { chooseMode: true } }} >
                    <div className="d-inline-block shadow bold p-2 mb-2  bg-white rounded pr-5 text-right staffCard"> + הוסף מלווה </div>
                </Link>
                break;
            case 1:
                assis = <Link to={{ pathname: '/rides/ride-details/' + this.props.match.params.id + '/add/assistants', state: { chooseMode: true } }} >
                    <div className="d-inline-block shadow bold p-2 mb-2  bg-white rounded pr-5 text-right staffCard">+ הוסף מלווה שני</div>
                </Link>
                break;
            default:
                console.log("more than 2 assistans");
        }
        return assis;
    }


    //renders the children/assistants list
    mapOfstaff = (val) => {
        let card = null;
        switch (val) {
            case "children":

                card = this.state.item.children.map((value, i) => (
                    <div className="childrenCard p-2" key={i}>
                        <div className="row ">
                            {value.thumbnail ? <div className="newPadding col-2"><img className="thumbnailIMG" src={value.thumbnail} alt="thumbnail" /></div> : <div className="newPadding col-2"><i className="fas fa-user" /></div>}
                            <div className="newPadding font-responsive col text-right">{value.firstName} {value.lastName}</div>
                            <div className="newPadding col-1 text-right">
                                {value.request && <div>
                                    <button className="dropdownsButtons" type="button" id="dropdownInfoButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i style={{ color: "#c12735" }} class="font-responsive fas fa-exclamation "></i>
                                    </button>
                                    <div className="dropdown-menu requestsDropdown rounded" aria-labelledby="dropdownInfoButton">
                                        <ul type="square" className="mb-0">
                                            {value.requests.map((val) => <li className="text-right" key={i}>{val.request} </li>)}
                                        </ul>
                                    </div>
                                </div>}
                            </div>
                            <div className="newPadding col-1 text-right">
                                <div className="dropdown">
                                    <button className="dropdownsButtons" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className=" font-responsive fas fa-ellipsis-v "></i>
                                    </button>
                                    <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                        <Link className="dropdown-item text-right" to={{ pathname: "/contact/children/details/" + value.id, state: { person: value, contactApi: "children" } }}>מידע נוסף</Link>
                                        <a className="dropdown-item text-right" >הסר מהסעה זו ביום זה</a>
                                        <a className="dropdown-item text-right" >העבר להסעה אחרת</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>))

                break;

            case "drivers":
                let driver = this.state.item.drivers;
                card =
                    <div className="d-inline-block shadow p-2 mb-2  bg-white rounded pr-5 text-right driverCard">
                        <div className="cardTittle">נהג</div>
                        <div className="name">{driver.firstName} {driver.lastName} <i class="fas fa-phone" /> </div>
                    </div>


                break;
            case "assistants":

                card = this.state.item.assistants.map((value, i) => (
                    <div className="d-inline-block shadow p-2 mb-2  bg-white rounded pr-5 text-right driverCard">
                        <div className="cardTittle">מלווה</div>
                        <div className="name">{value.firstName} {value.lastName} <i class="fas fa-phone" /> </div>
                    </div>))

                break;
            default:
                return console.log("error in mapOfstaff()")

        }
        return card;
    }

    render() {
        console.log(this.state)
        return (
            <div>
                {this.state.item &&
                    <div>
                        <div className="top">
                            <input className="row title" type="text" value={this.state.item.title} name="title" id="title" onChange={this.changeItemDetails}></input>
                            <div className="row unpadding">
                                <div className="col basicDataOnActivity">{this.props.activityDetails.activityDay}</div>
                                <div className="col basicDataOnActivity">{this.props.activityDetails.activityDate}</div>
                                <div className="col basicDataOnActivity">סניף עמק רפאים</div>
                            </div>
                            <div className="timeout">שעת יציאה<input className="timein" type="time" value={this.state.item.plannedTime} name="planned_time" id="planned_time" onChange={this.changeItemDetails}></input></div>
                            {this.state.item.drivers && <div className="driveri">הנהג: {this.state.item.drivers.firstName} {this.state.item.drivers.lastName}</div>}
                        </div>




                        <div>
                            {this.state.item.drivers && <div>{this.mapOfstaff("drivers")}</div>}
                            {this.state.item.assistants && <div>{this.mapOfstaff("assistants")}</div>}

                            {!this.state.item.drivers && <Link to={{ pathname: '/rides/ride-details/' + this.props.match.params.id + '/add/drivers', state: { chooseMode: true } }} >
                                <div className="d-inline-block bold shadow p-2 mb-2  bg-white rounded pr-5 text-right staffCard"> + הוסף נהג </div>
                            </Link>}

                            {this.state.item.assistants && <div>{this.chooseAssis(this.state.item.assistants.length)}</div>}
                            
                            {this.state.item.children &&<Link to={{ pathname: '/rides/ride-details/' + this.props.match.params.id + '/map',  state: { children: this.state.item.children, assistants:this.state.item.assistants, branches:this.state.item.branches}  }} >
                            <div className="d-inline-block bold shadow p-2 mb-2  bg-white rounded text-center staffCard">מסלול ונוסעים</div>
                            </Link>}
                        </div>




                        {/* {this.state.item.children && <div className="container">{this.mapOfstaff("children")}</div>} */}



                    </div>}
            </div>

        );
    }
}



export default RideDetails;