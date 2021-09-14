import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {actions as awsAction} from '../../redux/AwsRedux';
import LineChart from '../LineChart';
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import {pad} from '../../utils/padd'
import settingLanguage from '../../utils/settingLanguage'
var {width, height} = Dimensions.get('window');
class ModalMapView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1,
    };
  }
  

  onTabClick = currentTab => {
    this.setState({
      currentTab: currentTab,
    });
  };
  getFullList10mDatasDetail = (list10mData)=>{
    var  newArray =[];
    for (var i = 36;i>=0;i --){
      var newDateObj = moment('2021-04-27T00:00:00').add(-i*10, 'm').toDate();
      var minutes = Math.floor(new Date(newDateObj).getMinutes()/10)*10;
      var stringDate = `${newDateObj.getFullYear()}-${pad(newDateObj.getMonth()+1,2)}-${pad(newDateObj.getDate(),2)}T${pad(newDateObj.getHours(),2)}:${pad(minutes,2)}:00`
      var a = list10mData.filter(function (item){
        return item.DateTime.includes(stringDate)
      })

      if(a.length ===0){
       
        var obj = {
          x:new Date(stringDate).getTime(),
          y:null
        };
        newArray.push(obj)
      }
      else{
        newArray.push({x:newDateObj.getTime(),y:a[0].Value.toFixed(2)})
      }
    }
  
    return newArray
  }

  getFullList1hDatasDetail = (list1hData)=>{
    var  newArray =[];
    for (var i = 24;i>=0;i --){
      var newDateObj = moment('2021-04-27T00:00:00').add(-i*60,'m').toDate();
    var hours = Math.floor(new Date(newDateObj).getHours())
      var stringDate = `${newDateObj.getFullYear()}-${pad(newDateObj.getMonth()+1,2)}-${pad(newDateObj.getDate(),2)}T${pad(hours,2)}:00`
      var a = list1hData.filter(function (item){
        return item.DateTime.includes(stringDate)
      })

      if(a.length ===0){
        var obj = {
          x:new Date(stringDate).getTime(),
          y:null
        };
        newArray.push(obj)
      }
      else{
        newArray.push({x:newDateObj.getTime(),y:a[0].Value.toFixed(2)})
      }
    }
  
    return newArray
  }
  componentDidMount() {}

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.rain10mdata !== nextProps.rain10mdata||this.props.rain1hdata !== nextProps.rain1hdata||this.props.stations !== nextProps.stations||this.props.isVisible !==this.props.isVisible) {
  //     return true;
  //   }
  //   if (this.state.currentTab !== nextState.currentTab) {
  //     return true;
  //   }
    
  //   return false;
  // }
  render() {
    var {rain10mdata,stations,rain1hdata} = this.props
    var new10mArray =[]
    var new1hArray =[]
     if(rain10mdata.length !==0){
      new10mArray =this.getFullList10mDatasDetail(rain10mdata)
     }
     if(rain10mdata.length !==0){
      new1hArray =this.getFullList1hDatasDetail(rain1hdata)
     }
     var label10m = stations.length !==0 && rain10mdata.length !==0 ? `${this.props.language? settingLanguage.MA.VIE:settingLanguage.MA.EN}: ${rain10mdata[0].StationID} ${this.props.language? settingLanguage.TRAM.VIE:settingLanguage.TRAM.EN}: ${stations.find(x=>x.StationID ===rain10mdata[0].StationID).StationName.VN}`:''


    return (
      <React.Fragment>
        <Modal
          backdropOpacity={0}
          isVisible={this.props.isVisible}
          onBackdropPress={this.props.closeAWSModal}
          style={{justifyContent: 'flex-end', margin: 0}}>
          <View
            style={{
              backgroundColor: 'white',
              width: width,
              height: height * 0.45,
            
              borderRadius: 4,
              borderColor: 'rgba(0, 0, 0, 0.1)',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                paddingBottom: 5,
                paddingRight: 5,
                paddingLeft: 5,
              }}> 
              <View style = {styles.tabs}>
              <Text
                    onPress={() => {
                      this.onTabClick(1);
                    }}
                    style={[
                      styles.tabTextStyle,
                      this.state.currentTab === 1 ? styles.tabUnderline : null,
                    ]}>
                   {this.props.language? settingLanguage.MUA10M.VIE:settingLanguage.MUA10M.EN},
                  </Text>
                  <Text
                    onPress={() => {
                      this.onTabClick(2);
                    }}
                    style={[
                      styles.tabTextStyle,
                      this.state.currentTab === 2 ? styles.tabUnderline : null,
                    ]}>
                   {this.props.language? settingLanguage.MUA1H.VIE:settingLanguage.MUA1H.EN},
                  </Text>
              </View>
              <View style ={{position:'absolute',right:10}}> 
                <Icon
               onPress={this.props.closeAWSModal}
               name='times-circle'
               size ={32}
               color = "#000000"
                />
              </View>
            </View>
            {this.state.currentTab === 1 && (
                  <View style={{alignItems:'center'}}>
                    <LineChart  data = {new10mArray}/>
                    <Text style= {styles.rainLabel}>{label10m}</Text>
                  </View>
                )}

              {this.state.currentTab === 2 && (
                  <View style={{alignItems:'center'}}>
                   <LineChart data = {new1hArray}/>
                   <Text style= {styles.rainLabel}>{label10m}</Text>
                </View>
                )}
            

         
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({netInfo, aws,locationReducer}) => ({
  // netInfo,
  isVisible: aws.awsModalReducer.isVisible,
  rain10mdata:aws.rain10mDataReducer.data,
  rain1hdata:aws.rain1hDataReducer.data,
  stations: aws.stationReducer.stations,
  language :locationReducer.languageReducer.isEn
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    openAWSModal: () => {
      dispatch(awsAction.openAWSModal());
    },
    closeAWSModal: () => {
      dispatch(awsAction.closeAWSModal());
    },

    
  };
};


const styles = StyleSheet.create({
  tabs: {
    alignItems: 'center',
    flexDirection: 'row',

  },
  tabTextStyle: {
    color: '#DCDCDC',
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
  },
  tabUnderline: {
    textDecorationLine: 'underline',
    color: '#000000',
  },
 rainLabel :{
  color: '#000000',
  fontSize: 16,
 }
  
});

export default connect(mapStateToProps, undefined, mergeProps)(ModalMapView);
