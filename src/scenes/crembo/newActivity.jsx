import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PrivateRoute from '../../App'
import './crembo.css';
import './newActivity.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Auth from '../../Auth/Auth';
import TimeField from 'react-simple-timefield';

//We also need to get the data from the activities table, and check if user.id and date already exists 
//if so >> then the page automaticly leads to the back/forth tables. 

class NewActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activityDate: null,
            activityDay: null,
            activityTime: 0
        }
    }
    setActivity = (e) => {
        let x = e.target.value;
        if (e.target.id === "date1") {
            this.setState({ activityDate: x })
            var date = new Date(x);
            var options = { weekday: 'long' };
            options.timeZone = 'UTC';
            let finalDay = date.toLocaleDateString('he-IS', options);
            this.setState({ activityDay: finalDay });
            // let activityTime=this.state.hour+":"+this.state.minute;
            // this.setState({ activityTime: activityTime });
        }
        else{
            this.setState({ activityTime: x });
        }
    }

    onTimeChange = (activityTime) => {
        this.setState({ activityTime });
    }

    addActivity = () => {
        console.log("the activity that's gonna be posted is", this.state)
        let modelApi = 'api/activities'

        if (this.state.activityDate && this.state.activityTime && this.state.activityDay) {
            Auth.authPost(modelApi, {
                method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
            }).then(response => { return response.json() }).then(newrow => {
                console.log("the row that has been added is:", newrow);
                if (newrow.error) {
                    return (
                        <div>קיימת פעילות ביום זה! אנא בחר יום אחר</div>
                    );
                }

            });
        }
    }

    render() {
        console.log("activity state",this.state);    
        return (
<div class="middler">
            <div className="  mx-auto align-middle">
                <div className="row " id="activityText">תאריך הפעילות</div>

                <div className="row" className="activityCard">

                    <input type="date" value={this.state.activityDate} name="date" min="2019-01-02" id="date1" onChange={this.setActivity}></input>
                    <i className="calendar_alt far fa-calendar-alt"></i>
                </div>


                <div className="row" id="activityText">שעת הפעילות</div>

                <div className="row" className="activityCard">

                    <input className="d-sm-inline-block d-md-none" type="time" name="time" id="time" onChange={this.setActivity}></input>

                    <TimeField
                        value={this.state.activityTime}
                        input={<input className="inputtime d-none d-md-inline-block " type="text" name="time" id="time" />}
                        onChange={this.onTimeChange}
                    />
                    <i class="calendar_alt far fa-clock"></i>

                </div>
                
                <br/>
                <div className="addbottom">
                    <Link to={{ pathname: "/rides", state: this.state }}>
                        <button  disabled={this.state.activityDate  && this.state.activityTime ? false : true} className=" btn btn-info btn-lg" onClick={this.addActivity} >הוסף</button>
                    </Link>
                </div>
            </div >
            </div>
        );
    }
}




export default NewActivity;