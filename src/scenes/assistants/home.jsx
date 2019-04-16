import React, { Component } from 'react';
import { Auth } from '../../Auth/Auth';
import { Link } from "react-router-dom";

class AssistantSide extends Component {
    constructor(props){
        super(props);
        this.state = {
        
    }
}

    setPhone = (event) => {
        this.setState({phone: event.target.value})
    }

  enterForm = () => {
      return (
      <form>
          <label>
              <input type="number" onChange={this.setPhone }>
              </input>
               מספר פלאפון
              </label>
          <Link to={{pathname: "/assistant/rides", state:{phone: this.state.phone} }}>
          <button disabled={!this.state.phone}>כניסה למערכת</button>
          </Link>
      </form>)
  }

  
  
    render() {
        return(this.enterForm())
    }
}


export default AssistantSide;