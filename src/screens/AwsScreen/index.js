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
    var DateTimeFrom = moment().format('YYYY-MM-DD')+"T00:00:10"
    var DateTimeTo =  moment().add(1, 'd').format('YYYY-MM-DD')+"T00:00:00"
    var Interval =60
    this.props.getDataTable({StationIDs:null,Interval,DateTimeFrom,DateTimeTo})
  }
  refreshData =()=>{
    this.getFirstData()
  }

  componentDidMount() {
  const { navigation, getStations} = this.props;    
    this._navListener = navigation.addListener('focus', () => {
      getStations();
      this.getFirstData();
    });
    

  }

  render() {
    const{isFetching,stations,data}= this.props

    let jicaStations =  stations.length!==0 ? stations.filter(x =>x.Project==='JICA'):[]
    
    return (
      <React.Fragment>
        <StatusBar barStyle ="light-content"></StatusBar>
        <Header isShow ={true} onRefresh = {this.refreshData} />
        <Maps stations = {jicaStations}
        data = {data}/>
        <ModalMapView></ModalMapView>
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ netInfo, aws }) => {
  return {
    netInfo,
  isFetching: aws.stationReducer.isFetching,
  stations: aws.stationReducer.stations,
  data:aws.tableDataReducer.data
  }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const {
    netInfo: { isConnected }
  } = stateProps;
  return {
    ...ownProps,
    ...stateProps,
    getStations: (force = true) => {
      dispatch(awsAction.getStations(force));
    },
    getDataTable: (params) => {
      dispatch(awsAction.getDataTable(params));
    },
    closeAWSModal: () => { 
      dispatch(awsAction.closeAWSModal());
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(AwsScreen);
