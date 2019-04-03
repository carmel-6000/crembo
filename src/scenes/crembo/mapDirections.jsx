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
      origin: 'נחום אהרנפלד 4',
      destination: 'שלמה מומו הלוי 5',
      places:['שדרות הרצל 22','ליאו וייסמן 3']
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
  


  initMap = () => {
    google = window.google;
    
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let directionsService = new google.maps.DirectionsService;
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      disableDefaultUI: true,
    });
    directionsDisplay.setMap(map);

    this.calculateAndDisplayRoute(directionsService, directionsDisplay);


  }



  calculateAndDisplayRoute = (directionsService, directionsDisplay) => {

    directionsService.route({
      // origin: { lat: 37.77, lng: -122.447 },  // Haight.
      // destination: { lat: 37.768, lng: -122.511 },  // Ocean Beach.

      origin: this.state.origin,
      destination: this.state.destination,
      waypoints: this.state.places.map((address)=> {return {location: address, stopover: true}}),
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
    return (
      <div>
        <div id="map" className="mapDiv"></div>
      </div>
    );
  }
}


export default MapDirections;

//apiKey= AIzaSyCZ2EImKFwNu1PKEFcK4OhMq5eEnxnsF-g

//link: https://developers.google.com/maps/documentation/javascript/directions