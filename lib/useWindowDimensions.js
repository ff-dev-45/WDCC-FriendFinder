import { useState, useEffect } from 'react'
import config from './config'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  const largeScreen = width > config.MIN_LARGE_SCREEN_WIDTH
  return { width, height, largeScreen }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
