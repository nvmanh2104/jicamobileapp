import React from 'react';
import {
  FlatList,
  Text,
  RefreshControl,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomIcon from '../../components/BottomBarIcon';
import {actions as awsAction} from '../../redux/AwsRedux';
import ModalMapView from '../ModalMapView';
// import Spinner from '../../components/Spinner';
// import { moment } from '../../utils/Omni';
import {colorSet} from '../../AppStyles';
import styles from './styles';
import {log} from '../../utils/log';
import moment from 'moment';
const {height, width} = Dimensions.get('window');
const LATITUDE = 21.030653; // Korea Town, New York, NY 10001
const LONGITUDE = 105.84713; // Korea Town, New York, NY 10001
const LATITUDE_DELTA = 4;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

class Maps extends React.PureComponent {
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

  getColor = d => {
    if (d >= 100) {
      return {color: '#FB0303', name: 'pin_red'};
    }

    if (d > 50) {
      return {color: '#600178', name: 'pin_violet'};
    }

    if (d > 16) {
      return {color: '#136B04', name: 'pin_green'};
    }
    if (d > 0) {
      return {color: '#0767D8', name: 'pin_blue'};
    }

    if (d === 0.0) {
      return {color: '#9dc183', name: 'pin_yellow'};
    } else {
      return {color: '#bebebe', name: 'pin_gray'};
    }
  };

  clickMarker = StationID => {
    var current = moment('2021-04-27T00:00:00').format('YYYY-MM-DDTHH:mm:ss');

    this.props.openAWSModal();
    this.props.getRain10mDatas({
      StationIDs: StationID,
      DateTimeFrom: moment('2021-04-27T00:00:00')
        .add(-6, 'h')
        .format('YYYY-MM-DDTHH:mm:ss'),
      DateTimeTo:current
    });
    this.props.getRain1hDatas({
      StationIDs: StationID,
      DateTimeFrom: moment('2021-04-27T00:00:00')
        .add(-24, 'h')
        .format('YYYY-MM-DDTHH:mm:ss'),
      DateTimeTo:current
    });
    
  };


  render() {
    const {data, stations,locationAdress} = this.props;
    var mergeList = stations.map(t1 => ({
      ...t1,
      ...data.find(t2 => t2.StationID === t1.StationID),
    }));

    return (
      <React.Fragment>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 55,
              position: 'absolute',
            }}
            initialRegion={{
              latitude: locationAdress[0].latitude,
              longitude: locationAdress[0].longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {mergeList.map((station, index) => {
              let style =
                station.TotalRain === undefined
                  ? this.getColor(-100)
                  : this.getColor(parseFloat(station.TotalRain));

              return (
                <Marker
                  coordinate={{latitude: station.Lat, longitude: station.Lon}}
                  key={index}
                  pinColor={style.color}
                  onPress={() => this.clickMarker(station.StationID)}>
                  <View style={{alignItems: 'center'}}>
                    <CustomIcon
                      key={index}
                      name={style.name}
                      size={40}
                      color={style.color}
                      fontWeight={'bold'}></CustomIcon>
                    <Text
                      style={{
                        position: 'absolute',
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 12,
                        marginTop: 5,
                      }}>
                      {station.TotalRain === undefined
                        ? ''
                        : parseFloat(station.TotalRain).toFixed(1)}
                    </Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({locationReducer}) => ({
  locationAdress:locationReducer.currentLocationReducer.currentLocation,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    openAWSModal: () => {
      dispatch(awsAction.openAWSModal());
    },
    getRain10mDatas: params => {
      dispatch(awsAction.getRain10mDatas(params));
    },
    getRain1hDatas: params => {
      dispatch(awsAction.getRain1hDatas(params));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Maps);
