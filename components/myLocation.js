import React, { useState, useEffect } from 'react'
import { Marker } from 'google-maps-react'

const UserLocation = (props) => {
  const [currentLocation, setLocation] = useState({})

  useEffect(() => {
    navigator.geolocation.watchPosition(
      pos => {setLocation({lat: pos.coords.latitude,lng: pos.coords.longitude})},
      null,
      { enableHighAccuracy: true }
    )
  }, [])

  return (
    <Marker
      key={props.user.userid}
      position={currentLocation}
      name={props.user.name}
    />
    
  )
}
export default UserLocation