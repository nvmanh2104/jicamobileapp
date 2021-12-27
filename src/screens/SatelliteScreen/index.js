import React from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

//import TransparentLayout from '../../components/TransparentLayout';
// import Spinner from '../../components/Spinner';
// import { moment } from '../../utils/Omni';
import Header from '../../components/Header';
import styles from './styles';
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
    let WebviewRef
    return (
      <React.Fragment>
      <StatusBar barStyle="light-content"></StatusBar>
      {/* <View style={styles.header}></View> */}
      <Header isShow ={true} onRefresh = {()=>{WebviewRef&&WebviewRef.reload()}} />
      <WebView ref ={WEBVIEW_REF=>(WebviewRef=WEBVIEW_REF)} style={styles.webview} source={{ uri: 'https://jica.weathervietnam.vn/mobilesatelite' }} />
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
