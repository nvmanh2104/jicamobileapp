/**
 * Created by KhanhNQ on 14/02/2017.
 *
 * @format
 */

 import kttvWorker from '../utils/kttvWorker';
 import { Constants, Languages } from '../utils/Omni';
 import { combineReducers } from 'redux';


 const types = {
   GET_STATIONS_PENDING: 'GET_STATIONS_PENDING',
   GET_STATIONS_SUCCESS: 'GET_STATIONS_SUCCESS',
   GET_STATIONS_FAILURE: 'GET_STATIONS_FAILURE',

   GET_DATA_TABLE_PENDING:'GET_DATA_TABLE_PENDING',
   GET_DATA_TABLE_SUCCESS:'GET_DATA_TABLE_SUCESS',
   GET_DATA_TABLE_FAILURE:'GET_DATA_TABLE_FAILURE'
 };
 
 export const actions = {
   getStations: force => (dispatch, getState) => {
     const { aws: newsState } = getState();
     const { lastGetTime, isFetching } = newsState;
     const prevGettingTime = lastGetTime;
     const now = Date.now();
     const { interval, timeout } = Constants;
 
    //  if (
    //    (force && (!isFetching || now - prevGettingTime > timeout)) ||
    //    now - prevGettingTime > interval
    //  ) {
       dispatch({ type: types.GET_STATIONS_PENDING, now });
 
       kttvWorker
         .getStations()
         .then(json => {
           if (json === undefined || json.error || !json.items) {
             dispatch({
               type: types.GET_STATIONS_FAILURE,
               error: Languages.GetDataError,
             });
           } else {
             dispatch({
               type: types.GET_STATIONS_SUCCESS,
               json: json.items,
             });
           }
         })
         .catch(() => {
           dispatch({
             type: types.GET_STATIONS_FAILURE,
             error: Languages.GetDataError,
           });
         });
   //  }
   },
   getDataTable: params => (dispatch, getState) => {
    const { aws: newsState } = getState();
    const { lastGetTime, isFetching } = newsState;
    const prevGettingTime = lastGetTime;
    const now = Date.now();
    const { interval, timeout } = Constants;

    // if (
    //   (force && (!isFetching || now - prevGettingTime > timeout)) ||
    //   now - prevGettingTime > interval
    // ) {
      dispatch({ type: types.GET_DATA_TABLE_PENDING, now });
    debugger
      kttvWorker
        .getDataTable(params)
        .then(json => {
          if (json === undefined || json.error || !json.items) {
            dispatch({
              type: types.GET_DATA_TABLE_FAILURE,
              error: Languages.GetDataError,
            });
          } else {
            dispatch({
              type: types.GET_DATA_TABLE_SUCCESS,
              json: json.items,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: types.GET_DATA_TABLE_FAILURE,
            error: Languages.GetDataError,
          });
        });
    }
  //},
 };
 
 const initialStationState = {
     
   stations: [],
   lastGetTime: 0,
   isFetching: false,
 };
 
  const stationReducer = (state = initialStationState, action) => {
   const { type } = action;
 
   switch (type) {
     case types.GET_STATIONS_PENDING:
       return {
         ...state,
         lastGetTime: action.now,
         isFetching: true,
       };
 
     case types.GET_STATIONS_SUCCESS:
       return {
         ...state,
         stations: action.json,
         isFetching: false,
       };
 
     case types.GET_STATIONS_FAILURE:
       return {
         ...state,
         isFetching: false,
       };
     default:
       return state;
   }
 };




 const initialTableDataState = {
     
    data: [],
    lastGetTime: 0,
    isFetching: false,
  };
  
   const tableDataReducer = (state = initialTableDataState, action) => {
    const { type } = action;
  
    switch (type) {
      case types.GET_DATA_TABLE_PENDING:
        return {
          ...state,
          lastGetTime: action.now,
          isFetching: true,
        };
  
      case types.GET_DATA_TABLE_SUCCESS:
        return {
          ...state,
          data: action.json,
          isFetching: false,
        };
  
      case types.GET_DATA_TABLE_FAILURE:
        return {
          ...state,
          isFetching: false,
        };
      default:
        return state;
    }
  };
 
 export const reducer= combineReducers({stationReducer,tableDataReducer})