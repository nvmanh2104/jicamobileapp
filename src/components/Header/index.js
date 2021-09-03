import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import _IconIO from 'react-native-vector-icons/Ionicons';
import Back from '../Back';
import {actions as locationActions} from '../../redux/LocationRedux';
import ModalSetting from '../ModalSetting';
import Device from '../../utils/Device';

class Header extends React.Component {
  

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    
  }
  openSetting =()=>{
    this.props.openSettingModal()
  }

  
  render() {
    const { backButton,locationAdress} = this.props;
    console.log(locationAdress)
    return (
      <React.Fragment>
        <StatusBar barStyle ="light-content"></StatusBar>
        <View style = {styles.headerContainer}>
        <View style={styles.backButonContainer}>
            <View style={styles.buttonItem}>{backButton ? backButton() : null}</View>
        </View>
            
            <Text style={styles.headerText}>{locationAdress[0].district}-{locationAdress[0].state}</Text>
       
            <View style = {styles.backButonContainer}>
                <View style={styles.buttonItem}>
                <_IconIO name = "settings-outline" size ={30} style ={styles.dateIcon}onPress={this.openSetting} /> 
                </View>
            </View>
            
        </View>
        <ModalSetting></ModalSetting>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ locationReducer}) => ({
  locationAdress:locationReducer.currentLocationReducer.currentLocation,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    openSettingModal: () => {
      dispatch(locationActions.openSettingModal());
}
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Header);

const HEADER_ICON_SIZE =40;
const height = Device.Window.height*0.06
const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        paddingTop:height,
        backgroundColor:'#1e88e5',
        justifyContent:'space-between',
        paddingBottom:8

    },
    backButonContainer:{
        paddingHorizontal:15,
        alignItems:'center',
        justifyContent:'center'
    },
    headerText:{
        color:'#fff',
        fontSize:20,
        fontWeight:'500'
    },
    buttonItem:{
        width:HEADER_ICON_SIZE,

    },
    dateIcon:{
      color:'#fff'
    }
})