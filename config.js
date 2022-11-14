//Se importan 
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv'

config()

const port = process.env.PORT || 3000
const root = dirname(fileURLToPath(import.meta.url))
const db = {
    host: process.env.HOST || '',
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || ''
}

export { port, root, db , config}
