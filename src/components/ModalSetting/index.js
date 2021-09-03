import React from 'react';
import {
  Text,
  View,
  Switch,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {actions as locationActions} from '../../redux/LocationRedux';
import SearchLocation from '../SearchLocation';
import Device from '../../utils/Device';
import styles from './styles'
import _IconIO from 'react-native-vector-icons/Ionicons';
// import LocationSearchBar from '../LocationSearchBar'
class ModalSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh:false
    };
  }

  componentDidMount() {}
  renderItem = ({ item, index }) => {
    return (
      <View style={styles.locationItem}>
      <Text style={styles.mainText}>{item.district}-{item.state}</Text>
      <_IconIO name = "trash-outline" size ={25} style ={styles.dateIcon}onPress={() =>this.onRemoveLocation(item)} /> 
    </View>
    );
  };

  onRemoveLocation =(location)=>{
    this.props.removeLocation(location)
  }
  render() {
    console.log(this.props.savedLocation)
    return (
      <React.Fragment>
        <Modal
          backdropOpacity={0}
          isVisible={this.props.isVisible}
          onBackdropPress={this.props.closeSettingModal}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          style={{justifyContent: 'flex-end', margin: 0}}>
          <View
            style={{
              backgroundColor: 'white',
              width: Device.Window.width * 0.8,
              height:  Device.Window.height * 0.9,
              borderRadius: 4,
              borderColor: 'rgba(0, 0, 0, 0.1)',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 10,
                marginHorizontal: 15,
              }}>
              <Switch
                style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
                value={this.props.language}
                onValueChange={this.props.toggleLanguage}
              />
              <Text style={styles.textStyle}>
                {this.props.language ? 'VIE' : 'EN'}
              </Text>
            </View>
            <View style={{flex: 1,width:  Device.Window.width * 0.8-10,
                height: Device.Window.height * 0.3}}>
              <SearchLocation />
            </View>
            <View
              style={{
                width:  Device.Window.width * 0.8-10,
                height: Device.Window.height * 0.5,
                backgroundColor:'#f6f6f6',
                margin:5,
                borderRadius:3
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}>
                <Text style={{fontSize: 18, fontWeight: '600'}}>
                  Danh Sach Dia Diem Da Luu
                </Text>
              </View>
              <FlatList
               overScrollMode="never"
               keyboardShouldPersistTaps="handled"
              //  data={currentLocations}
               renderItem={this.renderItem}
               keyExtractor={(item, index) => `${item.key}_${index}`}
                data={this.props.savedLocation}
                style={{paddingTop:10}}
                extraData={this.props}
              />
            </View>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({netInfo, locationReducer}) => ({
  // netInfo,
  isVisible: locationReducer.settingModalReducer.isVisible,
  language: locationReducer.languageReducer.isEn,
  savedLocation :locationReducer.locationAdressReducer.savedLocations
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    closeSettingModal: () => {
      dispatch(locationActions.closeSettingModal());
    },
    toggleLanguage: () => {
      dispatch(locationActions.toggleLanguage());
    },
    removeLocation: (location) => {
      dispatch(locationActions.removeLocation(location));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(ModalSetting);
