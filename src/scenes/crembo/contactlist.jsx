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
        
    }

    componentWillMount() {
        let modelApi = this.props.contactApi;
        
    
        Auth.authFetch(modelApi).then(response => { return response.json() }).then(res => {
            this.setState({ filteredPeople: res, people: res});
            
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
        if (this.state.filteredPeople){
            return <List filteredPeople={this.state.filteredPeople} /> 
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
                {}
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

                            <img src={person.thumbnail} class=" contactImg" />

                        </div>
                        <div class="col text-right">{person.firstName} {person.lastName} </div>
                       <a href={"tel:" + person.phone}> <div class="col-2 "><i class="fas fa-phone"></i></div> </a>
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