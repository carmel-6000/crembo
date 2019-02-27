import React, { Component } from 'react';
import Auth from '../../Auth/Auth';
import "./contactlist.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: null,
            filteredPeople: "null"
        }
        console.log("the props is", this.props.match.params.person)
    }

        
componentDidMount() {
    if (this.props.location.state) {
    this.setState({ chooseMode: this.props.location.state.chooseMode })
    }
}
componentWillMount() {

    Auth.authFetch("/api/" + this.props.match.params.person).then(response => { return response.json() }).then(res => {
        this.setState({ filteredPeople: res, people: res });

    });

    this.setState({ filteredPeople: this.state.people });
}



    filteredList = (event) => {
        let updatedList = this.state.people;
        updatedList = updatedList.filter(function (item) {
            return ((item.firstName + " " + item.lastName).toLowerCase().search(
                event.target.value.toLowerCase()
            ) !== -1);
        });
        this.setState({ filteredPeople: updatedList });
    }

    filteredIsNotNull = () => {
        if (this.state.filteredPeople) {
            return <List contactApi={this.props.match.params.person} urlPath={this.state.urlPath} filteredPeople={this.state.filteredPeople} />
        }
    }



    render() {
        return (
            <div className="filter-list">
                <form>
                    <fieldset className="form-group">
                        <input type="text" className=" mt-3 form-control form-control-lg" placeholder="Search" onChange={this.filteredList} />
                    </fieldset>
                </form>

                <div class="list-group">
                    {this.filteredIsNotNull()}
                </div>

            </div>
        );
    }
}



class List extends Component {

    render() {
        console.log("erg", this.props)
        return (
            this.props.filteredPeople.map((person) => (
                <Link to={{ pathname: '/contact/'+ `${this.props.contactApi}` +'/details/' + `${person.id}`, state: { person } }} >
                    <div class="list-group-item list-group-item-action personCard" data-category={person} key={person}>
                        <div class="row">
                            <div class="col-3">

                                <img src={person.thumbnail} class=" contactImg" />

                            </div>
                            <div class="col text-right">{person.firstName} {person.lastName} </div>
                            <a href={"tel:" + person.phone}><div class="col-2 "><i class="fas fa-phone"/></div></a>
                        </div>
                    </div>
                </Link>
            ))
        );
    }
}

export default ContactList;