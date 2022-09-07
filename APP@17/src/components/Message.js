import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

function Message() {
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8000");

    socketRef.current.on("hex", (message) => {
      setChat([...chat, message]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const renderChat = () => {
    return chat.map((message, index) => (
      <div key={index}>
        <h1>.</h1>
        <div className="message-blue">
          <span className="message-content">{message}</span>
          <div className="message-timestamp-left time">
            {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="message-container ">
      <div>{renderChat()}</div>
    </div>
  );
}

export default Message;
