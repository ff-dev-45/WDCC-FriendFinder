import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import SplashLayout from '../components/SplashLayout'
import Map from './newworkingmap'
import Header from '../components/header'
import AddLocationTracking from '../components/AddLocationTracking'

function Home () {
  // set required to true to force the page to require login.
  const { user, loading } = useFetchUser({ required: false })

  return (
    <Layout user={user} loading={loading}>
      {loading && <p>Loading login info...</p>}
      {!loading && !user && <SplashLayout/>}
      {user && <>
        <Header user={user}/>
        <AddLocationTracking user={user}/>
        <Map user={user}/>
      </>}
    </Layout>
  )
}

export default Home
