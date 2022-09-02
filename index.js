const express = require('express')
const cors = require('cors')
const updateESP = require('./middlewares/mqtt')
const multer  = require('multer');
require('dotenv').config()
const fileSystem = require('./utils/muler');
const deleteBin = require('./middlewares/deletebin');

const PORT = process.env.PORT ||5000

const storage=fileSystem()
let upload = multer({storage:storage})

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:false})) //all the form info available
app.set('view-engine','ejs')

//coming post request from client to update the codes
app.post('/updateesp',updateESP,(req,res)=>{
  res.json({status:true,message:"success",publish:true})
})

app.put('/upload', upload.single('file'), function(req, res) { res.send({status:true});});

app.post('/deletebin',  function(req, res) { 
  let status = deleteBin(req,res)
  if(status === true){res.send({status:true,message:"Successfully Deleted."})}
  else{res.send({status:false,message:"Error occurs."})}
});

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

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.render('404.ejs');
});

