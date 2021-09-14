import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';
import Device from '../../utils/Device';
export default StyleSheet.create({
  modalContainer:{
    margin: 0
  },
  conatiner:{
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    width: Device.Window.width * 0.8,
    height:  Device.Window.height ,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
    flex: 1,width:  Device.Window.width * 0.8-10,
      height: Device.Window.height * 0.35
  },
  savedLocationContainer:{
    width:  Device.Window.width * 0.8-10,
    height: Device.Window.height * 0.55,
    backgroundColor:'#f6f6f6',
    margin:5,
    borderRadius:3
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
