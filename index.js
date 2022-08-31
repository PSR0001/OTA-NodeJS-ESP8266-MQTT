import express from 'express'
import {updateESP} from './MQTT/mqtt'
const app = express()
const PORT = process.env.PORT ||3000

app.use(express.static('public'))

app.get('/lol', (req, res) => {
  res.send('Hello World!')
})

//coming post request from client to update the codes
app.post('/updateesp',(req,res)=>{
    try{const host ='mqtt://test.mosquitto.org';
    const message = "/subupdateesp";
    const updateMessage  = "Update"
    updateESP(host, message, updateMessage)
    res.json({
        status:true,
        message:"success"
    })
}
catch(err){
    console.log(err);
    res.json({
        status:false,
        message:"not send"
    })
}
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})





