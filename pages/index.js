import fetch from 'node-fetch'
import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import config from '../lib/config'
import Link from 'next/link'
import SplashLayout from '../components/SplashLayout'
import Map from './newworkingmap'
import Header from '../components/header'


const LinkA = ({ children, href }) =>
  <Link href={href}>
    <a className='pl-4 block pr-4 underline hover:text-white'>{children}</a>
  </Link>

function Home () {
  // set required to true to force the page to require login.
  const { user, loading } = useFetchUser({ required: false })

  const logEvent = async (type, value) => {
    const event = {
      name: user.nickname,
      type: type,
      value: value
      // date: added server side so we can't lie
    }
    await fetch(`${config.HOST}/api/events`, {
      method: 'post',
      body: JSON.stringify(event)
    })

    // TODO handle error if event cannot be posted.
    // TODO display feedback if event is ok
  }

  return (
    <Layout user={user} loading={loading}>

      {loading && <p>Loading login info...</p>}
      {!loading && !user && (
        <>
          <SplashLayout/>
        </>
      )}
      {user && (
        <>
          <Header user={user}/>
          <Map />
        </>
      )}
    </Layout>
  )
}

export default Home
