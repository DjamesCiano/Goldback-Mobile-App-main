# iOS Deployment

Below is what we run to deploy to the Apple Store

## 1. Init Command

You need the following:

* App ID: 306fdefb-4233-405d-a9e1-d50c457be03b

```terminal
% eas init -id 306fdefb-4233-405d-a9e1-d50c457be03b
```

## 2. Configure your Build

Run the command below:

```terminal
% eas build:configure --platform ios
```

You'll get a response like this:

```terminal
💡 The following process will configure your iOS and/or Android project to be compatible with EAS Build. These changes only apply to your local project files and you can safely revert them at any time.

🎉 Your project is ready to build.

- Run eas build when you are ready to create your first build.
- Once the build is completed, run eas submit to upload the app to app stores.
- Learn more about other capabilities of EAS Build: https://docs.expo.dev/build/introduction
```

## 3. Create Build

Run the following command:

```terminal
% eas build –-platform ios // This one does not work
% eas build --platform ios // This one does.  What's the difference?
```
