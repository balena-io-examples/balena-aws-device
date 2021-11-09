## Device boilerplate for AWS IoT integration

This is device code for the [AWS and balena integration](https://github.com/balena-io-examples/balena-aws-lambda). It automates one-time device provisioning of an X.509 certificate and a permissions policy to publish data. The device then can connect to AWS IoT Core and publish application data.

The app reads WiFi link quality and publishes to the `wifi` MQTT topic.

## Setup

### Sign up with balena and connect a device

Follow the [getting started](https://www.balena.io/docs/learn/getting-started/raspberrypi3/nodejs/) instructions to create a fleet and connect a device to it.

### Set balena environment variables

Define the environment variables below at the fleet or device level, depending on if/how they vary across devices in the fleet.

| Name  | Value |
| ---- | ----- |
| AWS_DATA_ENDPOINT | AWS host for MQTT connection. See IoT Core console Settings > Device data endpoint, like `xxxxxxxxxxxxxx-ats.iot.us-east-1.amazonaws.com` |
| LAMBDA | AWS API Gateway HTTP endpoint to access the Lambda function, like `https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/resinLambda-development` |
| INTERFACE | Name of WiFi wireless interface; defaults to `wlan0` |
| INTERVAL | Data publishing interval in milliseconds; defaults to `3000` |


### Install the app

Clone this repository:
```
https://github.com/balena-io-examples/balena-aws-device
```

Push the code to your device:
```
balena push [fleet-name]
```

Once your code downloads to the device, it will run your app automatically. If the device environment variables for the AWS IoT Core certificate aren't present, the device will send an HTTP post with its RESIN_DEVICE_UUID to the Lambda endpoint to [provision](https://github.com/balena-io-examples/balena-aws-lambda) it. If the environment variables do exist, the device will use them to run the demo app and publish data to IoT Core.

![balenaEnvars](/docs/balenaEnvars.png)

Notice the certificate and key variables are base64 encoded to accommodate use as environment variables.
