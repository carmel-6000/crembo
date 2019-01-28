import React, { Component } from 'react';
import Grid from '../../Grid/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';


class UserList extends Component {
  constructor(props){
    super(props);
    console.log("ClientItemsList with Client name",this.props.match.params);
    this.clientName=this.props.match.params.clientName;

  }
  render() {
    const whereObj={userName:this.clientName};
    return (
      <React.Fragment>
        <h2>{this.clientName} Items List</h2>
        <Grid 
          modelMeta={'/api/meta/users'} 
          modelApi={'/api/user/getAvailableModels'} 
          whereObj={whereObj}
          editable={false}
          useShortFieldsSyntax={false}
        />
      </React.Fragment>

    );
  }
}

export default ClientItemsList
