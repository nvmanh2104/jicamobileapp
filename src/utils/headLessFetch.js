
import Constants from './Constants';
import kttvWorker from './kttvWorker';
import { log } from './log';

import { getStoredItem, setStoredItem } from './asyncStorage';
import { isFired } from './newChecker';
const { asyncStorageKey } = Constants;


export const headlessGetNews = () => {
// console.log('vao')
  return getStoredItem(asyncStorageKey.news).then(news => {
    getStoredItem(asyncStorageKey.location,false).then (location =>{
      return kttvWorker
      .getWeatherNews({search:location})
      .then(json => {
        // console.log(json)
        if (json && !json.error) {
          json.items.map(obj =>{
            isFired(obj)
            // console.log(obj)
          })
          
          return setStoredItem(Constants.asyncStorageKey.news, json.items).then(() => json.items);
        }

        return getStoredItem(asyncStorageKey.news);
      })
      .catch(() => getStoredItem(asyncStorageKey.news));
  });
    })
    
};

