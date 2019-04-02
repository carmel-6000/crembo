import React, { Component } from 'react';
import Auth from '../../Auth/Auth';
import "./contactlist.css";
import { Router, Route, Link } from "react-router-dom";

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: null,
            filteredPeople: "null"
        }

    }
    componentDidMount() {

        if (this.props.match.params.id) {
            this.setState({ chooseMode: true })

        }

        console.log("props", this.props)
    }

    componentWillMount() {

        Auth.authFetch('/api/' + this.props.match.params.person + '?filter={"include":"requests"}' ).then(response => { return response.json() }).then(res => {
            this.setState({ filteredPeople: res, people: res });

        });

        this.setState({ filteredPeople: this.state.people });

    }


    filteredList = (event) => {
        let updatedList = this.state.people;
        console.log("event.target.value", event.target.value)
        //the search cant get "\" so:
        try {
            updatedList = updatedList.filter(function (item) {
                return ((item.firstName + " " + item.lastName).toLowerCase().search(
                    event.target.value.toLowerCase()
                ) !== -1);
            });
            this.setState({ filteredPeople: updatedList });
        } catch (error) {
            console.log(error)
        }

    }

    filteredIsNotNull = () => {
        if (this.state.filteredPeople) {
            return <List chooseMode={this.state.chooseMode} filteredPeople={this.state.filteredPeople} params={this.props.match.params} history={this.props.history} />
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

                <div className="list-group">
                    {this.filteredIsNotNull()}
                </div>

            </div>
        );
    }

}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approved: false
        }
        this.contactChoosen = this.contactChoosen.bind(this)

    }


    contactChoosen(contactId) {
        console.log("contactId", contactId);
        let api = "";
        switch (this.props.params.person) {
            case "drivers":
                this.setState({
                    driver: contactId
                }, () => {
                    api = `/api/rides/update?where={"id": ${+ this.props.params.id}}`;
                    this.updatedride(api);
                });
                break;
            case "assistants":
                this.setState({
                    rideId: this.props.params.id, assistantId: contactId
                }, () => {
                    api = "/api/AssistantsRides";
                    this.updatedride(api);
                });
                break;
            default: null;

        }

    }

    updatedride = (api) => {
        console.log("this.state", JSON.stringify(this.state));
        Auth.authPost(api, {
            method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }).then(response => { return response.json() }).then(newPerson => {
            if (newPerson.error) {
                return (
                    <div> האדם אותו רצית להוסיף שייך למקום אחר! </div>
                );
            }
            console.log("the person that has been added", newPerson);
        });
        this.setState({ approved: true })

        console.log("the other comp props: ", this.props.history.goBack());
    }


    render() {
        return (this.props.filteredPeople.map((person) => (
            <Link className="linkTo" to={{ pathname: '/contact/' + `${this.props.params.person}` + '/details/' + `${person.id}`, state: { person } }} >

                <a className="list-group-item list-group-item-action personCard" data-category={person} key={person}>
                    <div className="row">
                        <div className="col-3">
                            {person.thumbnail &&
                                <img src={person.thumbnail} className="contactImg" alt="Responsive image" />}
                            {!person.thumbnail &&
                                <i className="fas fa-user-tie noPic" />}
                        </div>

                        <div className="col text-right">
                            {person.firstName} {person.lastName}
                        </div>

                        <div onClick={e => e.preventDefault()}>
                            <a href={"tel:" + person.phone}>
                                <div class="col-2">
                                    <i class="fas fa-phone" />
                                </div>
                            </a>
                        </div>
                        <div onClick={e => e.preventDefault()}>

                            {this.props.chooseMode &&
                                <div onClick={() => this.contactChoosen(person.id)} className="col-2">
                                    <i className="fas fa-user-plus" />
                                </div>
                            }
                        </div>

                    </div>
                </a>
            </Link>



        )));
    }
}


export default ContactList;