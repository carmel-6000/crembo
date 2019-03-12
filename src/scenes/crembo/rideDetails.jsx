import React, { Component } from 'react';
import './rides.css';
import Auth from '../../Auth/Auth';
import logoImage from '../../img/carmel.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class RideDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            assistantsItem: null,
            driversItem: null
        }

    }
    componentDidMount() {
        this.setState({ assistantsItem: this.props.location.state.item.assistants });
        this.setState({ driversItem: this.props.location.state.item.drivers });
    }
    componentWillMount() {
        this.setState({ item: this.props.location.state.item });

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
                console.log("error.")
        }
    }
    //renders the children/assistants list
    mapOfchildOrAssistant = (val) => {
        if (val === "children") {
            let card = this.state.item.children.map((value, i) => (
                <div className="childrenCard" key={i}>
                    <div className="row ">
                        <div className="newPadding col-2"><img className="thumbnailIMG" src={value.thumbnail} /></div>
                        <div className="newPadding font-responsive col text-right">{value.firstName} {value.lastName}</div>
                        <div className="newPadding col-1 text-right">
                            <button className="dropdownsButtons" type="button" id="dropdownInfoButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i style={{ color: "#c12735" }} class="font-responsive fas fa-exclamation "></i>
                            </button>
                            <div className="dropdown-menu requestsDropdown rounded" aria-labelledby="dropdownInfoButton">
                                <ul type="square" className="mb-0">
                                    {value.requests.map((val) => <li className="text-right" key={i}>{val.request} </li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="newPadding col-1 text-right">
                            <div className="dropdown">
                                <button className="dropdownsButtons" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className=" font-responsive fas fa-ellipsis-v "></i>
                                </button>
                                <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                    <Link className="dropdown-item text-right" to={{ pathname: "/rides/ride-details/" + this.state.item.id + "/child-details/" + value.id, state: { person: value, contactApi: "children" } }}>מידע נוסף</Link>
                                    <a className="dropdown-item text-right" href="#">הסר מהסעה זו ביום זה</a>
                                    <a className="dropdown-item text-right" href="#">העבר להסעה אחרת</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>))
            return card;
        } else if (val === "drivers") {
            let driver = this.props.location.state.item.drivers;
            let driverCard =
                <div className="childrenCard">
                    <div className="row ">
                        {driver.thumbnail && <div className="newPadding col-2"><img className="thumbnailIMG" src={driver.thumbnail} /></div>}
                        <div className="newPadding font-responsive col text-right">{driver.firstName} {driver.lastName}</div>
                        <div className="newPadding col-1 text-right">
                            <i style={{ color: "#c12735" }} className="font-responsive fas fa-exclamation "></i>
                        </div>
                        <div className="newPadding col-1 text-right">
                            <div className="dropdown">
                                <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className=" font-responsive fas fa-ellipsis-v "></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">


                                    <a className="dropdown-item text-right" href="#">הסר מהסעה זו ביום זה</a>
                                    <a className="dropdown-item text-right" href="#">העבר להסעה אחרת</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            return driverCard;
        }
    }

    render() {

        return (

            <div>
                {console.log("prop", this.props)}
                <div className="row ">
                    <div className="col basicDataOnActivity"><p>{this.props.location.state.activityInfo.activityDay}</p></div>
                    <div className="col basicDataOnActivity"><p>{this.props.location.state.activityInfo.activityDate}</p></div>
                    <div className="col basicDataOnActivity"><p>סניף עמק רפאים</p></div>
                </div>
                <input className="row" type="time" value={this.state.item.plannedTime} name="planned_time" id="planned_time" onChange={this.changeItemDetails}></input>
                <input className="row" type="text" value={this.state.item.title} name="title" id="title" onChange={this.changeItemDetails}></input>

                <div className="main-container">
                    <ul className="nav topnav nav-pills mb-3 nav-fill" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active btn-block bnf-font" id="pills-assistants-tab" data-toggle="pill" href="#pills-assistants" role="tab" aria-controls="pills-assistants" aria-selected="true">אנשי קשר</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link bnf-font" id="pills-children-tab" data-toggle="pill" href="#pills-children" role="tab" aria-controls="pills-children" aria-selected="false">נוסעים</a>
                        </li>
                    </ul>
                    <div className="tab-content content-of-selected-tab" id="pills-tabContent">

                        <div className="tab-pane fade show active" id="pills-assistants" role="tabpanel" aria-labelledby="pills-assistants-tab">
                            <div>
                                <Link to={{ pathname: '/rides/ride-details/' + this.props.match.params.id + '/add/assistants', state: { chooseMode: true } }} >
                                    <div className="d-inline-block shadow p-3 mb-5 bg-white rounded"> + הוסף מלווה </div>
                                </Link>
                                <br />


                                <Link to={{ pathname: '/rides/ride-details/' + this.props.match.params.id + '/add/drivers', state: { chooseMode: true } }} >
                                    <div className="d-inline-block shadow p-3 mb-5 bg-white rounded"> + הוסף נהג </div>
                                </Link>

                            </div>
                        {this.props.location.state.item.drivers&&<div>{this.mapOfchildOrAssistant("drivers")}</div>}
                        </div>
                        <div className="tab-pane fade " id="pills-children" role="tabpanel" aria-labelledby="pills-children-tab">
                        {this.props.location.state.item.children&&<div className="container">{this.mapOfchildOrAssistant("children")}</div>}
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}


export default RideDetails;