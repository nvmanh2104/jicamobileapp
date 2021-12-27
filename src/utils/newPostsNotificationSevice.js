import Constants from './Constants';
import kttvWorker from './kttvWorker';


import { getStoredItem, setStoredItem } from './asyncStorage';
import { isFired } from './newChecker';
const { asyncStorageKey } = Constants;




const initNotifications = async () => {
    this.configureNotifications() // Configures PushNotification
  
    BackgroundFetch.registerHeadlessTask(this.headlessGetNews)
  
    BackgroundFetch.configure({
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true
    }, this.headlessGetNews,
      (error) => {
        // console.log(error, '[js] RNBackgroundFetch failed to start')
      })
  
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          // console.log('BackgroundFetch restricted')
          break
        case BackgroundFetch.STATUS_DENIED:
          // console.log('BackgroundFetch denied')
          break
        case BackgroundFetch.STATUS_AVAILABLE:
          // console.log('BackgroundFetch is enabled')
          break
      }
    })
  }

  headlessGetNews = () => {
    return getStoredItem(asyncStorageKey.news).then(news => {
      getStoredItem(asyncStorageKey.location,false).then (location =>{
        return kttvWorker
        .getWeatherNews(location)
        .then(json => {
          if (json && !json.error) {
            json.items.map(obj =>{
              isFired(obj)
            })
            
            return setStoredItem(Constants.asyncStorageKey.news, json.items).then(() => json.items);
          }
  
          return getStoredItem(asyncStorageKey.news);
        })
        .catch(() => getStoredItem(asyncStorageKey.news));
    });
      })
      
  };

  export {initNotifications}