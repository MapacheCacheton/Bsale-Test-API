import { port , root} from './config.js'
import express from 'express'
import cors from 'cors'

// Routes
import productRoutes from './routes/products.js'

// Server
const app = express()

// body-parser -> From Express 4.16+
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// CORS
app.use(cors())

// App Routes
app.use('/api/products',productRoutes)

// 404 Page
app.get("*", (req, res) => {
    res.status(404).send('Missing endpoint')
})

// Server Running
app.listen(port, _ => {})