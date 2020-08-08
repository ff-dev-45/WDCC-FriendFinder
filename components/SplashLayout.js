import SplashButton from './SplashButton'

export const SplashLayout = () => {
  const bodyStyle = {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBFBFC',
    textAlign: 'center',
  }

  const logoStyle = {
    width: '100px',
  }
  
  return (
    <body style={bodyStyle}>
      <img src="/logo.png" style={logoStyle}></img>
      <h1>Welcome to Friender!</h1>
      <h2 style={{fontSize:'16px', marginBottom: '10px'}}>
        A quick and convenient way to find your friends on campus!
      </h2>
      <SplashButton/>
      <div style={{height:'30px'}}></div>
    </body>
  )
}

export default SplashLayout