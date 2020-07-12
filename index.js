require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {ClientError, ServerError} = require('./services/errorhandling')

app.use(cors())
app.use(express.json())

app.use('/', express.static(path.join(__dirname, 'reactions')))

app.use('/api', require('./routes/routes'))





app.use((err, req, res, next) => {
  if (err instanceof ClientError || err instanceof ServerError) {
    res.status(err.status).json({
      message: err.message
    })
  } else {
    res.status(500).json({
      message: 'Unexpected Error Occurred'
    })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})
