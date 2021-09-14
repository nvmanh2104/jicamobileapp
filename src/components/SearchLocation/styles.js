import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';

export default StyleSheet.create({
  container: {
    marginTop: 0,
    paddingHorizontal: 20,
    height:350,
    flexGrow: 0,
    

  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: colorSet.inActiveColor,
    
  },
  mainText: {
    fontSize: fontSizeSet.subNormal,
    color: colorSet.Text,
    fontWeight: '400',
    
  },
  subText: {
    fontSize: fontSizeSet.small,
    color: colorSet.inActiveColor,
    textTransform: 'uppercase',
  },
  actionText: {
    textTransform: 'uppercase',
    color: colorSet.blue,
    fontSize: fontSizeSet.subNormal,
  },
});
