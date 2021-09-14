import { StyleSheet } from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import { colorSet, fontSizeSet } from '../../AppStyles';
import Device from '../../utils/Device';
export default StyleSheet.create({
  
  conatiner:{
    flex:1,
    flexDirection:'column',
  },
  switchContainer:{
    flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 10,
                marginHorizontal: 15,
  },
  switch:{
    transform: [{scaleX: 0.8}, {scaleY: 0.8}]
  },
  searchLocationContainer:{
    flex: 1,
    height:200
  },
  savedLocationContainer:{
    // width:  Device.Window.width ,
    // height: Device.Window.height * 0.55,
    backgroundColor:'#f6f6f6',
    margin:5,
    borderRadius:3,
    marginBottom:Device.Window.height*0.1
  },
  savedTextContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  savedText:
    {fontSize: 18, fontWeight: '600'},
    flatList:{paddingTop:10},
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 10,
    borderBottomColor: '#767676',
    borderBottomWidth: 1,
    marginHorizontal:10
    
  },
  mainText: {
    fontSize: fontSizeSet.subNormal,
    color: colorSet.Text,
    fontWeight: '600',
  },
  subText: {
    fontSize: fontSizeSet.small,
    color: colorSet.inActiveColor,
    textTransform: 'uppercase',
  },
  textStyle: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#344953',
  },
  
});
