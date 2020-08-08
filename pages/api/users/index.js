import nextConnect from 'next-connect'
import mongodb from '../../../middleware/database'

const handler = nextConnect()

handler.use(mongodb)

handler.get(async (req, res) => {
  // find returns a cursor which we need to iterate through to get the results.
  // use next or toArray
  const doc = await req.db.collection('users').find().toArray()
  res.json(doc)
})

handler.post(async (req, res) => {
  if (req.body == null) {
    return res.status(400).end('No body provided')
  }

  const { userid, firstname, lastname, nickname, friends } = req.body
  if (userid == null) {
    return res.status(400).end('Missing parameter, `userid` is required')
  }
  if (typeof userid != 'string'
      || (firstname != null && typeof firstname !== 'string')
      || (lastname != null && typeof lastname !== 'string')
      || (nickname != null && typeof nickname !== 'string')
      || (friends != null && (!Array.isArray(friends) || !friends.every(f => typeof f === 'string')))) {
    return res.status(400).end('Invalid parameter type')
  }

  const safeData = {}
  if (firstname != null) safeData.firstname = firstname
  if (lastname  != null) safeData.lastname  = lastname
  if (nickname  != null) safeData.nickname  = nickname
  if (friends   != null) safeData.friends   = friends

  try {
    await req.db.collection('users').updateOne({ userid }, { $set: safeData })
    res.json({ message: 'ok' })
  } catch (e) {
    res.json({ message: 'error', e: e.message })
  }
})

export default handler
