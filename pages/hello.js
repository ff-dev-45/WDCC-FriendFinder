import Layout from '../components/layout'
import { Greet, Hello } from '../components/Hello'
import { MapContainer } from '../components/mapContainer'
import ReactDOM from 'react-dom'

// React Components can be very very terse
const name = 'Henry'
export default () =>
  <Layout>
    <article>
      <h1>React Hello World</h1>
      <Greet />
      <Hello name={name} />
    </article>
    <div>
      <MapContainer></MapContainer>
      <h1>Test</h1>
    </div>
  </Layout>
