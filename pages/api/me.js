import auth0 from '../../lib/auth0'
import nextConnect from 'next-connect'
import mongodb from '../../middleware/database'

const handler = nextConnect()

handler.use(mongodb)

// fetch user auth data. stores user in database
handler.get(async (req, res) => {
  const session = await auth0.getSession(req)
  if (session == null || session.user == null) {
    res.json('null')
    return
  }
  const { user } = session
  const userid = user.sub

  await req.db.collection('users').update({ userid }, {
    $set: {
      userid,
      firstname: user.given_name,
      lastname: user.family_name,
      nickname: user.nickname,
    },
    $setOnInsert: {
      friends: [],
    },
  }, { upsert: true })

  res.json(user)
})

handler.post(async (req, res) => {
  const session = await auth0.getSession(req)
  if (session == null || session.user == null) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' })
  }
  const { user } = session
  const userid = user.sub

  if (req.body == null) {
    return res.status(400).json({ status: 'error', message: 'No body provided' })
  }

  const { firstname, lastname, nickname, friends } = req.body
  if ((firstname != null && typeof firstname !== 'string')
      || (lastname != null && typeof lastname !== 'string')
      || (nickname != null && typeof nickname !== 'string')
      || (friends != null && (!Array.isArray(friends) || !friends.every(f => typeof f === 'string')))) {
    return res.status(400).json({ status: 'error', message: 'Invalid parameter type' })
  }

  const safeData = {}
  if (firstname != null) safeData.firstname = firstname
  if (lastname  != null) safeData.lastname  = lastname
  if (nickname  != null) safeData.nickname  = nickname
  if (friends   != null) safeData.friends   = friends

  try {
    await req.db.collection('users').updateOne({ userid }, { $set: safeData })
    return res.json({ status: 'ok' })
  } catch (e) {
    return res.json({ status: 'error', message: e.message })
  }
})

export default handler
