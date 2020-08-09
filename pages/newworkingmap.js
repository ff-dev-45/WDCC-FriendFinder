import React, { Component, useState, useEffect } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import { InfoWindow, Marker } from 'google-maps-react'
import axios from 'axios'
import config from '../lib/config'
import UserLocation from '../components/myLocation'

const mapStyles = {
  width: '100vw',
  height: '100vh',
}

const MapContainer = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({})
  const [selectedPlace, setSelectedPlace] = useState({})
  const [locations, setLocations] = useState([])

  useEffect(() => {
    var userObj = {}
    var locationData = []
    var newLocationData = []

    axios.get(`${config.HOST}/api/users`)
      .then(res => {
        res.data.forEach(element => {
          const { userid } = element
          userObj = {
            ...userObj,
            [userid]: element
          }
        })
        return axios.get(`${config.HOST}/api/locations`)
      })
      .then(res => {
        locationData = res.data
        locationData.forEach(element => {
          const { userid } = element
          var name = ""
          if (userObj[userid] !== undefined) {
            // User id exist in the user table
            const user = userObj[userid]
            const { firstname, lastname } = user
            name = firstname + " " + lastname
          } else {
            name = userid
          }
          newLocationData.push({
            position: {
              lat: element.position.lat,
              lng: element.position.lng,
              alt: element.position.alt,
            },
            name: name,
            userid: element.userid
          })
        })
        setLocations(newLocationData)
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
          name={user.name}
          onClick={onMarkerClick}
        />
      ))}
      <UserLocation user={props.user}/>
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
