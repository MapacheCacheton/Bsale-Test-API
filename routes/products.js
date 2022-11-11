import express from 'express'
import { root } from '../config.js'
import handleDisconnect from "../db/connection.js"

const TIMEOUT = 40000
let connection = handleDisconnect()

// Router Creation
const router = express.Router()

// Routes
router.get('/', (req, res) => {
    const {order, by} = req.query //order = ASC or DESC ----- by = name, price, discount
    const {page} = (req.query.page) ? req.query.page : 1 
    const order_by = (order && by) ? `ORDER BY p.${by} ${order}` : ''
    const offset = (page > 1) ? ((page-1) * 20) : 0
    console.log(order, by, offset);
    const query = {
        sql: `SELECT p.id, p.name, url_image, price, discount, c.name AS 'category' FROM product AS p, category AS c WHERE p.category = c.id ${order_by} LIMIT 20 OFFSET ? ;`,
        values: [offset]
    }

    connection.query(query, (err, rows)=>{
        if(err) throw err
        if(rows.length > 0){
            res.status(200).send({products: rows})
        }
        else res.status(404).send('No se encontraron registros')
    })
})

router.get('/:category', (req, res) =>{
    const {order, by} = req.query //order = ASC or DESC ----- by = name, price, discount
    const category = req.params.category
    const page = (req.query.page) ? req.query.page : 1 

    const order_by = (order && by) ? `ORDER BY p.${by} ${order}` : ''
    const offset = (page > 1) ? ((page-1) * 20) : 0

    const query = {
        sql: `SELECT p.id, p.name, url_image, price, discount, c.name AS 'category' FROM product AS p, category AS c WHERE p.category = c.id AND c.name = ? ${order_by} LIMIT 20 OFFSET ?;`,
        values: [category, offset]
    }
    connection.query(query, (err, rows) => {
        if(err) throw err
        console.log(rows);
        if(rows.length > 0){
            res.status(200).send({products: rows})
        }
        else res.status(404).send('No se encontraron registros')
    })
})

export default router
