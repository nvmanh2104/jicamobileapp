/* eslint-disable */
import React from 'react';
// import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import {useNavigation} from '@react-navigation/native';
import AwsScreen from './screens/AwsScreen';
import RadarScreen from './screens/RadarScreen';
import SatelliteScreen from './screens/SatelliteScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import NewsScreen from './screens/NewsScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';
import SettingsScreen from './screens/SettingsScreen';
import Device from './utils/Device';
// import {Platform} from 'react-native';
import _IconIO from 'react-native-vector-icons/Ionicons';
import CustomIcon from './components/BottomBarIcon'
import settingLanguage from './utils/settingLanguage'

// Icon.loadFont();
// const tabBarOptions =
//   Platform.OS === 'ios'
//     ? {
//         showLabel: true,
//         showIcon: true,
//       }
//     : {
//         showIcon: true,
//         showLabel: true,
//       };
const StackNavigator = createStackNavigator();
function NewsStack() {
  return (
    <StackNavigator.Navigator initialRouteName="NewsScreen"
  screenOptions={{
    headerShown:false
  }}
    >
      <StackNavigator.Screen  name="NewsScreen" component={NewsScreen} />
      <StackNavigator.Screen
        name="NewsDetailScreen"
        component={NewsDetailScreen}
      />
    </StackNavigator.Navigator>
  );
}


// const lazyPlaceholder = () => ()

const Tabs = createBottomTabNavigator();

class AppNavigation extends React.PureComponent  {
  render(){
    return (
      <Tabs.Navigator
        tabBarOptions={{
          // ...tabBarOptions,
          style: {
            position: 'absolute',
          
            elevation: 0,
            backgroundColor: '#ffffff',
          
            height: Device.Window.height*0.1,
            
          },
          labelStyle: {
            //color: 'black',
            fontSize: 12,
            // ativceTintColor:'#48c94',
            // inactiveTintColor:'#e32f45',
            fontWeight:'700'
          },
        }}>
        <Tabs.Screen
          name="AWS"
          component={AwsScreen}
          options={{
            tabBarLabel: this.props.language? settingLanguage.MUA.VIE:settingLanguage.MUA.EN,
            tabBarIcon: ({color}) => {
              return <CustomIcon name='antennaWhite' size={25} color={color}/> 
            },
          }}
        />
        <Tabs.Screen name="Statistic" component={StatisticsScreen}
        lazy={true}
         options={{
          tabBarLabel: this.props.language? settingLanguage.THONGKE.VIE:settingLanguage.THONGKE.EN,
          tabBarIcon: ({color}) => {
            return <CustomIcon name='listWhite' size={25} color={color}/> 
          },
        }} />
        <Tabs.Screen name="News" component={NewsStack} 
        options={{
          tabBarLabel: this.props.language? settingLanguage.CANHBAO.VIE:settingLanguage.CANHBAO.EN,
          tabBarIcon: ({color}) => {
            return <CustomIcon name='notificationWhite' size={25} color={color}/> 
          },
        }}/>
        <Tabs.Screen name="Radar" component={RadarScreen}
        options={{
          tabBarLabel: 'Radar',
          tabBarIcon: ({color}) => {
            return <CustomIcon name='radarWhite' size={25} color={color}/> 
          },
        }} />
        <Tabs.Screen name="Satellite" component={SatelliteScreen} 
        options={{
          tabBarLabel: this.props.language? settingLanguage.VETINH.VIE:settingLanguage.VETINH.EN,
          tabBarIcon: ({color}) => {
            return <CustomIcon name='satelliteWhite' size={25} color={color}/> 
          },
        }}/>
         <Tabs.Screen name="Setting" component={SettingsScreen} 
        options={{
          tabBarLabel: this.props.language? settingLanguage.CAIDAT.VIE:settingLanguage.CAIDAT.EN,
          tabBarIcon: ({color}) => {
            return <_IconIO name = "settings-outline" size ={25} color={color}/> 
          },
        }}/>
        
      </Tabs.Navigator>
    );
  };
  
  }
  
const mapStateToProps = ({netInfo, locationReducer}) => ({
  // netInfo,
  language :locationReducer.languageReducer.isEn

});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
   
}
}

export default connect(mapStateToProps, undefined, mergeProps)(AppNavigation)
