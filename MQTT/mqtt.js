import mqtt from 'mqtt'
'use strict'

function updateESP(ip,message,updateMessage){
    const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
    const host = ip
    const options = {
      keepalive: 30,
      clientId: clientId,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
      rejectUnauthorized: false
    }
    
    //console.log('connecting mqtt client')
    const client = mqtt.connect(host, options)
    
    client.on('error', function (err) {
        client.end()
        return {
            status:-1,
            message:err};
    })
    
    client.on('connect', function () {
      console.log('client connected:' + clientId)
    // client.subscribe('topic', { qos: 0 }) for future use cases
      client.publish(`${message}`, updateMessage);
      
    })
    
    client.on('message', function (topic, message, packet) {
      console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
      //Future
    })
    
    client.on('close', function () {
      //console.log(clientId + ' disconnected')
      return {
        status:-1,
        message: "MQTT connection closed."
      }
    })

}

module.exports = updateESP();