import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'

// [routes]
import index from './routes/index'

// [database]
import { DB_URL, SESSION_DB_URL, SESSION_SECRET } from './config'

const app = express()
const router = express.Router()
const port = 3000

// [DB Config]
const MongoStore = connectMongo(session)

const db = mongoose.connect(DB_URL, { useMongoClient: true })
mongoose.Promise = global.Promise
mongoose.set('debug', true)
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, "Connected to mongod server"))

// config - logs, cookie, cors, route, exception
app.use(morgan('combined', {stream: fs.createWriteStream(path.join(__dirname + '/../logs', 'access.log'), {flags: 'a'})}))
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: SESSION_DB_URL })
}))
app.use(cookieParser())
app.use(cors())

// [route]
app.use('/', index)

// [error]
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    code: err.status || 500,
    message: err.message || 'Server error'
  })
})

const server = app.listen(port, () => {
  console.log('Express listening on port', port)
})
