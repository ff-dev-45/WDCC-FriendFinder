/* eslint-disable no-unused-vars */
import Head from 'next/head'

const mainStyles = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  left: 0,
  top: 0,
  zIndex: 1,
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexFlow: 'column nowrap'
}

function Layout ({ children }) {
  return (
    <>
      <Head>
        <title>Friender</title>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic' />
      </Head>
      <div id="main" style={mainStyles}>{children}</div>
    </>
  )
}

export default Layout
