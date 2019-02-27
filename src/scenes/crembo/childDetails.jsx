import React, { Component } from 'react';
import Auth from '../../Auth/Auth';
import './childDetails.css';

class ChildDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        childInfo: null,
        }
    }

    componentDidMount = () => {
        // filters the rides by their direction
        Auth.authFetch("api/children/" + this.props.match.params.id).then(response => { return response.json() }).then(res => {
        this.setState({childInfo: res})
        
        }).catch((err) => {
            console.log('Fetch Error :-S', err);
        });
    }

    render(){
       
        return(
            <div>
            {this.state.childInfo ?
            <div className="infoTXT">
              <div className="text-center childName">
              פרטי חניך <br/>
                {this.state.childInfo.firstName+" "+this.state.childInfo.lastName}
                {this.state.childInfo.gender==="male" ? <i className="fas fa-mars fa-1x mr-1" style={{ color: "#007bff78" }} ></i> :
                this.state.childInfo.gender==="female"? <i className="fas fa-venus fa-1x mr-1" style={{ color: "#e83e8cc4" }}></i> :
                <i className="fas fa-genderless fa-1x mr-1" style={{ color: "grey" }} ></i> }
                <div><img className="thumbnailIMG" src={this.state.childInfo.thumbnail} /></div>
              </div>
              <div className="text-right">
                <div className="mr-4" > כתובת הלוך</div>
                <div className="infoBox ">{this.state.childInfo.adressForth}</div>
                <div className="mr-4" > כתובת חזור</div>
                <div className="infoBox">{this.state.childInfo.adressBack}</div>
                <div className="mr-4" >איש קשר</div>
                <div className="infoBox row"><span className="col-10">{this.state.childInfo.contactName}</span> <i className="fas fa-phone fa-1x col"></i> </div>
                <div className="mr-4" >התראה לפני הגעה</div>
                <div className="infoBox">{this.state.childInfo.alertTime}</div>
              </div>
            </div>: 
                <div className="d-flex justify-content-center">
                    <div className="mt-5 spinner-border text-info" style={{width: "7rem", height: "7rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                    </div>
                </div>}
            </div>
        );
    }
}
export default ChildDetails;