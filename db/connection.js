import mysql from 'mysql';
import { db } from '../config.js'

let connection

function handleDisconnect() {
    connection = mysql.createConnection(db)

    connection.connect((err)=>{
        if(err) {
            console.log('Error when connecting to Database: ', err)
            setTimeout(handleDisconnect, 1000)
        }
    })

    connection.on('error', (err)=>{
        console.log('Database error: ', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleDisconnect()
        }
        else throw err
    })

    setInterval(()=>{
        connection.query('Select 1')
    }, 4000)

    return connection
}

export default handleDisconnect