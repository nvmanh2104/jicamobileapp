import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TextInput,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';
import {connect} from 'react-redux';
import _IconIO from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
var {width, height} = Dimensions.get('window');

class DateTime extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        show: false,
        mode: 'datetime',
        displayFormat: 'YYYY-MM-DDTHH:mm:ss',
        label: 'Date',
      };
  }

  componentDidMount() {}
  showDateTimePicker = () => {
    // alert('showDateTimePicker');
    this.setState({show: true});
    Keyboard.dismiss();
  };

  hideDateTimePicker = () => {
    this.setState({show: false});
  };

  handleDatePicked = value => {
    this.props.setFieldValue(this.props.name, moment(value).format('YYYY-MM-DDTHH:mm'))
    setTimeout(() => {
      this.hideDateTimePicker();
    }, 250);
  };
  render() {
    const {show, mode, displayFormat} = this.state;
    const {  value,label } = this.props;
    return (
      <React.Fragment>
        <Text style={styles.inputText}>{label}</Text>
          <View >
          <_IconIO name = "calendar-outline" size ={24} style ={styles.dateIcon}onPress={this.showDateTimePicker} />
          <Text style={styles.dtInput}>{value}</Text>
          </View>
       
        <DateTimePicker
          date={value? new Date(value) : new Date()}
          isVisible={show}
          mode={mode}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
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
        backgroundColor: '#fff',
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

export default connect(mapStateToProps, undefined, mergeProps)(DateTime);
