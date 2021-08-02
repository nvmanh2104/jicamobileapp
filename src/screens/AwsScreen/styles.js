import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fcbbc',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
    color: colorSet.Text,
    fontSize: fontSizeSet.large,
  },
  map:
  {

      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
 
  }
});
