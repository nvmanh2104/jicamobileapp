import React from 'react';
import {  View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { colorSet } from '../../AppStyles';
import styles from './styles';
import { WebView } from 'react-native-webview';
import { RefreshControl, Dimensions, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/Header';
class RadarScreen extends React.PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {
  
    };
  }

  componentDidMount() {

  }

 

  
  
  render() {
    let WebviewRef
   return(
     <React.Fragment>
        <StatusBar barStyle="light-content"></StatusBar>
        <Header isShow ={true} onRefresh = {()=>{WebviewRef&&WebviewRef.reload()}} />
        {/* <View style={styles.header}></View> */}
      <WebView ref ={WEBVIEW_REF=>(WebviewRef=WEBVIEW_REF)}style={styles.webview} source={{ uri: 'https://jica.weathervietnam.vn/mobileradar' }} />
      
     </React.Fragment>
    
   ) 
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
   
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(RadarScreen);
