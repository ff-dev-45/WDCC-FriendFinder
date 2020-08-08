import { useState } from 'react'
import MyQR from './MyQR'

/* eslint-disable no-unused-vars */
const MenuItem = ({ children, href, onClick }) =>
  <a
    href={href}
    onClick={onClick && (ev => onClick(ev))}
    class="block mt-4 mb-4 sm:inline-block lg:inline-block lg:mt-0 lg:mb-0 text-white mr-4 hover:underline"
  >
    {children}
  </a>

const buttonStyle = {
  color: 'white',
  border: '1px solid white',
  fontSize:'14px'
}

function Header ({ user, loading }) {
  const [qrShown, setQrShown] = useState(false)

  return (
    <>
      {qrShown && <MyQR user={user} onClick={() => setQrShown(false)}></MyQR>}
      <header style={{backgroundColor:'#2F6A8F',position:'fixed',top:0,left:0,zIndex:1,width:'100vw'}}>
        <nav class="flex items-center p-6 flex-wrap sm:flex-nowrap">
          <div class="flex items-center flex-shrink-0 text-white mr-6">
            <img class="fill-current w-8 mr-2"  src='/logo.png'></img>
            <a href='/'>
              <span class="font-semibold text-xl tracking-tight">
                    Friender
              </span>
            </a>
          </div>
          <div class="w-full block flex items-center flex-nowrap sm:w-auto">
            <div class="text-sm flex">
              <MenuItem onClick={() => setQrShown(true)}>Show My QR</MenuItem>
              <MenuItem href=''>Add A Friend</MenuItem>
            </div>
            <div>
              <a href='/api/logout'>
                <button className="py-2 px-4 rounded-md focus:outline-none border-none" style={buttonStyle}>
                      Log Out
                </button>
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
    
  


export default Header
