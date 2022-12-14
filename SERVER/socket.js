const express = require('express')
const app = express()
const http = require('http');
const { instrument } = require("@socket.io/admin-ui");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  },
});

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// testing 
 
  
  // Socket listening 
  try {
  
    io.on("connection", (socket) => {
  
      console.log(`User with id: ${socket.id} connected!`);
  
      socket.on("disconnect", () => {
        console.log(`User with id: ${socket.id} disconnected`);
      });
    
  
      // io.emit("Chart-Data",message)
      socket.on("IoT-Data", (data) => {
        // console.log(data);
        
        socket.broadcast.emit("Chart-Data", data);
      });

  
    });
  
    //admin-ui
    instrument(io, { auth: false });
  } catch (error) {
    console.log(`Could not start the server, ${error}`);
  }
  