/* eslint-disable */
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import AwsScreen from './screens/AwsScreen';
import RadarScreen from './screens/RadarScreen';
import SatelliteScreen from './screens/SatelliteScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import NewsScreen from './screens/NewsScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';
import {Platform} from 'react-native';
import {log} from './utils/log';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomIcon from './components/BottomBarIcon'
Icon.loadFont();
const tabBarOptions =
  Platform.OS === 'ios'
    ? {
        showLabel: true,
        showIcon: true,
      }
    : {
        showIcon: true,
        showLabel: true,
      };
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

const Tabs = createBottomTabNavigator();
export default MainTabs = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        // ...tabBarOptions,
        style: {
          position: 'absolute',
        
          elevation: 0,
          backgroundColor: '#ffffff',
        
          height: 55,
          
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
          tabBarLabel: 'AWS',
          tabBarIcon: ({color}) => {
            return <CustomIcon name='antennaWhite' size={25} color={color}/> 
          },
        }}
      />
      <Tabs.Screen name="Statistic" component={StatisticsScreen}
       options={{
        tabBarLabel: 'Dữ Liệu',
        tabBarIcon: ({color}) => {
          return <CustomIcon name='listWhite' size={25} color={color}/> 
        },
      }} />
      <Tabs.Screen name="News" component={NewsStack} 
      options={{
        tabBarLabel: 'Cảnh Báo',
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
        tabBarLabel: 'Vệ tinh',
        tabBarIcon: ({color}) => {
          return <CustomIcon name='satelliteWhite' size={25} color={color}/> 
        },
      }}/>
      
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  
});
