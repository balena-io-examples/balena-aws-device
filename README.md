### Device boilerplate for balena

This is device code for the [AWS and balena integration](https://github.com/balena-projects/balena-aws-lambda).

### To Run

#### [Sign up with balena and connect a device](http://balena.io/docs/learn/getting-started)

#### Add a few balena app environment variables

```
AWS_REGION = "us-east-1"
```
```
LAMBDA = "your lambda endpoint responsible for provisioning devices"
```

* Clone this repository
```
https://github.com/balena-projects/balena-aws-device
```

* Add your balena application endpoint
```
git remote add balena <username>@git.balena-cloud.com:<username>/<appName>.git
```

* Push your code
```
git push balena master
```

Once your code downloads to the device it will automatically run your app. If the certificates needed to communicate with AWS aren't present it will post it's RESIN_DEVICE_UUID to LAMBDA for the [provisioning process](https://github.com/balena-projects/balena-aws-lambda) if the certificates do exist it will run the demo app.
