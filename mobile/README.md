### cookron

Building mobile app:

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
