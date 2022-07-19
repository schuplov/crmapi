// packages
const express = require('express')
const cors = require('cors')

// routers
const authRouter = require('./routers/authRouter')
const adminRouter = require('./routers/adminRouter')
const businessRouter = require('./routers/businessRouter')
const apiRouter = require('./routers/apiRouter')
// server config (port)
const {port} = require("./config/config.server");

// creating express app
const app = express()
app.use(cors());
app.use(express.json({ extended: true }))



// adding routes
app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/business', businessRouter)


// public api
app.use('/api', apiRouter)

// start web server API
const start = async () => {
  try {
    app.listen(port, () => console.log('💾 👊 API CRM | Server started on ' + port))
  } catch (e) {
    console.log(e)
  }
}

start()