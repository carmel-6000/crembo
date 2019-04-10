import React, { Component } from 'react';
import './childDetails.css';

class ChildDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            userMode: null,
        }
        props.activityDetails.onStart("פרטי איש קשר")

    }

    componentDidMount = () => { 
        // filters the rides by their direction
        this.setState({ userInfo: this.props.location.state.person });
        switch (this.props.match.params.person) {
            case "children":
                
                this.setState({ userMode: "child" })
                break;
            case "drivers":
                this.setState({ userMode: "driver" })
                break;
            case "assistants":
                this.setState({ userMode: "assistant" })
                break;
            default:
                console.log("Ride direction is not specify.")
        }

    }



    render() {
        
        return (
            <div>
                {this.state.userInfo && this.state.userMode ?
                    <div className="container infoTXT">
                        <div className="text-center childName">
                            פרטי {this.state.userMode === "child" ? "חניך" :
                                this.state.userMode === "driver" ? "נהג" :
                                    "מלווה"} <br />
                            {this.state.userInfo.firstName + " " + this.state.userInfo.lastName}
                            {this.state.userInfo.gender === "male" ? <i className="fas fa-mars fa-1x mr-1" style={{ color: "#007bff78" }} ></i> :
                                this.state.userInfo.gender === "female" ? <i className="fas fa-venus fa-1x mr-1" style={{ color: "#f59cc5bf" }}></i> :
                                    <i className="fas fa-genderless fa-1x mr-1" style={{ color: "grey" }} ></i>}
                            <div><img className="thumbnailIMG" alt="thumbnail" src={this.state.userInfo.thumbnail} /></div>
                        </div>
                        <div className="text-right">
                            {this.state.userInfo.addressForth &&
                            <div>
                                <div className="mt-3" > כתובת הלוך</div>
                                <div className="infoBox mt-1">{this.state.userInfo.addressForth}</div>
                            </div>}
                            {this.state.userInfo.addressBack &&
                            <div>
                                <div className="mt-3" > כתובת חזור</div>
                                <div className="infoBox mt-1">{this.state.userInfo.addressBack}</div>
                            </div>}
                            {this.state.userInfo.contactName &&
                            <div>
                                <div className="mr-4 mt-3" >איש קשר</div>
                                <div className="infoBox row mt-1"><span className="col-10">{this.state.userInfo.contactName}</span> <i className="fas fa-phone fa-1x col"></i> </div>
                            </div>}
                            {this.state.userInfo.contactName &&
                            <div>
                                <div className="mr-4 mt-3">טלפון</div>
                                <div className="infoBox row mt-1" ><span className="col-10">{this.state.userInfo.phone}</span> <i className="fas fa-phone fa-1x col"></i> </div>
                            </div>}
                            {this.state.userInfo.alertTime &&
                            <div>
                                <div className="mr-4 mt-3" >התראה לפני הגעה</div>
                                <div className="infoBox mt-1">{this.state.userInfo.alertTime}</div>
                            </div>}
                            {this.state.userInfo.requests &&
                            <div>
                                <div className="mr-4 mt-3" >הערות נוספות</div>
                                <div className="infoBox mt-1">
                                {this.state.userInfo.requests.map((val)=>
                                    <div>{val.request}</div>)}
                                </div>
                            </div>}
                        </div>
                    </div> :
                    <div class="d-flex justify-content-center">
                        <div class="mt-5 spinner-border text-info" style={{ width: "7rem", height: "7rem" }} role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>}
            </div>
        );
    }
}
export default ChildDetails;