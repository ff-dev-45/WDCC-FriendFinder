import nextConnect from 'next-connect'
import mongodb from '../../../middleware/database'

const handler = nextConnect()

handler.use(mongodb)

handler.get(async (req, res) => {
  const doc = await req.db.collection('users').findOne({userid: req.query.userid})
  res.json(doc || 'null')
})

export default handler
