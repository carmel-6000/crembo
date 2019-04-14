import React, { Component } from 'react';
import { Auth } from '../../Auth/Auth';
import { Link } from "react-router-dom";

class AssistantSide extends Component {
    constructor(props){
        super(props);
        this.state = {
            isInclude: null
        }
        
        this.gettingRideData();

    }

  enterForm = () => {
      return (
      <form>
          <label><input type="number"></input> מספר פלאפון</label>
          <select>
              <option value="forward">הלוך</option>
              <option value="back">חזור</option>
          </select>
<<<<<<< HEAD
          <Link to={{pathname: "/assistant/3682/ride-details", state:{watched: this.state.watched} }}><button>כניסה למערכת</button></Link>
=======
          <Link to="/assistant/ride-details"><button>כניסה למערכת</button></Link>
>>>>>>> 27b649bf62357e169a56cda4c83eef5323bbaf01
      </form>)
  }

  gettingRideData = () => {
   Auth.authFetch('/api/rides?filter={ 	"where": {"activities": {"isLive": true}     } , 	"include": ["assistants", "activities"] }').then(response => { return response.json() }).then(res => {
        console.log("answer of",'/api/rides?filter={{"where": {"activities": {"isLive": true}     }}{ "include": ["assistants", "activities"]}}');
        console.log("res",res);
        this.setState({ isInclude: res })
    })    
}
  
  
  
  
    render() {
        console.log("rides" , this.state.isInclude)
        return(this.enterForm())
    }
}


export default AssistantSide;