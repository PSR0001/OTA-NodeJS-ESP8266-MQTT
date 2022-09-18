import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const Test = () => {
  const [data, setData] = useState("No result");

  function getToken(qrdata) {

    fetch('http://192.168.43.73:8000/qr', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(qrdata),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  return (
    <>
      <div className="QR glass">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
              
              getToken(result?.text)
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "50px" }}
        />
        <div className="textArea">
          <p>{data}</p>
        </div>
      </div>
    </>
  );
};

export default Test;
