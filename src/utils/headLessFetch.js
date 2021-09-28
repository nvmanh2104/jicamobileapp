
import Constants from './Constants';
import kttvWorker from './kttvWorker';
import { log } from './log';

import { getStoredItem, setStoredItem } from './asyncStorage';
import { isFired } from './newChecker';
const { asyncStorageKey } = Constants;


export const headlessGetNews = () => {
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

