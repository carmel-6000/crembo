import React, { Component } from 'react';
import './neta.css';
import Auth from '../../Auth/Auth';
class RideDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
        }
    }

    componentWillMount() {
        this.setState({ item: this.props.location.state.item })
    }
    changeItemDetails = (e) => {
        console.log(e)
        let x = e.target.value;
        let item = { ...this.state.item };
        switch (e.target.id) {
            case "planned_time":
                item.plannedTime = x;
                this.setState({ item })
                break;
            case "title":
                item.title = x;
                this.setState({ item })
                break;
            default:
                console.log("error.")
        }
    }

    render() {
        console.log("hey whats the props dude", this.state.item)

        return (

            <div>
                <input className="row" type="time" value={this.state.item.plannedTime} name="planned_time" id="planned_time" onChange={this.changeItemDetails}></input>
                <input className="row" type="text" value={this.state.item.title} name="title" id="title" onChange={this.changeItemDetails}></input>
            </div>
        );
    }
}


export default RideDetails;



