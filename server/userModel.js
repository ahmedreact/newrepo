const jsonfile = require('jsonfile')
const path = require('path')

const user = {}
user.getUserByEmail = (email, done) => {
  const file = path.join(__dirname, 'data.json')
  jsonfile.readFile(file, (err, obj) => {
    for (var index in obj) {
      if (obj[index].email === email) {
        // console.log(obj[index])
        console.log('user found')
        return done(null, obj[index])
      }
    }
    console.log('user not found')
    return done('No affiliate found', null)
  })
}
user.compareUser = (user, password) => {
  if (!user) {
    return false
  }

  if (user.hasOwnProperty('password') && user.password === password) {
    console.log('password is correct')
    return true
  }
  console.log('password is incorrect')
  return false
}

module.exports = {
  user: user,
}
