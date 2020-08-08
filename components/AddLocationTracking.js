import { useState } from 'react'
import config from '../lib/config'
import { useFetchUser } from '../lib/user'

const NotSupported = () => <div>Location is not supported :(</div>

const Blocked = () => <div>You have blocked access to your location</div>

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
  const [status, setStatus] = useState('firstRun')
  const [geoWatch, setGeoWatch] = useState(null)

  if (status === 'notSupported' || status === 'error') {
    return <NotSupported></NotSupported>
  }
  if (status === 'blocked') {
    return <Blocked></Blocked>
  }
  if (status === 'loaded') {
    return <></>
  }
  if (!('geolocation' in navigator)) {
    setStatus('notSupported')
    return <NotSupported></NotSupported>
  }
  setGeoWatch(navigator.geolocation.watchPosition(
    pos => {console.log(pos); sendLocation(user, pos) },
    err => setStatus(err.code === err.PERMISSION_DENIED ? 'blocked' : 'error'),
    { enableHighAccuracy: true }
  ))
  setStatus('loaded')
  return <></>
}

export default AddLocationTracking
