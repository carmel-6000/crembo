import React, { Component } from 'react';
import Auth from '../../Auth/Auth';


class AssistantRide extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        Auth.authFetch('api/rides?filter={"include": [{"children": "requests"}, "drivers"]}').then(response => { return response.json() }).then(res => {
            this.setState({ currentChildren: res })
        }).catch((err) => {
            console.log('Fetch Error :-S', err);
        });
}
    



    render(){
        return (console.log('the res', this.state.currentChildren))
    }
}


export default AssistantRide;