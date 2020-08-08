export const SplashButton = () => {
  const buttonStyle = {
    color: 'white',
    backgroundColor: '#79A2C2'

  }
  
  return (
    <a href='/api/login'>
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md" style={buttonStyle}>
        Get Started
      </button>
    </a>
  )
}

export default SplashButton