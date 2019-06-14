/* global google  */

import React from 'react';
import { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY





const MyMapComponent = withScriptjs(withGoogleMap((props) => {

  let list = [];
  for (let p in props.places) {

    let icon =
    {
      scaledSize:new google.maps.Size(32,32),
      url: (p === '1') ? "http://maps.google.com/mapfiles/kml/paddle/blu-circle.png" : (p === '4') ? "http://maps.google.com/mapfiles/kml/paddle/blu-circle.png":"http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png"
      
    }
  
   
    
    list.push(<Marker
      position={props.places[p].coords}
      title={props.places[p].name}
          icon={icon}
      strokeWeight={30} 
      key={p}

    />,
    <Polyline path={props.path}  
    key={p+1}
       options={{
        strokeColor: ({p} === '2') ? "#ff69b4" : (p === '4') ? "#ffcc00":"#006699",
       
        strokeOpacity: 1,
        strokeWeight: 4,
        offset: '0%',
        icons: [
            {
                strokeWeight: 2,
               
                offset: '0%',
                repeat: '35px'
            }
        ]
    }}
    
      />

    
    )


  }
  return (<GoogleMap
    defaultZoom={2}
    defaultCenter={props.places[0].coords}
  >

    
    {list}
    
</GoogleMap>)
}
))

class Maps extends Component {

  render() {
    if (!this.props.places[0] || !this.props.places[1])
      return (<div />)
    return (
      <MyMapComponent
        places={this.props.places}
        isMarkerShown
        path={this.props.path}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className="h-400"/>}
        mapElement={<div className={"my-rounded"} style={{ height: `100%` }} />}
      />)

  }
}

export default Maps;