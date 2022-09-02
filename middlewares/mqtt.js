const mqtt = require('mqtt')

const updateESP = function (req, res, next) {
  // const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
  // const { host, publishMessage, message, clientId } = req.body;

  const host = "tcp://test.mosquitto.org"
  const publishMessage = "myiotdevice"
  const message = "update"
  const clientId = "test_id_mqtt_#AFF"

  let { username, password } = req.body;
  if (password === process.env.PASSWORD && username === process.env.USER_NAME) {
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

    const client = mqtt.connect(host, options)

    client.on('error', function (err) {
      client.end()
    })

    client.on('connect', function () {
      client.publish(`${publishMessage}`, message);
      client.end()
    })

    client.on('message', function (topic, message, packet) {
      console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
      //Future
    })

    client.on('close', function () {
      // console.log(clientId + ' disconnected')
    })
    next()
  }
  else {
    return res.send({
      status: false,
      message: "Ivaild credentials"
    })
  }
}

module.exports = updateESP;