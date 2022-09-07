import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:8000");

const Message = () => {


  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState();
  const [smessage, setsmessage] = useState();

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      // console.log("socket connected");
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      // console.log("not connected");
    });

    socket.on('IoT-Data', (msg) => {
      setLastPong(new Date().toLocaleString() + '.');
      setsmessage(msg);
    });

console.log("useeffect");
  }, [0,1]);

  const sendPing = () => {
    socket.emit('IoT-Data', "Fan on");
  }


  function socketMessage() {

  }



  return (
    <div className="message-container">
      <br />
      {isConnected ?
      
      <p className='connectionOnline'></p>:
      <p className='connectionOffline'></p>
      }
        <p>{smessage || ' '}</p>
      <div>
        <p></p>
        <p className='time'> {lastPong || ' '}</p>
        <button onClick={sendPing}>Send ping</button>
      </div>


    </div>
  );
};

export default Message;
