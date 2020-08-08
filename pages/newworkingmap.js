import React, { Component, useState, useEffect } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios'

const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapContainer = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    console.log("component did mount")
    axios.get("http://localhost:3141/api/locations")
      .then(res => {
        setLocations(res.data);
      })
  }, [])

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  }

  const onClose = props => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{ lat: -36.8497513, lng: 174.762881 }}
    >
      {locations.map(user => (
          <Marker
            key={user.userid}
            position={user.position}
            name={user.userid}
            onClick={onMarkerClick}
          />
        ))}
      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={onClose}
      >
        <div>
          <h4>{selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  )

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCaNcb7yV0i3cIdrZq5LtAQ3rbxncGlbS0'
})(MapContainer);