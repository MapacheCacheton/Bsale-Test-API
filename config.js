//Se importan 
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv'

config()

const port = process.env.PORT || 3000
const root = dirname(fileURLToPath(import.meta.url))
const db = {
    host: process.env.HOST || 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: process.env.USER || 'bsale_test',
    password: process.env.PASSWORD || 'bsale_test',
    database: process.env.DATABASE || 'bsale_test'
}

export { port, root, db , config}
