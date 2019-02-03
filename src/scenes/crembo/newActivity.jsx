import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PrivateRoute from '../../App'
import './crembo.css';
import './newActivity.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Auth from '../../Auth/Auth';

//We also need to get the data from the activities table, and check if user.id and date already exists 
//if so >> then the page automaticly leads to the back/forth tables. 

class NewActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activityDate: null,
            activityTime: null,
            // value: new Date().toLocaleDateString()
        }
    }

    setActivity = (e) => {
        let x = e.target.value;
        if (e.target.id === "date1")
            this.setState({ activityDate: x })
        else
            this.setState({ activityTime: x })
    }
    addActivity = () => {
        console.log(this.state);
        let activity = this.state;
        let modelApi = 'api/activities'

        if (this.state.date && this.state.time) {
        Auth.authPost(modelApi, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
         body: JSON.stringify(activity) }).then(response => { return response.json() }).then(newrow => {
            console.log("the row that has been added is:", newrow);
            if (newrow.error) {
                    return(
                        <div>
                            "קיימת פעילות ביום זה! אנא בחר יום אחר"
                        </div>
                    );
            }

        });
        }
    }
   
    render() {
        return (
            <div class="container">
                <div class="row">תאריך הפעילות</div>
                <input class="row" type="date" value={this.state.activityDate ? this.state.activityDate : "2019-11-11"} name="date" id="date1" onChange={this.setActivity}></input>
                {/* <input class="row" type="date" value={this.state.activityDate ? this.state.activityDate : "2019-11-11"} name="date" id="date1" onChange={this.setActivity}></input> */}
                <div class="row">שעת הפעילות</div>
                <input class="row" type="time" name="time" id="time" onChange={this.setActivity}></input>
                <button class="row" onClick={this.addActivity} >הוסף</button>
            </div>
        );
    }
}




export default NewActivity;