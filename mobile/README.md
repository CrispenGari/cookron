### cookron

Building mobile app:

First you need to install `eas-cli` by running the following command:

```shell
npm install --global eas-cli
```

After that you need to login using the command:

```shell
eas login
```

> When you are loging in you use your [`expo.dev`]https://expo.dev/eas() credentials.

You can check if you are logged in or not using the command:

```shell
eas whoami
```

Then you can configure the build as follows

```shell
eas build:configure
```

The above command will create an `eas.json` which looks as follows:

```json
{
  "cli": {
    "version": ">= 3.12.1"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

To create a `apk` for android run:

```shell
eas build -p android --profile preview
```

Building for ios:

```shell
expo build ios
```

### Refs

1. [expo.dev](https://expo.dev/eas)
