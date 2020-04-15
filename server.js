const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const myDbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ritzy_store',
})

myDbConnection.connect((err) => {
  if (!err) {
    console.log('Database connected successfully')
  } else {
    console.log('database connection failed', err)
  }
})

//Get all users
app.get('/users', (req, res) => {
  myDbConnection.query('SELECT * FROM users', (err, rows, fields) => {
    if (!err) {
      res.send(rows)
    } else {
      console.log(err)
    }
  })
})

//Get a user
app.get('/users/:id', (req, res) => {
  myDbConnection.query(
    'SELECT * FROM users WHERE id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows)
      } else {
        console.log(err)
      }
    }
  )
})
//register a new user
app.post('/users', (req, res) => {
  const first_name = req.body.firstName
  const last_name = req.body.lastName
  const phone_number = req.body.phoneNumber
  const email = req.body.email
  const gender = req.body.gender
  const birthday = req.body.birthday
  const shipping_address = req.body.shippingAddress
  const state = req.body.state
  const country = req.body.country
  const data = {
    first_name,
    last_name,
    phone_number,
    email,
    gender,
    birthday,
    shipping_address,
    state,
    country,
  }

  myDbConnection.query('INSERT INTO users SET ?', data, (err, rows, fields) => {
    if (!err) {
      res.send('new user registered')
    } else {
      console.log(err)
    }
  })
})

const port = process.env.PORT || 2000
app.listen(port, () => {
  console.log('server is up at port :' + port)
})
