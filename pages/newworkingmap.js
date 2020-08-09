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
    var userObj = {}
    var locationData = []
    var newLocationData = [] 

    axios.get(`${config.HOST}/api/users`)
      .then(res => {
        var resData = res.data
        const friendData = res.data.filter(e => e.userid === props.user.sub)[0].friends
        friendData.push(props.user.sub)
        resData = resData.filter(e => friendData.includes(e.userid))
        resData.forEach(element => {
          const { userid } = element
          userObj = {
            ...userObj,
            [userid]: element
          }
        })
        return axios.get(`${config.HOST}/api/locations`)
      })
      .then(res => {
        if (Object.keys(userObj).length !== 0) {
          locationData = res.data
          locationData.forEach(element => {
            const { userid } = element
            var name = ""
            if (userObj[userid] !== undefined) {
              // User id exist in the user table
              const user = userObj[userid]
              const { firstname, lastname } = user
              name = firstname + " " + lastname
              newLocationData.push({
                position: {
                  lat: element.position.lat,
                  lng: element.position.lng,
                  alt: element.position.alt,
                },
                name: name,
                userid: element.userid
              })
            }            
          })
        } 
        
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
          name={user.name}
          onClick={onMarkerClick}
          animation={google.maps.Animation.DROP}
        />
      ))}

      {currentLocation!==null && <Circle
        center={currentLocation}
        radius= {currentLocation.radius}
        strokeColor="#7DCEF5"
        strokeOpacity={0.5}
        strokeWeight={1}
        fillColor="#7DCEF5"
        fillOpacity={0.3}
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

