/* eslint-disable */

import * as React from 'react';
import { connect } from 'react-redux';
import { View, Platform, PermissionsAndroid } from 'react-native';
import { styleSet, colorSet } from './AppStyles';
import AppNavigation from './AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { actions as netInfoActions } from './redux/NetInfoRedux';
import {actions as locationActions} from './redux/LocationRedux';
import NetworkChecker from 'react-native-network-checker';

class Router extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {          
          loading: true,
          initialized: false,
        };
      }
      requestPermissionIOS(){
        Geolocation.requestAuthorization('always').then((res) => {
          if (res === 'granted') {
            this.getCurrentLocation();
          }
        });
      }
      async requestPermissionAndroid(){
        try {
          // console.log('vao_')
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Device current location permission',
              message: 'Turning on location services allow us to send weather warning, and show weather stations in your region',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log(granted)
            this.getCurrentLocation();
          } else {
            // console.log('Location permission denied');
          }
        } catch (err) {
          
        }
      }
      componentDidMount() {
        if (Platform.OS === 'ios') {
         this.requestPermissionIOS()
        }
        if (Platform.OS === 'android') {
          this.requestPermissionAndroid();
        } 
        }
      getCurrentLocation() {
        
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            this.props.getGeolocationAddress(position.coords)
           
          },
          error => {
            // console.log('map error: ', error);
            // console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
      
    static getDerivedStateFromProps(nextProps, prevState) {
      const newState = {};
      // if (!prevState.initialized){
      //   nextProps.renewConnectionStatus();
      //   nextProps.subscribeToConnectionStatus();

      //   newState.initialized = true;
      // }            
      return Object.keys(newState).length ? newState : null;
    }

      render() {               
        return (
          <NetworkChecker
          position="top"
          duration={2000} // In milliseconds
          notConnectedMessage="Not connected to Internet!"
          notConnectedTextColor="white"
          notConnectedBackgroundColor="grey"
          connectedMessage="Connected to Internet!"
          connectedTextColor="white"
          connectedBackgroundColor="green"
        >
          <NavigationContainer>
            <AppNavigation/>
          </NavigationContainer>
          </NetworkChecker>
        );
      }
}

const mapStateToProps = ({ netInfo }) => ({
  isConnected: netInfo.isConnected,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    // renewConnectionStatus: () => netInfoActions.renewConnectionStatus(dispatch),
    // subscribeToConnectionStatus: () => dispatch(netInfoActions.subscribeToConnectionStatus()),
    getGeolocationAddress: (params) => {
      dispatch(locationActions.getGeolocationAddress(params));
}
  }
} 

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Router);