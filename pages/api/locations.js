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
    return res.status(400).json({ status: 'error', message: 'No body provided' })
  }

  const { userid, position, timestamp } = req.body
  if (userid == null || position == null || timestamp == null) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing parameter. All of `userid`, `position`, `timestamp` are required'
    })
  }
  if (typeof userid !== 'string' || typeof position !== 'object' || typeof timestamp !== 'number') {
    return res.status(400).json({ status: 'error', message: 'Invalid parameter type' })
  }

  const { alt, lat, lng } = position
  if (lat == null || lng == null) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing parameter. All of `position.lat`, `position.lng` are required'
    })
  }
  if (typeof (alt || 0) !== 'number' || typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({ status: 'error', message: 'Invalid parameter type' })
  }

  const safeData = {
    userid,
    timestamp,
    position: { lat, lng, alt },
  }

  try {
    await req.db.collection('locations').updateOne({ userid }, { $set: safeData }, { upsert: true })
    return res.json({ status: 'ok' })
  } catch (e) {
    return res.json({ status: 'error', message: e.message })
  }
})

export default handler
