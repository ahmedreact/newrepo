const express = require('express')

// const path = require('path')

const app = express()
const bodyParser = require('body-parser')
const userModel = require('./userModel.js').user
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

app.use('/app', express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.disable('x-powered-by')
app.use(require('express-session')({ secret: 'thingsthatwork' }))

passport.serializeUser((user, callback) => callback(null, user.email))
passport.deserializeUser((email, callback) => {
  userModel.getUserByEmail(email, (err, obj) => {
    callback(err, obj)
  })
})
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      console.log('authentication started')
      userModel.getUserByEmail(email, (err, obj) => {
        if (err) {
          return done(err)
        }
        if (!obj) {
          return done(null, false, { message: 'incorrect email!' })
        }
        if (!userModel.compareUser(obj, password)) {
          return done(null, false, { message: 'incorrect password' })
        }
        return done(null, obj)
      })
    },
  ),
)
//port configuration for production environment
const port = process.env.PORT || 3081
app.listen(port, () => {
  console.log('We are live on ' + port)
})

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

app.post('/api-test', (req, res) => {
  res.json({ a: 1, b: 2, c: 3 })
})

app.post(
  '/api/login',
  passport.authenticate('local', { failWithError: true }),
  (req, res, next) => {
    console.log('Sucess!')
    req.login(req.user, () => {
      const email = req.user.email
      const affiliateName = req.user.name
      console.log(affiliateName)
      res.cookie('affiliateName', affiliateName, {
        expires: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 30),
        path: '/',
        httpOnly: true,
      })
      res.end(
        JSON.stringify({
          success: true,
          affiliateName: affiliateName,
          email: email,
          token: email,
        }),
      )
    })
  },
  (err, req, res, next) => {
    res.send(401)
  },
)

app.post(
  '/api/login-with-token',
  (req, res, next) => {
    req.login(req.user, () => {
      const token = req.body.token
      const affiliateName = req.body.affiliateName
      const email = token
      res.cookie('affiliateName', affiliateName, {
        expires: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 30),
        path: '/',
        httpOnly: true,
      })
      res.end(
        JSON.stringify({
          success: true,
          affiliateName: affiliateName,
          email: email,
          token: email,
        }),
      )
    })
  },
  (err, req, res, next) => {
    res.send(401)
  },
)

const authenticationMiddleware = () => {
  console.log('middleware called')
  return (req, res, next) => {
    console.log('start')
    if (req.isAuthenticated()) {
      console.log('authenticated')
      return next()
    } else {
      console.log('not authenticated')
      res.send(401, 'Access Denied')
    }
  }
}

passport.authenticationMiddleware = authenticationMiddleware

app.get('/api/logout', passport.authenticationMiddleware(), (req, res) => {
  req.session.destroy()
  res.end(JSON.stringify({ session: 'destroyed' }))
})

app.get('/api/v1', passport.authenticationMiddleware(), (req, res) => {
  const affiliateName = req.body.affiliate
  res.json({ affiliateName: 'affiliateName' })
})

app.get(
  '/api/v1/:affiliate_id',
  passport.authenticationMiddleware(),
  (req, res) => {
    const affiliate_id = req.params.affiliate_id
    res.end(JSON.stringify({ sales: 3423423, CR: 0.3 }))
  },
)

