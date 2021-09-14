import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import { actions as statisticAction } from '../../redux/StatisticRedux';
import MenuPicker from '../../components/MenuPicker';
// import {actions as awsAction} from '../../redux/AwsRedux';
import styles from './styles';

import _IconIO from 'react-native-vector-icons/Ionicons';
import Tables from '../../components/Tables';
import settingLanguage from '../../utils/settingLanguage';
// import Spinner from 'react-native-loading-spinner-overlay';
class StatisticScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      values: {
        StationIDs: null,
        DateTimeFrom: moment().add(-6, 'h').format('YYYY-MM-DDTHH:mm'),
        DateTimeTo: moment().format('YYYY-MM-DDTHH:mm'),
        Interval: 10,
      },
      // isLoading:true
    };
  }
  getFirstData = ()=>{
    var DateTimeTo = moment("2021-04-26T00:00:00").format("YYYY-MM-DD") + 'T00:00:00'
    var DateTimeFrom = moment("2021-04-26T00:00:00").add(-1,'d').format("YYYY-MM-DD") + 'T00:00:00'
    var Interval =60
    this.props.getMobileTable({StationIDs:null,Interval,DateTimeFrom,DateTimeTo})
  }

   
  componentDidMount() {
   
    this.getFirstData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data !== nextProps.data) {
      return true;
    }
    if (this.state.isVisible !== nextState.isVisible || this.state.values !== nextState.values) {
      return true;
    }
    return false;
  }
  closeModal = () => {
    this.setState({isVisible: false});
  };
  openModal = () => {
    this.setState({isVisible: true});
  };

  onSubmitForm = values => {
    this.setState({values: values, isVisible: false});
    var StationIDs = values.StationIDs;
    var Interval = values.Interval;
    var DateTimeFrom = values.DateTimeFrom + ':00';
    var DateTimeTo = values.DateTimeTo + ':00';
    this.props.getDataTable({StationIDs, Interval, DateTimeFrom, DateTimeTo});
  };

  render() {
    
    const { data} = this.props;
      var arrRightSize =[]
      var tableHead =[]
      var leftData=[]
      var rightData =[]

      if(data.length!==0){
        for(var i =0;i<data.Header.length;i++){
          arrRightSize.push[60]
         }
         tableHead = data.Header
         leftData=data.TotalRain
         rightData = data.RainData

      }
     
    return (
      <React.Fragment>
       
        <StatusBar barStyle="light-content"></StatusBar>
        {/* <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          
        /> */}
        <View style={styles.header}>
          <View style={styles.labelContainer}>
            <_IconIO
              name="menu-outline"
              size={40}
              style={styles.dateIcon}
              onPress={this.openModal}
            />
            <Text style={styles.labelText}>
              {this.state.values.DateTimeFrom
                ? `${
                    this.props.language
                      ? settingLanguage.TU.VIE
                      : settingLanguage.TU.EN
                  }: ${this.state.values.DateTimeFrom} ${
                    this.props.language
                      ? settingLanguage.DEN.VIE
                      : settingLanguage.DEN.EN
                  } ${this.state.values.DateTimeTo}`
                : ''}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <MenuPicker
            isVisible={this.state.isVisible}
            closeModal={this.closeModal}
            onSubmitForm={this.onSubmitForm}
          />
          {/* <Tables header={this.state.values}></Tables> */}
          <Tables tableHead={tableHead}
          arrRightSize={arrRightSize}
          leftData={leftData}
          rightData={rightData}
          ></Tables>
        </View> 
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({netInfo, statistic,locationReducer}) => ({

  language: locationReducer.languageReducer.isEn,
  // stations: aws.stationReducer.stations,
  data: statistic.tableDataReducer.data,

});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    getMobileTable: params => {
      dispatch(statisticAction.getMobileTable(params));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(StatisticScreen);
