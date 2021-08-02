import React from 'react';
import { FlatList, Text, RefreshControl, View, StatusBar ,Dimensions} from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import CustomIcon from '../../components/BottomBarIcon'

// import Spinner from '../../components/Spinner';
// import { moment } from '../../utils/Omni';
import { colorSet } from '../../AppStyles';
import styles from './styles';
import { log } from '../../utils/log';
const { height, width } = Dimensions.get( 'window' );
const LATITUDE = 21.030653 // Korea Town, New York, NY 10001
const LONGITUDE = 105.847130 // Korea Town, New York, NY 10001
const LATITUDE_DELTA = 4;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);






class Maps extends React.Component {
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

  getColor =d =>{
    return d >=100
    ?"#FB0303"
    :d>50
    ?"#600178"
    :d>16
    ?"#136B04"
    : d>0
    ?"#0767D8"
    :d ===0.0
    ?"#9DC183"
    :"#BEBEBE"
  }


 

  goToNewsDetails = news => {
    
  };
  render() {
     const {data, stations}= this.props
     var mergeList = stations.map(t1=>({...t1,...data.find(t2=>t2.StationID === t1.StationID)}))
    
    return (
      <React.Fragment>
        
        <View style={styles.container}>

        <MapView
        provider={PROVIDER_GOOGLE}   
        style={{ left:0, right: 0, top:0, bottom: 55, position: 'absolute' }}
        initialRegion={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    }}>{
        
        mergeList.map((station,index)=>{
          var color =station.ToTalRain===undefined? this.getColor(-100):this.getColor(parseFloat(station.TotalRain))
         return (<Marker
         coordinate={{latitude:station.Lat,longitude:station.Lon}}
         key={index}
         pinColor={color}
         >
             <View style={{alignItems:"center"}}>
             <CustomIcon name='pin' size={40} color={color} fontWeight={'bold'}></CustomIcon>
             <Text style ={{position:"absolute", color:'white', fontWeight:'bold',textAlign:'center',fontSize:12,marginTop:5}}>{station.TotalRain===undefined? '':parseFloat(station.TotalRain).toFixed(1)}</Text>
             </View>

         </Marker>)
           
        })
    }
        </MapView>
  
        </View>
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ netInfo, weatherNews }) => ({
  // netInfo,
//   isFetching: weatherNews.isFetching,
//   news: weatherNews.news,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    // getWeatherNews: (force = false) => {
    //   dispatch(newsActions.getWeatherNews(force));
    // },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Maps);
