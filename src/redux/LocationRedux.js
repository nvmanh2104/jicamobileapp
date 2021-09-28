import kttvWorker from '../utils/kttvWorker';
import {Constants} from '../utils/Omni';
import {combineReducers} from 'redux';
import {parseLocationAddress} from '../utils/address';
import {checkLoading} from './common';
import {convert2String} from '../utils/asyncStorage'

const types = {
  OPEN_SETTING_MODAL: 'OPEN_SETTING_MODAL',
  CLOSE_SETTING_MODAL: 'CLOSE_SETTING_MODAL',
  TOGGLE_LANGUAGE: 'TOGGLE_LANGUAGE',

  GEOLOCATION_UPDATED: 'GEOLOCATION_UPDATED',
  GETTING_GEOLOCATION_ADDRESS: 'GETTING_GEOLOCATION_ADDRESS',
  UPDATE_GEOLOCATION_ADDRESS: 'UPDATE_GEOLOCATION_ADDRESS',
  GET_GEOLOCATION_ADDRESS_ERROR: 'GET_GEOLOCATION_ADDRESS_ERROR',

  SAVE_LOCATION: 'SAVE_LOCATION',
  REMOVE_LOCATION: 'REMOVE_LOCATION',
  REMOVE_LOCATION_INDEX: 'REMOVE_LOCATION_INDEX',
};

const getSavedGeolocation = state => {
  return state.savedLocations[0];
};

const isSameLocation = (locationA, locationB) => {
  return (
    locationA.latitude === locationB.latitude &&
    locationA.longitude === locationB.longitude &&
    locationA.addresText === locationB.addresText
  );
};

