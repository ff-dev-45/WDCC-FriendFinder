import nextConnect from 'next-connect'
import mongodb from '../../../middleware/database'

const handler = nextConnect()

handler.use(mongodb)

handler.get(async (req, res) => {
  const doc = await req.db.collection('users').find({userid: req.query.userid}).toArray()
  // console.log(doc)
  res.json(doc)
})

export default handler