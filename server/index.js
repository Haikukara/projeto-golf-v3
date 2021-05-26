const express = require('express')
const cors = require('cors')

const db = require('./db')
const playerRouter = require('./routes/player-router')
const matchRouter = require('./routes/match-router')
const handicapruleRouter = require('./routes/handicaprule-router')

const app = express()
const apiPort = 3000

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', playerRouter)
app.use('/api', matchRouter)
app.use('/api', handicapruleRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
