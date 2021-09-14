/**
 * Created by KhanhNQ on 14/02/2017.
 *
 * @format
 */

 import kttvWorker from '../utils/kttvWorker';
 import { Constants, Languages } from '../utils/Omni';
 import { combineReducers } from 'redux';


 const types = {
    OPEN_AWS_MODAL :'OPEN_AWS_MODAL',
    CLOSE_AWS_MODAL:'CLOSE_AWS_MODAL',

    GET_MOBILE_TABLE_PENDING:'GET_MOBILE_TABLE_PENDING',
   GET_MOBILE_TABLE_SUCCESS:'GET_MOBILE_TABLE_SUCESS',
   GET_MOBILE_TABLE_FAILURE:'GET_MOBILE_TABLE_FAILURE',

    
 };
 
 export const actions = {

  openAWSModal : ()=>{
    return ({
      type: types.OPEN_AWS_MODAL
    })
  },
  closeAWSModal :()=>{
    return ({
      type:types.CLOSE_AWS_MODAL
    })
  },

   
   getMobileTable: params => (dispatch, getState) => {
    const { statistic: newsState } = getState();
    const { lastGetTime, isFetching } = newsState;
    const prevGettingTime = lastGetTime;
    const now = Date.now();
    const { interval, timeout } = Constants;

    // if (
    //   (force && (!isFetching || now - prevGettingTime > timeout)) ||
    //   now - prevGettingTime > interval
    // ) {
      dispatch({ type: types.GET_MOBILE_TABLE_PENDING, now });
      kttvWorker
        .getMobileTable(params)
        .then(json => {
          if (json === undefined || json.error || !json.Data) {
            dispatch({
              type: types.GET_MOBILE_TABLE_FAILURE,
              error: Languages.GetDataError,
            });
          } else {
            dispatch({
              type: types.GET_MOBILE_TABLE_SUCCESS,
              json: json.Data,
            });
          }
        })
        .catch(() => {
          dispatch({
            type: types.GET_MOBILE_TABLE_FAILURE,
            error: Languages.GetDataError,
          });
        });
    },

    
  //},
 };
 


 //reducer

 const initialMobileTableState = {
     
    data: [],
    lastGetTime: 0,
    isFetching: false,
  };
  
   const tableDataReducer = (state = initialMobileTableState, action) => {
    const { type } = action;
  
    switch (type) {
      case types.GET_MOBILE_TABLE_PENDING:
        return {
          ...state,
          lastGetTime: action.now,
          isFetching: true,
        };
  
      case types.GET_MOBILE_TABLE_SUCCESS:
        return {
          ...state,
          
          data: action.json,
          isFetching: false,
        };
  
      case types.GET_MOBILE_TABLE_FAILURE:
        return {
          ...state,
          isFetching: false,
        };
      default:
        return state;
    }
  };

  
  const initialAWSModalState = {
    isVisible: false,
  };
  
   const awsModalReducer = (state = initialAWSModalState, action) => {
    const { type } = action;
  
    switch (type) {
      case types.OPEN_AWS_MODAL:
        return {
          ...state,
          isVisible:true
        };
  
      case types.CLOSE_AWS_MODAL:
        return {
          ...state,
          isVisible:false
        };
  
     
      default:
        return state;
    }

    
  };
 
 
 export const reducer= combineReducers({tableDataReducer,awsModalReducer})