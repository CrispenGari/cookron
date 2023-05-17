```shell
eas build:configure
```

```shell
expo build ios
```

```shell
eas build -p android --profile preview
```

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