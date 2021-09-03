import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';
import Device from '../../utils/Device';
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
  header:{
    flexDirection:'row',
    paddingTop:Device.Window.height*0.05,
    paddingBottom:4,
    backgroundColor:'#1e88e5'
  },
  webview:{
    marginBottom:Device.Window.height*0.04,
  }
});
