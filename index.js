require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const userRouter = require('./routers/userRouter')
const socket = require('./socket/socket')
const msgRouter = require('./routers/msgRouter')
require('./configs/dbConnect')()

const corsOptions = {
    origin: 'https://node-chat-app-if.vercel.app', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));

// app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'from server' })
})

app.use(userRouter)
app.use(msgRouter)

const server = app.listen(5000, () =>
    console.log('Server is listening on: http://localhost:5000'))

socket(server)