import React, { Component, useState, useEffect } from 'react'
import { Map, GoogleApiWrapper, Circle } from 'google-maps-react'
import { InfoWindow, Marker } from 'google-maps-react'
import axios from 'axios'
import config from '../lib/config'

const mapStyles = {
  width: '100vw',
  height: '100vh',
}

const MapContainer = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({})
  const [selectedPlace, setSelectedPlace] = useState({})
  const [locations, setLocations] = useState([])
  const [currentLocation, setLocation] = useState(null)

  useEffect(() => {
    axios.get(`${config.HOST}/api/locations`)
      .then(res => {
        setLocations(res.data)
      })
  }, [])

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props)
    setActiveMarker(marker)
    setShowingInfoWindow(true)
  }

  const onClose = props => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false)
      setActiveMarker(null)
    }
  }

  useEffect(() => {
    navigator.geolocation.watchPosition(
      pos => setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        radius: pos.coords.accuracy,
      }),
      null,
      { enableHighAccuracy: true }
    )
  }, [])

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

      {currentLocation!==null && <Circle
        center={currentLocation}
        radius= {currentLocation.radius}
      >
      </Circle>}
 
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
})(MapContainer)

