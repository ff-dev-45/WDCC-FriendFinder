import nextConnect from 'next-connect'
import mongodb from '../../middleware/database'

const handler = nextConnect()

handler.use(mongodb)

// clear `users` and `locations` collections
handler.get(async (req, res) => {
  await req.db.collection('users').remove({})
  await req.db.collection('locations').remove({})
  req.db.collection('users').createIndex( { 'userid': 1 }, { unique: true } )
  req.db.collection('locations').createIndex( { 'userid': 1 }, { unique: true } )
  res.json({ message: 'ok' })
})

export default handler
