import React from 'react';
import { FlatList, Text, RefreshControl, View, SafeAreaView,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { actions as newsActions } from '../../redux/NewsRedux';
//import TransparentLayout from '../../components/TransparentLayout';
import Article from '../../components/Article';
// import Spinner from '../../components/Spinner';
// import { moment } from '../../utils/Omni';
import { colorSet } from '../../AppStyles';
import styles from './styles';
import { logObj } from '../../utils/log';


class NewsScreen extends React.PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {
      isNewsModalOpen: false,
      viewingNews: null,
    };
  }

  componentDidMount() {
    const { navigation, getWeatherNews } = this.props;    
    this._navListener = navigation.addListener('focus', () => {
      var savedlocation = this.props.savedLocation.map(location=>location.addressText).toString();
      // var currentLocation = this.props.locationAdress[0].addressText.toString()+','+savedlocation
      
      getWeatherNews({search:savedlocation});
    });
    

  }

  onRefresh = () => {
    var savedlocation = this.props.savedLocation.map(location=>location.addressText).toString();
    // var currentLocation = this.props.locationAdress[0].addressText.toString()+','+savedlocation
    
    this.props.getWeatherNews({search:savedlocation});
  };

  goToNewsDetails = news => {
    const { navigation } = this.props;
    
    navigation.navigate('NewsDetailScreen', { article: news });
  };

  renderItem = ({ item, index }) => {
    return <Article article={item} openNews={() => this.goToNewsDetails(item)} />;
  };

  render() {
    const { isFetching, news} = this.props;  
    
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <Header />
        <View style={styles.container}>
          {isFetching || (news && news.length) ? (
            <FlatList
              style={{ flex: 1, marginTop:0,marginHorizontal:5 }}
              overScrollMode="never"
              data={news}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `${item.code}_${index}`}
              refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={this.onRefresh}
                  tintColor={colorSet.white}
                />
              }
            />
          ) : (
            <Text style={styles.emptyTitle}>Không có tin tức mới</Text>
          )}
        </View>
        {/* {isFetching ? <Spinner mode="overlay" /> : null} */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ netInfo, weatherNews,locationReducer }) => ({
  // netInfo,
  isFetching: weatherNews.isFetching,
  news: weatherNews.news,
  savedLocation: locationReducer.locationAdressReducer.savedLocations,


});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    getWeatherNews: (params) => {
      dispatch(newsActions.getWeatherNews(params));
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(NewsScreen);
