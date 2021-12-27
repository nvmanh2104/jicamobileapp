import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';
import Device from '../../utils/Device'
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
    marginBottom:Device.Window.height*0.09,
    marginHorizontal:10,
  }
});
