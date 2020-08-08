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

export default handler
