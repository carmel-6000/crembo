import React, { Component } from 'react';
import './rides.css';
import Auth from '../../Auth/Auth';
import logoImage from '../../img/carmel.png';

class RideDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
        }
    }

    componentWillMount() {
        this.setState({ item: this.props.location.state.item })
    }
    changeItemDetails = (e) => {
        console.log(e)
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

    mapOfchildOrAssistant = (val) => {
        if (val === "children") {
            let card = this.state.item.children.map((value) => (
                <div className="childrenCard">
                    <div className="row ">
                        <div className="newPadding col-2"><img className="thumbnailIMG" src={value.thumbnail} /></div>
                        <div className="newPadding font-responsive col text-right">{value.firstName} {value.lastName}</div>
                        <div className="newPadding col-1 text-right">
                            <i style={{ color: "#c12735" }} class="font-responsive fas fa-exclamation "></i>
                        </div>
                        <div className="newPadding col-1 text-right">
                            <div className="dropdown">
                                <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className=" font-responsive fas fa-ellipsis-v "></i>
                                </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item text-right" href="#">מידע נוסף</a>
                                <a className="dropdown-item text-right" href="#">הסר מהסעה זו ביום זה</a>
                                <a className="dropdown-item text-right" href="#">העבר להסעה אחרת</a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>))
            return card;
        } else if (val === "assistants") {
            let assist = <div>
                <div class="d-inline-block shadow p-3 mb-5 bg-white rounded">
                    + הוסף מלווה ראשון
                          </div> <br />
                <div class="d-inline-block shadow p-3 mb-5 bg-white rounded">
                    + הוסף מלווה שני
                          </div>

            </div>
            return assist;
        }
    }

    render() {
        console.log(this.state)

        return (

            <div>
                <div className="row ">
                    <div className="col basicDataOnActivity"><p>{this.props.location.state.activityDay}</p></div>
                    <div className="col basicDataOnActivity"><p>{this.props.location.state.activityDate}</p></div>
                    <div className="col basicDataOnActivity"><p>סניף עמק רפאים</p></div>
                </div>
                <input className="row" type="time" value={this.state.item.plannedTime} name="planned_time" id="planned_time" onChange={this.changeItemDetails}></input>
                <input className="row" type="text" value={this.state.item.title} name="title" id="title" onChange={this.changeItemDetails}></input>

                <div className="main-container">
                    <ul className="nav topnav nav-pills mb-3 nav-fill" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active btn-block bnf-font" id="pills-assistants-tab" data-toggle="pill" href="#pills-assistants" role="tab" aria-controls="pills-assistants" aria-selected="true">מלווים</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link bnf-font" id="pills-children-tab" data-toggle="pill" href="#pills-children" role="tab" aria-controls="pills-children" aria-selected="false">נוסעים</a>
                        </li>
                    </ul>
                    <div className="tab-content content-of-selected-tab" id="pills-tabContent">

                        <div className="tab-pane fade show active" id="pills-assistants" role="tabpanel" aria-labelledby="pills-assistants-tab">
                            {this.mapOfchildOrAssistant("assistants")}
                        </div>
                        <div className="tab-pane fade " id="pills-children" role="tabpanel" aria-labelledby="pills-children-tab">
                            <div className="container">{this.mapOfchildOrAssistant("children")}</div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}


export default RideDetails;



