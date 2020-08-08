import nextConnect from 'next-connect'
import mongodb from '../../middleware/database'

const handler = nextConnect()

handler.use(mongodb)

handler.get(async (req, res) => {
  // find returns a cursor which we need to iterate through to get the results.
  // use next or toArray
  const doc = await req.db.collection('locations').find().toArray()
  res.json(doc)
})

handler.post(async (req, res) => {
  if (req.body == null) {
    res.status(400).end('No body provided')
    return
  }

  const { userid, position, timestamp } = req.body
  if (userid == null || position == null || timestamp == null) {
    res.status(400).end('Missing parameter. All of `userid`, `position`, `timestamp` are required')
    return
  }
  if (typeof userid !== 'string' || typeof position !== 'object' || typeof timestamp !== 'number') {
    res.status(400).end('Invalid parameter type')
    return
  }

  const { alt, lat, lng } = position
  if (lat == null || lng == null) {
    res.status(400).end('Missing parameter. All of `position.lat`, `position.lng` are required')
    return
  }
  if (typeof (alt || 0) !== 'number' || typeof lat !== 'number' || typeof lng !== 'number') {
    res.status(400).end('Invalid parameter type')
    return
  }

  const safeData = {
    userid,
    timestamp,
    position: { lat, lng, alt },
  }

  try {
    await req.db.collection('locations').updateOne({ userid }, { $set: safeData }, { upsert: true })
    res.json({ message: 'ok' })
  } catch (e) {
    res.json({ message: 'error', e: e.message })
  }
})

export default handler
