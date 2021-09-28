
import { Constants } from './Omni';
import { getStoredItem } from './asyncStorage';
import {showNotification, handleCancel} from '../components/notification'
const { asyncStorageKey } = Constants;
export const isFired = (checkObj) => {
    getStoredItem(asyncStorageKey.news).then(news =>{ 
        if(news!==null){
            for(obj in news){
                if(checkObj.code ===news[obj].code){
                    
                    return 'true'
                }
            }
        }
        showNotification('News Message',checkObj.title)
        return 'false'
    })
    
  };
  