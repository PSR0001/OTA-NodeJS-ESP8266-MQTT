const express = require('express')
const jwt = require('jsonwebtoken')

const cors = require('cors')
const updateESP = require('./middlewares/mqtt')
const multer = require('multer');
const path = require('path')
const app = express()
require('dotenv').config()
const fileSystem = require('./utils/muler');
const deleteBin = require('./middlewares/deletebin');
const http = require('http')
const { instrument } = require("@socket.io/admin-ui");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    // origin: ["http://localhost:3000","https://admin.socket.io","http://192.168.43.73:3000"],
    origine: ["http://192.168.43.73:3000"],
    credentials: true
  },
});


const PORT = process.env.PORT || 8000

const storage = fileSystem()
let upload = multer({ storage: storage })

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false })) //all the form info available
app.set('view-engine', 'ejs')
app.use('/static', express.static('public'))

//coming post request from client to update the codes
app.get('/updateesp', (req, res) => {
  //upload the file
  res.sendFile(path.join(__dirname, './Uploads', 'Blink.ino.bin'));

})

//upload the file
app.put('/upload', upload.single('file'), function (req, res) { res.send({ status: true }); });

//delete the file
app.post('/deletebin', function (req, res) {
  let status = deleteBin(req, res)
  if (status === true) { res.send({ status: true, message: "Successfully Deleted." }) }
  else { res.send({ status: false, message: "Error occurs." }) }
});

server.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })

app.post('/qr',(req,res)=>{
var token = jwt.sign(JSON.parse(req.body), process.env.TOKEN);
res.send({ token: token })
})

app.post('/handelESP',(req,res)=>{
  res.send({status:true})
})


app.post('/auth', function (req, res) {
  try {
    let username = req.body.username; let password = req.body.password;
    if (password === process.env.PASSWORD && username === process.env.USER_NAME) {
      res.render('Admin.ejs')
      // res.sendFile(path.join(__dirname, './Admin','index.html'));
      // res.sendFile(path.join(__dirname, './Admin','style.css'));
      // res.sendFile(path.join(__dirname, './Admin','script.js'));
    }
    else {
      res.render('alert.ejs')
    }
  }
  catch (err) { console.log(err); }
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
  res.render('404.ejs');
});

//start the server 
// testing 
let message = {
  message: "Fan On"
}

// Socket listening 
try {

  io.on("connection", (socket) => {
    console.log(`User with id: ${socket.id} connected!`);

    socket.on("disconnect", () => {
      console.log(`User with id: ${socket.id} disconnected`);
    });

    // io.emit("Chart-Data",message)
  //   socket.on("IoTData", (data) => {
  //     console.log("iotdata",data);
  //   socket.emit("IoTData", JSON.stringify(data));
    
  // });
    socket.on("hex", (data) => {
      console.log("hex",data);
    socket.broadcast.emit("hex", JSON.stringify(data));
    
  });

  });

  //admin-ui
  instrument(io, { auth: false });
} catch (error) {
  console.log(`Could not start the socket server, ${error}`);
}