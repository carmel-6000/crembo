import React, { Component } from 'react';
import { Auth } from '../../Auth/Auth';
import "./contactlist.css";
import { Link } from "react-router-dom";
import loading_dots from '../../img/loading_dots.svg';

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: null,
            filteredPeople: null,
            branch: localStorage.getItem('branchId')
        }
        props.activityDetails.onStart('אנשי קשר')

    }

    whenStartOrUpdate = () => {
        Auth.authFetch('/api/Branches/' + this.state.branch + '/' + this.props.match.params.person + '?filter={"include":"requests"}').then(response => { return response.json() }).then(res => {
            this.setState({ filteredPeople: res, people: res });

        });

    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({ chooseMode: true })

        }

        Auth.authFetch('/api/Branches/' + this.state.branch + '/' + this.props.match.params.person + '?filter={"include":"requests"}').then(response => { return response.json() }).then(res => {
            this.setState({ filteredPeople: res, people: res });

        });

        this.setState({ filteredPeople: this.state.people });

    }

    componentDidUpdate(prevProp, prevState) {
        if (this.props.match.params !== prevProp.match.params) {
            this.whenStartOrUpdate();

        };

    }



    filteredList = (event) => {
        let updatedList = this.state.people;
        //the search cant get "\" s,o,m in children:
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
            return <List
                chooseMode={this.state.chooseMode}
                filteredPeople={this.state.filteredPeople}
                params={this.props.match.params}
                history={this.props.history}
            />
        }
    }



    render() {
        return (
            <div>
                {this.state.people ?
                    <div className="filter-list">
                        <form>
                            <fieldset className="form-group">
                                <input type="text" className=" mt-3 form-control form-control-lg" placeholder="Search" onChange={this.filteredList} />
                            </fieldset>
                        </form>

                        <div className="list-group">
                            {this.state.filteredPeople ? this.filteredIsNotNull() : <img src={loading_dots} alt="loading.io/spinner/" />}
                        </div>

                    </div> :
                    <img src={loading_dots} alt="loading.io/spinner/"></img>}
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
            default:
                console.log("no API has been given.");

        }

    }

    updatedride = (api) => {
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
        return (
            this.props.filteredPeople.map((person) => {

                return (
                    <div className="list-group-item list-group-item-action personCard" data-category={person} key={person.id}>
                        <div className="row justify-content-center align-items-center  ">
                            <Link key={person.id} className={`linkTo noPadding ${this.props.chooseMode ? " col-7" : " col-9"}`} to={{ pathname: '/contact/' + `${this.props.params.person}` + '/details/' + `${person.id}`, state: { person } }} >
                                <div className="row noPadding align-items-center ">
                                    <div className="col-3">
                                        {person.thumbnail !== null ?
                                            <img src={person.thumbnail} className="contactImg" alt="thumbnail" />
                                            :
                                            <i className="fas fa-user-tie noPic" />}
                                    </div>

                                    <div className="col-9 noPadding pr-1 text-right grey name1">
                                        {person.firstName} {person.lastName}
                                    </div>
                                </div>
                            </Link>
                            <a href={"tel:" + person.phone}>
                                <div className="col-2">
                                    <i className="fas fa-phone phoneImg" />
                                </div>
                            </a>

                                {this.props.chooseMode && <div className="col-3 align-self-end addButton" onClick={e => e.preventDefault()}>
                                    <button onClick={() => this.contactChoosen(person.id)} className="btn btn-info btn-lg join bold">צרף</button>

                                </div>}

                        </div>
                    </div>


// <div className="list-group-item list-group-item-action personCard" data-category={person} key={person.id}>

// <div class="container">

//     <div class="row">
//     <Link key={person.id} className={`linkTo ${this.props.chooseMode ? "col-7" : "col-9"}`} to={{ pathname: '/contact/' + `${this.props.params.person}` + '/details/' + `${person.id}`, state: { person } }} >
//     <div class="col-xs-2">
//     {person.thumbnail !== null ?
//         <img src={person.thumbnail} className="contactImg" alt="thumbnail" />:
//         <i className="fas fa-user-tie noPic" />}
// </div>
// <div class="col-xs-7 text-right grey name1">
//     {person.firstName} {person.lastName}
// </div>

// </Link>
// <a href={"tel:" + person.phone}>
//             <div class="col-xs-1">
//                 <i className="fas fa-phone phoneImg" />
//             </div>
//         </a>

//         <div onClick={e => e.preventDefault()}>
//             {this.props.chooseMode && <div class="col-xs-2" >
//                 <button onClick={() => this.contactChoosen(person.id)} className="btn btn-info btn-lg join bold"  >צרף</button>
//             </div>}

//         </div>
   
//     </div>
// </div>
// </div>


                )
            }));
    }
}


export default ContactList;