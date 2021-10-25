import React from 'react';
import {
  Text,
  View,
  Switch,
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {actions as locationActions} from '../../redux/LocationRedux';
import SearchLocation from '../SearchLocation';
import styles from './styles';
import _IconIO from 'react-native-vector-icons/Ionicons';
import settingLanguage from '../../utils/settingLanguage';
// import LocationSearchBar from '../LocationSearchBar'

class ModalSetting extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }

  componentDidMount() {}
  renderItem = ({item, index}) => {
    return (
      <View style={styles.locationItem}>
        <Text style={styles.mainText}>
          {item.district}-{item.state}
        </Text>
        <_IconIO
          name="trash-outline"
          size={25}
          style={styles.dateIcon}
          onPress={() => this.onRemoveLocation(item)}
        />
      </View>
    );
  };

  onRemoveLocation = location => {
    this.props.removeLocation(location);
  };
  render() {
    return (
      <React.Fragment>
        <StatusBar hidden={false} />
        <Modal
          backdropOpacity={0}
          isVisible={this.props.isVisible}
          onBackdropPress={this.props.closeSettingModal}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior="padding"
            pointerEvents="box-none"
            style={{margin: 0, flex: 1, justifyContent: 'center'}}>
            <View style={styles.conatiner}>
              <View style={styles.switchContainer}>
                <Switch
                  style={styles.switch}
                  value={this.props.language}
                  onValueChange={this.props.toggleLanguage}
                />
                <Text style={styles.textStyle}>
                  {this.props.language ? 'VIE' : 'EN'}
                </Text>
              </View>

              <View style={styles.searchLocationContainer}>
                <SearchLocation />
              </View>

              <View style={styles.savedLocationContainer}>
                <View style={styles.savedTextContainer}>
                  <Text style={styles.savedText}>
                   {this.props.language?settingLanguage.DIADIEM.VIE:settingLanguage.DIADIEM.EN}
                  </Text>
                </View>

                <FlatList
                  overScrollMode="never"
                  keyboardShouldPersistTaps="handled"
                  //  data={currentLocations}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => `${item.key}_${index}`}
                  data={this.props.savedLocation}
                  style={styles.flatList}
                  extraData={this.props}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({locationReducer}) => ({
  isVisible: locationReducer.settingModalReducer.isVisible,
  language: locationReducer.languageReducer.isEn,
  savedLocation: locationReducer.locationAdressReducer.savedLocations,
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
    removeLocation: location => {
      dispatch(locationActions.removeLocation(location));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(ModalSetting);
