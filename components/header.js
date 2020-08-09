import { useState } from 'react'
import MyQR from './MyQR'

/* eslint-disable no-unused-vars */
const MenuItem = ({ children, href, onClick, style }) => {
  return (
    <a
      href={href}
      style={{textDecoration: 'underline', cursor: 'pointer', ...style}}
      onClick={onClick && (ev => onClick(ev))}
    >
      {children}
    </a>
  )
}

const buttonStyle = {
  color: 'white',
  border: '1px solid white',
  fontSize:'14px',
  padding: '0.5rem 1rem',
  borderRadius: '0.375rem',
}

const headerStyles = {
  backgroundColor: '#2F6A8F',
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'flex-end',
  padding: '1.5rem',
  color: '#FFF',
}

const headerMargins = {
  padding: '0.5rem 1rem 0.5rem 0',
}

function Header ({ user }) {
  const [qrShown, setQrShown] = useState(false)

  return (
    <>
      {qrShown && <MyQR user={user} onClick={() => setQrShown(false)} />}
      <header style={{ ...headerStyles }}>
        <img src='/logo.png' style={{ height: '2.8rem', ...headerMargins }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem', ...headerMargins }}>
          Friender
        </span>
        <MenuItem style={headerMargins} onClick={() => setQrShown(true)}>Show My QR</MenuItem>
        <a href='/api/logout' style={{marginRight: '1rem', marginLeft: 'auto'}}>
          <button className="" style={buttonStyle}>
            Log Out
          </button>
        </a>
        <img src={user.picture} style={{ height: '2.6rem', borderRadius: '50%' }} />
      </header>
    </>
  )
}

export default Header
