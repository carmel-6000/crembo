import React, { Component } from 'react';
import './crembo.css';
import { Router, Route, Link } from "react-router-dom";
import Auth from '../../Auth/Auth';
import "./mapDirections.css";

let google = undefined;
let map = undefined;


class MapDirections extends Component {
  constructor(props) {
    super(props)
    this.state = {
     

    }
    props.activityDetails.onStart('פרטי מפה ונוסעים')

  }
  componentWillMount() {

    if (this.props.location.state) {
      this.setState({ children: this.props.location.state.children });
      console.log("yes")
    } else {
      Auth.authFetch(`/api/rides/${this.props.match.params.id}?filter={"include": ["children"]}`).then(response => { return response.clone().json() }).then(res => {
        this.setState({ children: res.children })
        console.log("no")
      })
    }

  }

  componentDidMount() {
    window.initMap = this.initMap.bind(this);
    const script = document.createElement('script')
    script.async = true;
    script.defer = true;
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ2EImKFwNu1PKEFcK4OhMq5eEnxnsF-g&callback=initMap";
    document.head.appendChild(script);
  }

  mapOfAddress = () => {
    let arr = [];
    this.state.children.map((value, index) =>  arr.push(value.addressForth));
    console.log("arr",arr)
    this.setState({ destination: arr[arr.length-1] });
    this.setState({ origin: arr[0] });
    this.setState({ places: arr});

  }

  mapOfchildren = () => {

    let card = null;
    card = this.state.children.map((value, i) => (
      <div className="childrenCard p-2" key={i}>
        <div className="row ">
          {value.thumbnail ? <div className="newPadding col-2"><img className="thumbnailIMG" src={value.thumbnail} /></div> : <div className="newPadding col-2"><i className="fas fa-user" /></div>}
          <div className="newPadding font-responsive col text-right">{value.firstName} {value.lastName}</div>
          <div className="newPadding col-1 text-right">
            {value.request && <div>
              <button className="dropdownsButtons" type="button" id="dropdownInfoButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i style={{ color: "#c12735" }} class="font-responsive fas fa-exclamation "></i>
              </button>
              <div className="dropdown-menu requestsDropdown rounded" aria-labelledby="dropdownInfoButton">
                <ul type="square" className="mb-0">
                  {value.requests.map((val) => <li className="text-right" key={i}>{val.request} </li>)}
                </ul>
              </div>
            </div>}
          </div>
          <div className="newPadding col-1 text-right">
            <div className="dropdown">
              <button className="dropdownsButtons" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className=" font-responsive fas fa-ellipsis-v "></i>
              </button>
              <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item text-right" to={{ pathname: "/contact/children/details/" + value.id, state: { person: value, contactApi: "children" } }}>מידע נוסף</Link>
                <a className="dropdown-item text-right" href="#">הסר מהסעה זו ביום זה</a>
                <a className="dropdown-item text-right" href="#">העבר להסעה אחרת</a>

              </div>
            </div>
          </div>
        </div>
      </div>))
    return card;
  }




  initMap = () => {
    google = window.google;

    let directionsDisplay = new google.maps.DirectionsRenderer;
    let directionsService = new google.maps.DirectionsService;
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      disableDefaultUI: true,
    });
    directionsDisplay.setMap(map);

    this.mapOfAddress();
    this.calculateAndDisplayRoute(directionsService, directionsDisplay);


  }



  calculateAndDisplayRoute = (directionsService, directionsDisplay) => {

    directionsService.route({
      
      origin: this.state.origin,
      destination: this.state.destination,
      waypoints: this.state.places.map((address) => { return { location: address, stopover: true } }),
      provideRouteAlternatives: false,
      travelMode: 'DRIVING'

    }, (response, status) => {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }


  render() {
    console.log("props:", this.props);
    console.log("state.children:", this.state.children);
    console.log("state:", this.state);


    return (
      <div>
        <div id="map" className="mapDiv"></div>
        <div>
          {this.state.children && <div>{this.mapOfchildren()}</div>}
        </div>
      </div>
    );
  }
}


export default MapDirections;




//apiKey= AIzaSyCZ2EImKFwNu1PKEFcK4OhMq5eEnxnsF-g

//link: https://developers.google.com/maps/documentation/javascript/directions

//this.setState({ origin: arr[arr.length-1] });
// this.setState({ destination: arr[0] });
// this.setState({ places: arr});