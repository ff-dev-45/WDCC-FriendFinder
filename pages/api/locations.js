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
  const data = req.body
  try {
    await req.db.collection('locations').updateOne({ userid: data.userid }, { $set: data }, { upsert: true })
    res.json({ message: 'ok' })
  } catch (e) {
    res.json({ message: 'error', e: e.message })
  }
})

export default handler
