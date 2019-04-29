import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Auth } from '../../Auth/Auth';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import "./mapDirections.css";
import './crembo.css';

let google = undefined;
let map = undefined;
let directionsDisplay = undefined;
let directionsService = undefined;


const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 1,
  margin: `0 0 8px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightblue' : null,

  // styles we need to apply on draggables
  ...draggableStyle
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};




class MapDirections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      init: false,
      whereFinger: 20,
      children: []
    }
    props.activityDetails.onStart('מסלול ונוסעים');
  }

  componentWillMount() {

    if (this.props.location.state) {
      this.setState({ children: this.props.location.state.children, branchAddress: this.props.location.state.branches.address }, () => {
        this.mapOfAddress();
      });
      console.log("yes")
    } else {
      Auth.authFetch(`/api/rides/${this.props.match.params.id}?filter={"include": [{"children": "requests"}, {"drivers": "requests"}, "branches"]}`).then(response => { return response.clone().json() }).then(res => {
        this.setState({ children: res.children, branchAddress: res.branches.address }, () => {
          this.mapOfAddress();
          console.log(res)
        })
        console.log("no")
      })
    }

  }

  componentDidMount() {
    let divListner = document.getElementById("mayyanahh");
    let self = this;
    self.scrollingdiv = false;
    divListner.addEventListener("touchmove", () => {
      self.scrollingdiv = true;
    });
    divListner.addEventListener("ontouchend	", () => {
      self.scrollingdiv = false;
    });
    window.addEventListener("touchmove", (e) => {
      if (self.scrollingdiv)
        self.setState({ whereFinger: e.touches[0].clientY })
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.children !== this.state.children) {
      this.mapOfAddress();
    }
  }


  mapOfchildren = () => {
    let card = null;
    card = this.state.children.map((value, i) => (

      <Draggable
        key={value.id}
        draggableId={value.id}
        index={i}
      >
        {(provided, snapshot) => (
          <div>
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              style={getItemStyle(
                provided.draggableProps.style,
                snapshot.isDragging
              )}
            >
              <div className="childrenCard p-2" key={i}>
                <div className="row ">
                  {value.thumbnail ?
                    <div className="newPadding col-2">
                      <img className="thumbnailIMG" src={value.thumbnail} alt="thumbnail" />
                    </div> :
                    <div className="newPadding col-2">
                      <i className="fas fa-user" />
                    </div>}
                  <div className="newPadding font-responsive col text-right">{value.firstName} {value.lastName}</div>
                  <div className="newPadding col-1 text-right">
                    {value.request &&
                      <div>
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
                        <a className="dropdown-item text-right" >הסר מהסעה זו ביום זה</a>
                        <a className="dropdown-item text-right">העבר להסעה אחרת</a>

                      </div>
                    </div>
                  </div>
                </div>
              </div></div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>)
    )
    return card;
  }


  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const children = reorder(
      this.state.children,
      result.source.index,
      result.destination.index
    );

    this.setState({
      children
    });
  }

  mapScript = () => {
    window.initMap = this.initMap.bind(this);
    const script = document.createElement('script')
    script.async = true;
    script.defer = true;
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ2EImKFwNu1PKEFcK4OhMq5eEnxnsF-g&callback=initMap";
    document.head.appendChild(script);
    this.setState({ destination: this.state.branchAddress, init: true });

  }
  mapOfAddress = () => {
    let arr = [];
    this.state.children.map((value, index) => arr.push(value.addressForth));
    this.setState({ origin: arr[0], places: arr }, () => {
      this.doScript();
    });
  }


  doScript = () => {
    return this.state.init ? this.calculateAndDisplayRoute() : this.mapScript();
  }


  initMap = () => {
    google = window.google;

    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      disableDefaultUI: true,
    });
    directionsDisplay.setMap(map);


    this.calculateAndDisplayRoute();


  }


  calculateAndDisplayRoute = () => {
    console.log("origin calculateAndDisplayRoute", this.state.origin)
    directionsService.route({

      origin: this.state.origin,
      destination: this.state.destination,
      waypoints: this.state.places.map((address) => { return { location: address, stopover: true } }),
      provideRouteAlternatives: false,
      travelMode: 'DRIVING'

    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }



  post = () => {
    this.state.children.map((value, index) => (
      Auth.authPost(`/api/ChildrenRides/update?where={"childId": ${value.id}, "rideId": ${this.props.match.params.id}}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ "pathOrder": index })
      }).then(response => { return response.json() }).then(updatedRow => {
        if (updatedRow.error) {
          return (
            console.log("error"));
        }
      })
    ))
    console.log("the other comp props: ", this.props.history.goBack());

  }


  render() {
    console.log("props:", this.props);
    console.log("state:", this.state);
    const heightDiv = { height: (this.state.whereFinger + 20) + "px" };
    return (
      <div>
        <button onClick={() => this.post()}>עדכן וחזור</button>
        <div id="map" className="mapDiv"></div>

        <div id="mayyanahh" style={heightDiv}>
          <div>=====</div>
          {this.state.children && <div>

            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}

                    {...provided.droppableProps}
                  >

                    {this.mapOfchildren()}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>



          </div>}
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

//inCase we want includ assistans on map:
// mapOfAddress = () => {
//   let arr = [];
//   this.state.children.map((value, index) => arr.push(value.addressForth));

//   if (this.state.assistants[0] !== undefined) {
//     this.state.assistants.map((value, index) => arr.unshift(value.addressForth));
//     this.setState({ origin: arr.shift(), places: arr }, () =>{
//       this.doScript();
//     });

//     console.log("assistants", this.state.assistants.addressForth)
//   }
//   else {
//     this.setState({ origin: arr[0], places: arr } , () =>{
//       this.doScript();
//     });
//   }
// ALTER TABLE children_rides ADD COLUMN order INT(11) unsigned DEFAULT NULL;
// ALTER TABLE children_rides
// ADD COLUMN path_order INT DEFAULT NULL;

