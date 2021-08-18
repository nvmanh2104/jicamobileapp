import React from 'react';
import {
  Text,
  View,
  StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {actions as newsActions} from '../../redux/NewsRedux';
import MenuPicker from '../../components/MenuPicker';
import {actions as awsAction} from '../../redux/AwsRedux'
import styles from './styles';

import _IconIO from 'react-native-vector-icons/Ionicons';
import Tables from '../../components/Tables';
class StatisticScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      values:{
        StationIDs: null, isDate: false,DateTimeFrom: moment().format('YYYY-MM-DDTHH:mm'),
        DateTimeTo: moment().format('YYYY-MM-DDTHH:mm'),
              interval : {label:"10M",value:"10"}}
      
    };
  }

  componentDidMount() {
    // const { navigation, getWeatherNews } = this.props;
    // this._navListener = navigation.addListener('focus', () => {
    //   getWeatherNews();
    //});
  }

  onRefresh = () => {
    // this.props.getWeatherNews(true);
  };

 
  closeModal =()=>{
    this.setState({isVisible:false})
  }
  openModal =()=>{
    this.setState({isVisible:true})
  }

  onSubmitForm =(values)=>{
     this.setState({values:values,isVisible:false})
    
    // this.props.getDataTable({StationIDs,Interval,DateTimeFrom,DateTimeTo})
     
  }

  render() {
   

    return (
      <React.Fragment>
        <StatusBar barStyle ="light-content"></StatusBar>
        <View style ={styles.header}>
          <View style ={styles.labelContainer}>
          <_IconIO name = "menu-outline" size ={40} style ={styles.dateIcon}onPress={this.openModal} />
        <Text style={styles.labelText}>{this.state.values.DateTimeFrom? `From: ${this.state.values.DateTimeFrom} to ${this.state.values.DateTimeTo}`:''}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <MenuPicker isVisible={this.state.isVisible}
          closeModal ={this.closeModal}
          onSubmitForm = {this.onSubmitForm}
          />
        <Tables></Tables>
        </View>
        {/* {isFetching ? <Spinner mode="overlay" /> : null} */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({netInfo, aws}) => ({
  // netInfo,
  //   isFetching: weatherNews.isFetching,
  //   news: weatherNews.news,

});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    getDataTable: (params) => {
      dispatch(awsAction.getDataTable(params));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(StatisticScreen);
