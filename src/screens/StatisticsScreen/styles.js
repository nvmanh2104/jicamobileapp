import { StyleSheet } from 'react-native';
import { colorSet, fontSizeSet } from '../../AppStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fcbbc',
  
  },
  header:{
    flexDirection:'row',
    paddingTop:40,
    paddingBottom:4,
    backgroundColor:'#1e88e5'
  },
  dateIcon:{
    // position:'absolute',
    // zIndex:10,
    // top:25,
    // left:10,

    color:'#fff',
    
},
labelText:{
     color:'#fff',
     fontSize:13,
     marginTop:10,
     marginLeft:10,
     fontWeight:'500'

},
labelContainer:{
  flex:1,
  flexDirection:'row',

}
});
