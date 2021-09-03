import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';

export default StyleSheet.create({
  
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
