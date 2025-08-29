# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

```bash
npx expo start --tunnel
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Creating a App Store Deployable Build

```terminal
openssl rand -hex 32
1bda9042a9537bb576f0d617dea2605a31eaa983c410db1ce9908e776c30ff91
```

Password to be used `1bda9042a9537bb576f0d617dea2605a31eaa983c410db1ce9908e776c30ff91`.

```terminal
andressosa@Andress-MacBook-Pro Home % sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
Introduzca la contraseña del almacén de claves:  
Volver a escribir la contraseña nueva: 
¿Cuáles son su nombre y su apellido?
  [Unknown]:  Andres Sosa
¿Cuál es el nombre de su unidad de organización?
  [Unknown]:  Quadradia DevOps
¿Cuál es el nombre de su organización?
  [Unknown]:  Quadradia 
¿Cuál es el nombre de su ciudad o localidad?
  [Unknown]:  Spanish Fork 
¿Cuál es el nombre de su estado o provincia?
  [Unknown]:  UTAH
¿Cuál es el código de país de dos letras de la unidad?
  [Unknown]:  US
¿Es correcto CN=Andres Sosa, OU=Quadradia DevOps, O=Quadradia, L=Spanish Fork, ST=UTAH, C=US?
  [no]:  Si

Generando par de claves RSA de 2,048 bits para certificado autofirmado (SHA256withRSA) con una validez de 10,000 días
        para: CN=Andres Sosa, OU=Quadradia DevOps, O=Quadradia, L=Spanish Fork, ST=UTAH, C=US
[Almacenando my-upload-key.keystore]
```

## Calls to Create a Release Build

Go into the android folder and run:

1. Delete Android Folder

Only do this step for the first time.  Or if the build is not upgrading.  If you do delete it then make sure you copy the file `gradle.properties` in the Documents folder back into the `android` folder after you generate it in step 2.

Delete `android` folder.  Then run this command on step 2.

2. Run PreBuild

```terminal
% npx expo prebuild
```

2. Update the Build and Release

  - Go to the app.json file at the root of the project and add modify the following:

```json
"android": {
  "versionCode": 5,
  "versionName": "1.0.5",
  ...
}
```

3. Create a Private Public Key

This only needs to be done once.  The private key is found ![Here](../Documentation/my-upload-key.keystore).  This file is not stored in the repository for obvious reasons.

```terminal
% openssl rand -hex 32
```

move that file into the `android` folder.  You will have to update some configuration files.

4. Create the release build
```terminal
andressosa@Andress-MacBook-Pro android % npx react-native build-android --mode=release
```

5. Upload the build to the Play Store

Go to the console [here](https://play.google.com/console/u/0/developers/7162977863751352631/app-list?pli=1)

# iOS Deployments

A project has been created in https://expo.dev.  This produced the following:

```Text
npm install --global eas-cli && eas init --id 306fdefb-4233-405d-a9e1-d50c457be03b
```

The ID is very important `306fdefb-4233-405d-a9e1-d50c457be03b`.

Now run the expo command to get the code ready to build for iOS

```terminal
% eas build:configure --platform ios 
```

Now create the iOS build with the following command:

```Terminal
% eas build –platform ios
```
