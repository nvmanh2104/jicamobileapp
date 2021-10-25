import React from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {actions as locationActions} from '../../redux/LocationRedux';
import SearchLocation from '../../components/SearchLocation';
import styles from './styles';
import _IconIO from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import settingLanguage from '../../utils/settingLanguage';
import Switch from 'react-native-switch-pro'
class SettingsScreen extends React.PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  onRemoveLocation = location => {
    this.props.removeLocation(location);
  };
  renderItem = ({item, index}) => {
    if(index !==0){
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
    }

  };
  onRefresh = () => {
    
  };

  render() {
    const {isFetching} = this.props;
    return (
      <React.Fragment>
        <Header />
      
        <KeyboardAwareScrollView style={styles.conatiner}>
          {/* ///----switch */}
          <View style={styles.switchContainer}>
            <Switch
              style={styles.switch}
              value={this.props.language}
              onSyncPress={this.props.toggleLanguage}
            />
            <Text style={styles.textStyle}>
              {this.props.language ? 'VIE' : 'EN'}
            </Text>
          </View>
          {/* ///----switch */}
          {/* ///----SearchLocation */}
          <View style={styles.searchLocationContainer}>
          <SafeAreaView style={{flex: 1}}>
            <SearchLocation />
            </SafeAreaView>
          </View>

          <View style={styles.savedLocationContainer}>
            <View style={styles.savedTextContainer}>
              <Text style={styles.savedText}> {this.props.language?settingLanguage.DIADIEM.VIE:settingLanguage.DIADIEM.EN}</Text>
            </View>
            <SafeAreaView style={{flex: 1}}>
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
            </SafeAreaView>
          </View>
        </KeyboardAwareScrollView>
        
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
    toggleLanguage: () => {
      dispatch(locationActions.toggleLanguage());
    },
    removeLocation: location => {
      dispatch(locationActions.removeLocation(location));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(SettingsScreen);
