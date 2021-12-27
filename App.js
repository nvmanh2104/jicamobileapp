/* eslint-disable */
import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import store from './src/configureStore';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import Router from './src/Router';
import BackgroundFetch from "react-native-background-fetch";
import NetworkChecker from 'react-native-network-checker';
// import {initNotifications} from './src/utils/newPostsNotificationSevice'
import {
  headlessGetNews,
} from './src/utils/headLessFetch';
import {log} from './src/utils/log';

class App extends React.Component {
  componentDidMount() {
    // Initialize BackgroundFetch ONLY ONCE when component mounts.
    // initNotifications()
    this.initBackgroundFetch()

  }

  async initBackgroundFetch() {
    // BackgroundFetch event handler.
    const onEvent = async (taskId) => {
      // console.log('[BackgroundFetch] task: ', taskId);
      //Do your background work...
      await this.addEvent(taskId);
      // IMPORTANT:  You must signal to the OS that your task is complete.
      BackgroundFetch.finish(taskId);
    }

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    const onTimeout = async (taskId) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    }

    // Initialize BackgroundFetch only once when component mounts.
    let status = await BackgroundFetch.configure({minimumFetchInterval: 15,
      stopOnTerminate:false,
      startOnBoot:true,
      enableHeadless:true,
      requiredNetworkType:BackgroundFetch.NETWORK_TYPE_ANY,


    }, onEvent, onTimeout);

    // console.log('[BackgroundFetch] configure status: ', status);
  }
  

  // Add a BackgroundFetch event to <FlatList>
  addEvent(taskId) {
    // Simulate a possibly long-running asynchronous task with a Promise.
    headlessGetNews()
  }

  render() {
    const persistor = persistStore(store);
    return (
 
      <Provider store={store}>
    
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
      
    );
  }
}


export default App;

