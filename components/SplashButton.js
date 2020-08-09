export const SplashButton = () => {
  const buttonStyle = {
    color: 'white',
    backgroundColor: '#2F6A8F'
  }
  
  return (
    <a href='/api/login'>
      <button className="text-white py-2 px-4 rounded-md focus:outline-none" style={buttonStyle}>
        Get Started
      </button>
    </a>
  )
}

export default SplashButton