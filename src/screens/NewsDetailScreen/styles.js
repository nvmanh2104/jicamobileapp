import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';

export default StyleSheet.create({
  container: {
    backgroundColor: '#d9d9db',
    flexDirection: 'column',
    
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
    color: colorSet.Text,
    fontSize: fontSizeSet.large,
  },
  HtmlView:{
    marginHorizontal:5
  }
});
