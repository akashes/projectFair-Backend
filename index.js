//Loads .env file contents into process.env 
require('dotenv').config()

const express = require('express')
const cors = require('cors')


const router = require('./Router/route')

const appMiddleware = require('./Middlewares/appMiddleware')
const jwtMiddleware=require('./Middlewares/jwtMiddleware')
//create a backend application using express
const pfServer = express()

const db = require('./db/connection')
pfServer.use(cors(
//     {
//     origin:'http://localhost:3000'
// }
))

pfServer.use(express.json())

const PORT = 4000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Server started and listening in the port ${PORT}`);
})
// pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads')) // i think : means baseurl/uploads ileekku req vannal ./uploads(relative pos compared to this file) ile files will be server
//isnt pfServer.use(express.static('./uploads')) the same
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project Fair server started </h1>`)
})