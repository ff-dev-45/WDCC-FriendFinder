import auth0 from '../../lib/auth0'
import nextConnect from 'next-connect'
import mongodb from '../../middleware/database'

const handler = nextConnect()
handler.use(mongodb)

handler.get(async (req, res) => {
  const session = await auth0.getSession(req)
  if (session == null || session.user == null) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' })
  }
  const { user } = session
  const userid = user.sub

  const friendAdded = req.query.sub
  if (friendAdded == null || friendAdded === '') {
    return res.status(400).json({ status: 'error', message: 'Friend not found' })
  }

  try {
    const currentUser = await req.db.collection('users').findOne({ userid })
    if (!currentUser.friends.includes(friendAdded)) {
      currentUser.friends.push(friendAdded)
      await req.db.collection('users').updateOne({ userid }, { $set: currentUser })
    }
    return res.json({ status: 'ok'})
  } catch (e) {
    return res.json({ status: 'error', message: e.message })
  }
})

export default handler
