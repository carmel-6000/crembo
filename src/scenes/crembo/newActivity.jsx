import React, { Component } from 'react';
import Datetime from 'react-datetime';
import './crembo.css';
import './newActivity.css';
import { Link } from "react-router-dom";
import { Auth } from '../../Auth/Auth';
import TimeField from 'react-simple-timefield';
// import DateTimeEditor from '../../Grid/editors/DateTimeEditor'

class NewActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activityDate: "",
            activityDay: "",
            activityTime: "",
            isLive: true,
            managerId: localStorage.getItem('userId'),
            branch: localStorage.getItem('branchId')
            
        }
        console.log(props)
        props.activityDetails.onStart('יצירת פעילות')

    }
   


    setActivity = (e) => {
        let x = e.target.value;
        if (e.target.id === "date1") {
            this.setState({ activityDate: x })
            var date = new Date(x);
            var options = { weekday: 'long' };
            options.timeZone = 'UTC';
            date.getDate()
            let finalDay = date.toLocaleDateString('he-IS', options);
            this.setState({ activityDay: finalDay });
        }
        else {
         
            this.setState({ activityTime: x });
        }
    }

    onTimeChange = (activityTime) => {
        this.setState({ activityTime });
    }

    addActivity = () => {
        let modelApi = 'api/activities';
        if (this.state.activityDate && this.state.activityTime && this.state.activityDay) {
            Auth.authPost(modelApi, {
                method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
            }).then(response => { return response.json() }).then(activity => {
                console.log("the row that has been added", activity)
                if (activity.error) {
                    alert("קיימת כבר פעילות ביום זה!");
                    return;
                }

                Auth.authPost('/api/rides/structure', {
                    method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({info:{ activity: activity.id , branch:this.state.branch }})
                }).then(response => { return response.json() }).then(newrides => {
                    console.log("the rides that has been added", newrides)
                    this.props.activityDetails.setStateOfHasActivity(activity)
                    if (newrides.error) {
                        return (
                            <div>יש בעיה עם הסעות הסניף</div>
                        );
                    }

                })
            });
        }
       
    }

    onDateChange(date) {
        console.log(date)
    }
    
    render() {
        console.log("state load ", this.state)
        return (
            <div className="middler">
                <div className="  mx-auto align-middle">
                    <div className="row " id="activityText">תאריך הפעילות</div>

                    <div className="row activityCard">
                    <input type="date" value={this.state.activityDate} name="date" min="2019-01-02" id="date1" onChange={this.setActivity}></input>
                    {/* <DateTimeEditor column={{onCellChange:this.onDateChange, autoOpen: false, key:'date'}} value={this.state.activityDate} onChange={this.setActivity}/> */}
                        <i className="calendar_alt far fa-calendar-alt"></i>
                    </div>


                    <div className="row" id="activityText">שעת הפעילות</div>

                    <div className="row activityCard">

                        <input className="d-sm-inline-block d-md-none" type="time" name="time" id="time" onChange={this.setActivity}></input>

                        <TimeField
                            value={this.state.activityTime}
                            input={<input className="inputtime d-none d-md-inline-block " type="text" name="time" id="time" />}
                            onChange={this.onTimeChange}
                        />
                        <i className="calendar_alt far fa-clock" />

                    </div>

                    <br />
                    <div className="addbottom" >
                        <Link to={{pathname : "/rides"}} state={this.state}>
                            <button onClick={this.addActivity} disabled={this.state.activityDate && this.state.activityTime ? false : true} className=" btn btn-info btn-lg"  >{this.state.isloading ? "אנא המתן" : "הוסף"}</button>
                        </Link>
                    </div>
                </div >
            </div>
        );
    }
}




export default NewActivity;