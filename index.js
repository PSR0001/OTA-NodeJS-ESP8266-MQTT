const express = require('express')
const cors = require('cors')
const updateESP = require('./middlewares/mqtt')
const authenticate = require('./middlewares/authenticate')
require('dotenv').config()


const app = express()
const PORT = process.env.PORT ||5000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:false})) //all the form info available
app.set('view-engine','ejs')

//coming post request from client to update the codes
app.post('/updateesp',updateESP,(req,res)=>{
  res.json({status:true,message:"success",publish:true})
})

app.post('/upload',(req,res)=>{
  
})

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)})

app.post('/auth',function(req, res) {
  try{
    let username = req.body.username; let password = req.body.password;
    if (password === process.env.PASSWORD && username === process.env.USER_NAME) {

        res.render('Admin.ejs')
    }
    else {
      res.render('alert.ejs')
    }
}
catch(err){console.log(err); }
});



