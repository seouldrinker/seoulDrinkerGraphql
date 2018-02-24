import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'


// [database]
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import { DB_URL, SESSION_SECRET } from './config'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

const app = express()
const port = 8002

// [routes]
import index from './routes/index'
app.use('/', index)

// [DB Config]
const MongoStore = connectMongo(session)

const db = mongoose.connect(DB_URL, { useMongoClient: true })
mongoose.Promise = global.Promise
mongoose.set('debug', true)
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, "Connected to mongod server"))

import schema from './graphql'
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// [config - logs, cookie, cors, route, exception]
app.use(morgan('combined', {
  stream: fs.createWriteStream(
    path.join(__dirname + '/../logs', 'access.log'), { flags: 'a' }
  )
}))
app.use(session({
  secret: SESSION_SECRET,
  cookie: { maxAge: 300000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  fallbackMemory: false
}))
app.use(cookieParser())
app.use(cors())

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
