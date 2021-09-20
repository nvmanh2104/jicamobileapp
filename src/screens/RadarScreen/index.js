import React from 'react';
import {  View, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { colorSet } from '../../AppStyles';
import styles from './styles';
import { WebView } from 'react-native-webview';

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

  onRefresh = () => {
    
  };

  

  render() {
   return(
     <React.Fragment>
        <StatusBar barStyle="light-content"></StatusBar>
        <View style={styles.header}></View>
      <WebView style={styles.webview} source={{ uri: 'http://jica.weathervietnam.vn/mobileradar' }} />
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
