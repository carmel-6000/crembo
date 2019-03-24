import React, { Component } from 'react';
import './crembo.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Auth from '../../Auth/Auth';
import "./mapDirections.css";

let google = undefined;
let map = undefined;


class MapDirections extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      // travelMode: 'DRIVING'

      origin: { lat: 31.801993, lng: 35.209341 },
      destination: { lat: 31.799947, lng: 35.211536 },
      waypoints: [
        {
          location: { lat: 31.801507, lng: 35.210066 },
          stopover: true
        }, {
          location: { lat: 31.800577, lng: 35.21071 },
          stopover: true
        }],
      provideRouteAlternatives: false,
      travelMode: 'DRIVING'

    }, (response, status) => {
      if (status == 'OK') {
        console.log("response of calc ", response)
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
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