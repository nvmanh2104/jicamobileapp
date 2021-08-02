import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { actions as newsActions } from '../../redux/NewsRedux';
//import TransparentLayout from '../../components/TransparentLayout';

import { colorSet } from '../../AppStyles';
import { log } from '../../utils/log';
import Back from '../Back';

class Header extends React.Component {
  

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    
  }


  
  render() {
    const { backButton} = this.props;
    return (
      <React.Fragment>
        <StatusBar barStyle ="light-content"></StatusBar>
        <View style = {styles.headerContainer}>
        <View style={styles.backButonContainer}>
            <View style={styles.buttonItem}>{backButton ? backButton() : null}</View>
        </View>
            
            <Text style={styles.headerText}>Ha Noi</Text>
       
            <View style = {styles.backButonContainer}>
                <View style={styles.buttonItem}></View>
            </View>
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ }) => ({

});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
   
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Header);

const HEADER_ICON_SIZE =40;

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row',
        paddingTop:30,
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
        

       
    }
})