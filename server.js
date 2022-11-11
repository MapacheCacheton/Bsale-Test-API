import { port , root} from './config.js'
import express from 'express'

// Routes
import mainRoutes from './routes/main.js'
import productRoutes from './routes/products.js'

// Server
const app = express()

// body-parser -> From Express 4.16+
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// App Routes
// app.use(mainRoutes)
app.use('/api/products',productRoutes)

// 404 Page
// app.get("*", (req, res) => {
//     res.render('404', { title: 'Oh no! a 404 :(' })
// })

// Server Running
app.listen(port, _ => console.log(`Server Running at: http://localhost:${port}/`))