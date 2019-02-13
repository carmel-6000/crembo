import React, { Component } from 'react';
import Auth from '../../Auth/Auth';
import "./contactlist.css";

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: null,
            filteredPeople: "null"
        }
        console.log("the props is", this.props.contactApi)
    }

    componentWillMount() {
        let modelApi = this.props.contactApi;
        console.log("entered to didmount");
    
        Auth.authFetch(modelApi).then(response => { return response.json() }).then(res => {
            this.setState({ filteredPeople: res, people: res});
            console.log("dfg", this.state.people)
         });

        this.setState({ filteredPeople: this.state.people });
        console.log("filterdpeople", this.state.filteredPeople)
    }

    filteredList = (event) => {
        let updatedList = this.state.people;
        updatedList = updatedList.filter(function (item) {
            return ((item.firstName + " " + item.lastName).toLowerCase().search(
                event.target.value.toLowerCase()
            ) !== -1); 
        });
        this.setState({ filteredPeople: updatedList });
        console.log("updated list", this.state.filteredPeople);
    }

    filteredIsNotNull = () => {
        if (this.state.filteredPeople){
            return <List filteredPeople={this.state.filteredPeople} /> 
        }
    }



    render() {
        return (
            <div className="filter-list">

                <form>
                    <fieldset className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filteredList} />
                    </fieldset>
                </form>

                <div class="list-group">
                {console.log("lala", this.state.filteredPeople)}
                    {this.filteredIsNotNull()}
                </div>

            </div>
        );
    }
}



class List extends Component {
    listLayout = () => {
            let contactCard = this.props.filteredPeople.map((person) => (
                <a href="#" class="list-group-item list-group-item-action personCard" data-category={person} key={person}>
                    <div class="row">
                        <div class="col-3">

                            <img src={person.thumbnail} class=" contactImg" alt="Responsive image" />

                        </div>
                        <div class="col text-right">{person.firstName} {person.lastName} </div>
                        <div class="col-2 "><i class="fas fa-phone"></i></div>
                    </div>
                </a>
            ))
            return contactCard;
        
    }

    render() {
        return this.listLayout();
    }
}

export default ContactList;