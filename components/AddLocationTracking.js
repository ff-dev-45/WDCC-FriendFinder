import { useState } from 'react'
import config from '../lib/config'

const STATUS = {
  FIRST_LOAD:    0,
  LOADED:        1,
  NOT_SUPPORTED: 2,
  ERROR:         3,
  BLOCKED:       4,
}

const NotSupported = () => <div>Location is not supported :(</div>

const Blocked = () => <div>You have blocked access to your location</div>

const Error = () => <div>An unknown error occurred while fetching your location</div>

const sendLocation = async (user, { coords, timestamp }) => {
  const { altitude, latitude, longitude } = coords
  await fetch(`${config.HOST}/api/location`, {
    method: 'post',
    body: JSON.stringify({
      name: user.nickname,
      position: {
        alt: altitude,
        lat: latitude,
        lng: longitude,
      },
      timestamp,
    })
  })
}

// when included, this will constantly send the users location to the server
export const AddLocationTracking = ({ user }) => {
  const [status, setStatus] = useState(STATUS.FIRST_LOAD)
  const [geoWatch, setGeoWatch] = useState(null)

  if (status === STATUS.NOT_SUPPORTED) {
    return <NotSupported></NotSupported>
  }
  if (status === STATUS.ERROR) {
    return <Error></Error>
  }
  if (status === STATUS.BLOCKED) {
    return <Blocked></Blocked>
  }
  if (status === STATUS.LOADED) {
    return <></>
  }
  if (!('geolocation' in navigator)) {
    setStatus(STATUS.NOT_SUPPORTED)
    return <NotSupported></NotSupported>
  }
  setGeoWatch(navigator.geolocation.watchPosition(
    pos => {console.log(pos); sendLocation(user, pos) },
    err => setStatus(err.code === err.PERMISSION_DENIED ? STATUS.BLOCKED : STATUS.ERROR),
    { enableHighAccuracy: true }
  ))
  setStatus(STATUS.LOADED)
  return <></>
}

export default AddLocationTracking
