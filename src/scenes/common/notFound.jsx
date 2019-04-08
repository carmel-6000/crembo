import React, { Component } from 'react';
import './../crembo/crembo.css'
import './../crembo/crembo.css';
import './notFound.css';
import vanGif from '../../img/404.gif';

class NotFound extends Component {
    constructor(props) {
        super(props)
        props.activityDetails.onStart('העמוד לא נמצא')
    
      }

    render() {
        return(
        <div className="body404">
        <div dir="ltr" className="bold margin3">404 not found</div>
        <div  className="margin3">העמוד אליו הגעת לא נמצא</div>
        <img  src={vanGif} className="vanGif margin3" alt="van driving"></img>
        <div className="margin3">לפחות זה רק עמוד ולא נוסע...</div>
        <button className=" btn btn-info btn-lg margin3" onClick={this.props.history.goBack}>חזרה לעמוד קודם</button>
        </div>
        );
    }
}




export default NotFound;