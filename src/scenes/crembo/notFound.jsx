import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import './crembo.css';
import './notFound.css';
import vanGif from '../../img/404.gif';
import Auth from '../../Auth/Auth';

class NotFound extends Component {



    render() {
        console.log(Auth.isAuthenticated())
        return(
        <div className="body404">
        <div dir="ltr" className="bold margin3">404 not found</div>
        <div  className="margin3">העמוד אליו הגעת לא נמצא</div>
        <img  src={vanGif} className="vanGif margin3"></img>
        <div className="margin3">לפחות זה רק עמוד ולא נוסע...</div>
        <button className=" btn btn-info btn-lg margin3" onClick={this.props.history.goBack}>חזרה לעמוד קודם</button>
        </div>
        );
    }
}




export default NotFound;