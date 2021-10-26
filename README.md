### Device boilerplate for balena

This is device code for the [AWS and balena integration](https://github.com/balena-io-examples/balena-aws-lambda). It automates one-time device provisioning an X.509 certificate and publish policy for a balena device. The device then can connect to AWS IoT Core and publish application data.

### Setup

#### [Sign up with balena and connect a device](http://balena.io/docs/learn/getting-started)

#### Set balena fleet environment variables

| Name | Value |
| ---- | ----- |
| AWS_DATA_ENDPOINT | See IoT Core console Settings > Device data endpoint, like `xxxxxxxxxxxxxx-ats.iot.us-east-1.amazonaws.com` |
| LAMBDA | API Gateway HTTP endpoint, like `https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/resinLambda-development` |

* Clone this repository
```
https://github.com/balena-io-examples/balena-aws-device
```

* Push your code
```
balena push [fleet-name]
```

Once your code downloads to the device, it automatically will run your app. If the environment variables for the IoT Core certificate aren't present, it will post its RESIN_DEVICE_UUID to the Lambda endpoint for the [provisioning process](https://github.com/balena-io-examples/balena-aws-lambda). If the environment variables do exist, it will run the demo app to publish data to IoT Core.
