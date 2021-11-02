'use strict'
const awsIot = require('aws-iot-device-sdk')
const io = require('./server') // websocket server
const iwconfig = require('wireless-tools/iwconfig')

const TOPIC = 'wifi'

const device = awsIot.device({
privateKey: Buffer.from(process.env.AWS_PRIVATE_KEY, 'base64'),
clientCert: Buffer.from(process.env.AWS_CERT, 'base64'),
    caCert: Buffer.from(process.env.AWS_ROOT_CA, 'base64'),
  clientId: process.env.RESIN_DEVICE_UUID,
      host: process.env.AWS_DATA_ENDPOINT,
})

device.on('connect', function() {
  var data
  // subscribe to TOPIC mqtt topic
  device.subscribe(TOPIC)

  // publish reading on TOPIC
  setInterval(function () {
    iwconfig.status(process.env.INTERFACE || 'wlan0', function(err, status) {
      if (err)
        return err

      data = {
        deviceName: process.env.RESIN_DEVICE_NAME_AT_INIT ,
        deviceUUID: process.env.RESIN_DEVICE_UUID,
        reading: status.quality,
        ts: Date.now()
      }
      device.publish(TOPIC, JSON.stringify(data))
    })
  }, process.env.INTERVAL || 3000)
})

// receive all messages & forward them to all browser clients
device.on('message', function(topic, payload) {
  console.log('message: ', topic, payload.toString())
  io.sockets.emit('data', JSON.parse(payload.toString()))
})
