//ES6 Syntax
//import express from 'express'
//import {updateESP} from './MQTT/mqtt'
//ES5 Syntax
const express = require('express')
const updateESP = require('./middlewares/mqtt')

const app = express()
const PORT = process.env.PORT ||5000

app.use(express.json())
app.use(express.static('public'))

app.get('/lol', (req, res) => {
  res.send('Hello World!')
})

//coming post request from client to update the codes
app.post('/updateesp',updateESP,(req,res)=>{
    res.json({
        status:true,
        message:"success"
    })
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})





