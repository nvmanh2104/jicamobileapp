/**
 * @format
 */
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {AppRegistry,Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
    headlessGetNews,
  } from './src/utils/headLessFetch';
  import BackgroundFetch from "react-native-background-fetch";

PushNotification.configure({
    onRegister: function (token) {
    //   console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
    //   console.log("NOTIFICATION:", notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
    //   console.log("ACTION:", notification.action);
    //   console.log("NOTIFICATION:", notification);
    },

    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: Platform.OS==='ios',
  });


  let MyHeadlessTask = async (event) => {
    // Get task id from event {}:
    let taskId = event.taskId;
    let isTimeout = event.timeout;  // <-- true when your background-time has expired.
    if (isTimeout) {
      // This task has exceeded its allowed running-time.
      // You must stop what you're doing immediately finish(taskId)
    //   console.log('[BackgroundFetch] Headless TIMEOUT:', taskId);
      BackgroundFetch.finish(taskId);
      return;
    }
    // console.log('[BackgroundFetch HeadlessTask] start: ', taskId);
  
    // Perform an example HTTP request.
    // Important:  await asychronous tasks when using HeadlessJS.
    headlessGetNews()
    // Required:  Signal to native code that your task is complete.
    // If you don't do this, your app could be terminated and/or assigned
    // battery-blame for consuming too much time in background.
    BackgroundFetch.finish(taskId);
  }
  
  // Register your BackgroundFetch HeadlessTask
  BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
