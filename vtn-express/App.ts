import express from 'express'
import resourcesRouter from './public/routes/resources.route'

// Create the express app
const app = express()

app.use("/resources", resourcesRouter)

const server = app.listen(4321, () => {
  console.log('App is running at http://localhost:4321')
})

server.on('error', (err) => {
  console.error('Server failed to start:', err)
})
