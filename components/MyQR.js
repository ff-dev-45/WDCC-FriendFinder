import QRCode from 'qrcode.react'
import config from '../lib/config'
import useWindowDimensions from '../lib/useWindowDimensions'

const MAX_SIZE = 400

export const MyQR = ({ user, onClick }) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions()
  const minDimension = Math.min(windowHeight, windowWidth)

  const size = minDimension > config.MIN_LARGE_SCREEN_WIDTH ? MAX_SIZE : minDimension
  return (
    <div onClick={ev => onClick(ev)}>
      <div style={{
        position: 'absolute',
        left: '0',
        top: '0',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
      }}/>
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <QRCode
          value={`${config.HOST}/api/addFriend?sub=${user.sub}`}
          size={size}
        />
      </div>
    </div>
  )
}

export default MyQR
