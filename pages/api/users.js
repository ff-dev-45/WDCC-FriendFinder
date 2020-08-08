import nextConnect from 'next-connect'
import mongodb from '../../middleware/database'

const handler = nextConnect()

handler.use(mongodb)

handler.get(async (req, res) => {
  // find returns a cursor which we need to iterate through to get the results.
  // use next or toArray
  const doc = await req.db.collection('users').find().toArray()
  console.log(doc)
  res.json(doc)
})

handler.post(async (req, res) => {
  const data = req.body
  try {
    await req.db.collection('users').insert(data)
    res.json({ message: 'ok' })
  } catch (e) {
    res.json({ message: 'error', e })
  }
})

export default handler