export const actions = {
  openSettingModal: () => {
    return {
      type: types.OPEN_SETTING_MODAL,
    };
  },
  closeSettingModal: () => {
    return {
      type: types.CLOSE_SETTING_MODAL,
    };
  },
  toggleLanguage: () => {
    return {
      type: types.TOGGLE_LANGUAGE,
    };
  },


  saveLocation: location => (dispatch, getState) => {
    const { locationReducer } = getState();
    const index = locationReducer.locationAdressReducer.savedLocations.findIndex(item => isSameLocation(item, location));
    if (index < 0) {
      dispatch({ type: types.SAVE_LOCATION, location });
      // dispatch(weatherActions.getSavedLocationsCurrentWeather());
    }
  },
  removeLocation: location => (dispatch, getState) => {
    const { locationReducer } = getState();
    const removingIndex = locationReducer.locationAdressReducer.savedLocations.findIndex(item =>
      isSameLocation(item, location)
    );

    if (removingIndex > -1) {
      dispatch({ type: types.REMOVE_LOCATION_INDEX, index: removingIndex });
      
    }
  },

  getGeolocationAddress: location => (dispatch, getState) => {
    const {locationReducer} = getState();
    if (
      location &&
      location.latitude &&
      location.longitude &&
      !checkLoading(locationReducer.gettingGeolocationAddress)
    ) {
      dispatch(actions.gettingLocationAddress);
      kttvWorker
        .getLocationAddress(location)
        .then(data => {
          // log(data.data.features[0]);
          if (
            data === undefined ||
            data.error ||
            !data.data ||
            !data.data.features ||
            !data.data.features[0]
          ) {
            dispatch({
              type: types.GET_GEOLOCATION_ADDRESS_ERROR,
            });
          } else {
            const {addressText, state, district, ward} = parseLocationAddress(
              data.data.features[0],
            );

            dispatch({
              type: types.UPDATE_GEOLOCATION_ADDRESS,
              latitude: location.latitude,
              longitude: location.longitude,
              addressText,
              state,
              district,
              ward,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: types.GET_GEOLOCATION_ADDRESS_ERROR,
          });
        });
    }
  },

  gettingLocationAddress: {
    type: types.GETTING_GEOLOCATION_ADDRESS,
    now: Date.now(),
  },
};

//-------------reducer
const initialSettingModalState = {
  isVisible: false,
};

const settingModalReducer = (state = initialSettingModalState, action) => {
  const {type} = action;

  switch (type) {
    case types.OPEN_SETTING_MODAL:
      return {
        ...state,
        isVisible: true,
      };

    case types.CLOSE_SETTING_MODAL:
      return {
        ...state,
        isVisible: false,
      };

    default:
      return state;
  }
};

const initialLanguage = {
  isEn: false,
};

const languageReducer = (state = initialLanguage, action) => {
  const {type} = action;

  switch (type) {
    case types.TOGGLE_LANGUAGE:
      return {
        ...state,
        isEn: !state.isEn,
      };

    default:
      return state;
  }
};

const initalLocation = {
  gettingGeolocationAddress: 0,
  savedLocations: [
    {
      latitude: 0,
      longitude: 0,
      addressText: '',
    },
  ],
};

const locationAdressReducer = (state = initalLocation, action) => {
  const { type, location } = action;

  let { savedLocations } = state;
  let geolocation;

  switch (type) {
    case types.SAVE_LOCATION:
      let copyLocation = [...savedLocations]
      copyLocation.push(location);
      convert2String(Constants.asyncStorageKey.location,copyLocation)
      return {
        ...state,
        savedLocations:copyLocation
      };
    case types.REMOVE_LOCATION_INDEX:
      let copy2Location = [...savedLocations]
      copy2Location.splice(action.index, 1);
      convert2String(Constants.asyncStorageKey.location,copy2Location)
      return {
        ...state,
        savedLocations:copy2Location
      };

      /// current location
      case types.GET_GEOLOCATION_ERROR:
      geolocation = {
        latitude: 0,
        longitude: 0,
        addressText: '',
      };
      savedLocations[0] = geolocation;
      return {
        ...state,
        savedLocations,
      };
    case types.GETTING_GEOLOCATION_ADDRESS:
      return {
        ...state,
        gettingGeolocationAddress: action.now,
        // addressError: false,
      };
    case types.UPDATE_GEOLOCATION_ADDRESS:
      geolocation = {
        ...savedLocations[0],
        addressText: action.addressText,
        state: action.state,
        district: action.district,
        ward: action.ward,
        latitude:action.latitude,
        longitude:action.longitude
      };
      let copy3Location = [...savedLocations]
      copy3Location[0] = geolocation;
      convert2String(Constants.asyncStorageKey.location,copy3Location)
      return {
        ...state,
        savedLocations:copy3Location,
      };
    case types.GET_GEOLOCATION_ADDRESS_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }

};

// const initalSavedLocation = {
//   gettingGeolocationAddress: 0,
//   currentLocation: [
//     {
//       latitude: 0,
//       longitude: 0,
//       addressText: '',
//     },
//   ],
// };

// const currentLocationReducer = (state = initalSavedLocation, action) => {
//   const { type, location } = action;

//   let { currentLocation } = state;
//   let geolocation;

//   switch (type) {
   
//     case types.GET_GEOLOCATION_ERROR:
//       geolocation = {
//         latitude: 0,
//         longitude: 0,
//         addressText: '',
//       };
//       currentLocation[0] = geolocation;
//       return {
//         ...state,
//         currentLocation,
//       };
//     case types.GETTING_GEOLOCATION_ADDRESS:
//       return {
//         ...state,
//         gettingGeolocationAddress: action.now,
//         // addressError: false,
//       };
//     case types.UPDATE_GEOLOCATION_ADDRESS:
//       geolocation = {
//         ...currentLocation[0],
//         addressText: action.addressText,
//         state: action.state,
//         district: action.district,
//         ward: action.ward,
//         latitude:action.latitude,
//         longitude:action.longitude
//       };
//       currentLocation[0] = geolocation;
//       return {
//         ...state,
//         currentLocation,
//       };
//     case types.GET_GEOLOCATION_ADDRESS_ERROR:
//       return {
//         ...state,
//       };

//     default:
//       return state;
//   }
// };


export const reducer = combineReducers({settingModalReducer, languageReducer,locationAdressReducer});
