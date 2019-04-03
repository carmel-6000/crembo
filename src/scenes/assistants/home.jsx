import React, { Component } from 'react';
import Auth from '../../Auth/Auth';

class AssistantSide extends Component {
    constructor(props){
        super(props);
        this.state = {
            isInclude: null
        }
        
        this.gettingRideData();

    }

  enterForm = () => {
    return  <form>
          <label><input type="number"></input> מספר פלאפון</label>
          <select>
              <option value="forward">הלוך</option>
              <option value="back">חזור</option>
          </select>
          <button>כניסה למערכת</button>
      </form>
  }

  gettingRideData = () => {
    Auth.authFetch('api/rides?filter={{"where": {"activities": {"isLive": true}     }}{ "include": ["assistants", "activities"]}}').then(response => { return response.json() }).then(res => {
        this.setState({ isInclude: res })
    })    
}
  
  
  
  
    render() {
        
        return(
            this.enterForm()
            )
    }
}


export default AssistantSide;