# React Native
A library built by Facebook (like React) that allows us to develop applications that will run natively on web and mobile platforms.

Biggest difference between React Native and React under the hood is that rather than manipulating the DOM via the Virtual DOM like React does, it runs in the background and communicates directly with the native platform.

## Three teams to develop three applications to perform one task
* Web developers develop a web app.
* Android developers develop an android app.
* iOS developers develep an iOS app.

## Develop an application once that can perform as a native application (app) anywhere.
Develop an application in one language and it gets converted to the other platforms.

## Setup
* `npm install -g expo-cli`
* `expo init grubdash-native` - Choose the TypeScript configuration option

## Setting up ReactNative (same as with React)
* `npm install --save redux react-redux redux-thunk`
* `npm install --save-dev @types/redux @types/react-redux @types/redux-thunk`

## Setting up an Android emulator
* Download and install the Android Studio: `https://developer.android.com/studio`

## Components
Just like in React we can build our application using custom components. However we should no longer be utilizing html components. Instead of `<p>`, we should use `<Text>`. ReactNative converts it's own elements into Web/Android/iOS/tvOS/Windows/Android TV/etc components.

### Core Components
* `View` - Container for other components. necessary
* `Image` - A component for displaying images.
* `Text` - A component for displaying text.
* `TextInput` - A component for inputting text via a keyboard.
* `ScrollView` - Provides a scrolling container that can host multiple components and views
* `StyleSheet` - Provides an abstraction layer similar to CSS stylesheets (emulate css)

### User Interface
* `Button` - it's a button
* `Switch` - A toggle for booleans

### List Views
Unlike ScrollView, List Views only render what is actually on the screen.
* `FlatList` - renders good performance scrollable lists
* `SectionList` - same but for sectioned lists.

### Mobile Specific Components
Wrappers for commonly used Android or iOS things
#### Android
* BackHandler
* DrawerLayoutAndroid
* PermissionsAndroid
* ToastAndroid

#### iOS
* ActionSheetIOS

### AND MANY MORE
Obviously the above is not an exhaustive list, for an exhaustive list we should go to the [React Native API](https://reactnative.dev/docs/components-and-apis)