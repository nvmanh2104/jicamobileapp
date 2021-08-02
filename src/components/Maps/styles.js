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
  marker:{
    backgroundColor:"#550bbc",
    padding:5,
    borderRadius:5,
    
  },
  text:{
    color:'#550bbc',
    fontWeight:'bold'
  }
});
