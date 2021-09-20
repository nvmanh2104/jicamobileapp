import React from 'react';
import { StatusBar, View } from 'react-native';
import { connect } from 'react-redux';

import { actions as newsActions } from '../../redux/NewsRedux';
//import TransparentLayout from '../../components/TransparentLayout';
import Article from '../../components/Article';
// import Spinner from '../../components/Spinner';
// import { moment } from '../../utils/Omni';
import { colorSet } from '../../AppStyles';
import styles from './styles';
import { log } from '../../utils/log';
import { WebView } from 'react-native-webview';

class SatelliteScreen extends React.PureComponent {
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

  componentDidMount() {

  }

  onRefresh = () => {
    
  };

 

//   renderItem = ({ item, index }) => {
//     return <Article article={item} openNews={() => this.goToNewsDetails(item)} />;
//   };

  render() {
    // const { isFetching, news } = this.props;  

    return (
      <React.Fragment>
      <StatusBar barStyle="light-content"></StatusBar>
      <View style={styles.header}></View>
      <WebView style={styles.webview} source={{ uri: 'http://jica.weathervietnam.vn/mobilesatelite' }} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ netInfo, weatherNews }) => ({
 
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
)(SatelliteScreen);
