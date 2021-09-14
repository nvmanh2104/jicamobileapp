import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View
  
} from 'react-native';
import {connect} from 'react-redux';
import _IconIO from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker'
var {width, height} = Dimensions.get('window');

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
       
        
      };
  }

  componentDidMount() {}
  setOpen=(open) =>{
    this.setState({
      open
    });
  }

  setValue=(callback)=> {   
   this.props.setFieldValue(this.props.name,callback(this.props.value))
  }

//   setItems=(callback) =>{
 
//     this.props.setFieldValue(this.props.name,callback(this.props.value))
//   }
  render() {
    const {open} = this.state;
    const {  value,label } = this.props;
    return (
      <React.Fragment>
        <Text style={styles.inputText}>{label}</Text>
        <View style={{zIndex:100}}>
        <DropDownPicker
      zIndex ={100}

      open={open}
      value={value}
      items={ [ {label: '10M', value: 10},
      {label: '1H', value: 60}]}
      setOpen={this.setOpen}
      setValue={this.setValue}
      style={styles.dtInput}
    />
        </View>
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
  };
};

var styles = StyleSheet.create({
    inputText: {
        color: '#7d7e79',
        fontSize: 16,
        lineHeight: 30,
      },
      dtInput: {
        height: 40,
        width: width - 50,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        paddingLeft: 40,
        paddingVertical:10,
        fontSize: 16,
        borderWidth: 1,
        
      },
      dateIcon:{
          position:'absolute',
          zIndex:10,
          top:7,
          left:10
      }
});

export default connect(mapStateToProps, undefined, mergeProps)(Dropdown);
