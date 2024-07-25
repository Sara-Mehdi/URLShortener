import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import bodyParser from 'body-parser'
import router from './app/routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
console.log('process.env.BACK_URL', process.env.BACK_URL)
app.use(router)

createConnection().then(() => {
    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(err => console.error('Failed to connect to PostgreSQL', err))
