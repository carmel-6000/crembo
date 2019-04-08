import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ChildrenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rides: this.props.location.state.ride,
            children: this.props.location.state.ride.children,
            watched: true
        }
    }

    componentDidMount() {
        if(!this.state.rides) {
        console.log("in current");
        Auth.authFetch('/api/rides/3419/children').then(response => { return response.json() }).then(res => {
            console.log("res children", res);
            this.setState({ children: res })
        }).catch((err) => {
            console.log('Fetch Error :-S', err);
        });}
    }


    myChildren = (children) => { return (children.map((person) => {
        return (
        <Link className="linkTo" to={{ pathname: `/assistant/children/details/${person.id}`, state: { person } }} >

            <a className="list-group-item list-group-item-action personCard" data-category={person} key={person}>
                <div className="row">
                    <div className="col-3">
                        {person.thumbnail &&
                            <img src={person.thumbnail} className="contactImg" alt="thumbnail" />}
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
    
     )}))}
    
    



    render() {
        console.log(this.props)

        console.log("rides", this.state.rides)
        return(
            <div> 
              <div className="filter-list">
        <div className="list-group">     
            {this.state.children?this.myChildren(this.state.children):''}
           <Link to={{pathname: '/assistant/start', state:{watched:this.state.watched}}}><button>עברתי על פרטי ההסעה</button></Link> 
        </div>

    </div>
        
    </div>
        );
    }
}





export default ChildrenList;