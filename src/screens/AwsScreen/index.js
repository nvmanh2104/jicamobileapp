import React from 'react';
import { FlatList, Text, RefreshControl, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Maps from '../../components/Maps'
import {actions as awsAction} from '../../redux/AwsRedux'
import ModalMapView from '../../components/ModalMapView';
// import Spinner from '../../components/Spinner';
// import { moment } from '../../utils/Omni';
import { colorSet } from '../../AppStyles';
import styles from './styles';
import { log } from '../../utils/log';
import Header from '../../components/Header';
import moment from 'moment';
class AwsScreen extends React.PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
  }

  getFirstData = ()=>{
    var DateTimeTo = moment("2021-04-26T00:00:00").format("YYYY-MM-DD") + 'T00:00:00'
    var DateTimeFrom = moment("2021-04-26T00:00:00").add(-1,'d').format("YYYY-MM-DD") + 'T00:00:00'
    var Interval =60
    this.props.getDataTable({StationIDs:null,Interval,DateTimeFrom,DateTimeTo})
  }


  componentDidMount() {
  const { navigation, getStations} = this.props;    
    this._navListener = navigation.addListener('focus', () => {
      getStations();
      this.getFirstData();
    });
  }
  

  // getFirstData= ()=>{
  //   this.
  // }

  onRefresh = () => {
    // this.props.getWeatherNews(true);
  };

  goToNewsDetails = news => {
    
  };
  render() {
    const{isFetching,stations,data}= this.props

    let jicaStations =  stations.length!==0 ? stations.filter(x =>x.Project==='JICA'):[]
    
    return (
      <React.Fragment>
        <StatusBar barStyle ="light-content"></StatusBar>
        <Header/>
        <Maps stations = {jicaStations}
        data = {data}/>
        <ModalMapView></ModalMapView>
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ netInfo, aws }) => ({
  // netInfo,
  isFetching: aws.stationReducer.isFetching,
  stations: aws.stationReducer.stations,
  data:aws.tableDataReducer.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    getStations: (force = false) => {
      dispatch(awsAction.getStations(force));
    },
    getDataTable: (params) => {
      dispatch(awsAction.getDataTable(params));
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(AwsScreen);
