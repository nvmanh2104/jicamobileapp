import React from 'react';
import { FlatList, Text, RefreshControl, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Maps from '../../components/Maps'
import {actions as awsAction} from '../../redux/AwsRedux'
// import Spinner from '../../components/Spinner';
// import { moment } from '../../utils/Omni';
import { colorSet } from '../../AppStyles';
import styles from './styles';
import { log } from '../../utils/log';
import Header from '../../components/Header';

class AwsScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {
    //   isNewsModalOpen: false,
    //   viewingNews: null,
    };
  }

  componentDidMount() {
const { navigation, getStations, getDataTable} = this.props;    
    this._navListener = navigation.addListener('focus', () => {
      getStations();

      getDataTable({StationIDs:null,Interval:60,DateTimeFrom:"2021-04-25T00:00:00",DateTimeTo:"2021-04-26T00:00:00"})
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
    return (
      <React.Fragment>
        <StatusBar barStyle ="light-content"></StatusBar>
        <Header/>
        <Maps stations = {stations}
        data = {data}/>
        
        
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
