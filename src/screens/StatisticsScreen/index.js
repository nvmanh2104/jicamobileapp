import React from 'react';
import { FlatList, Text, RefreshControl, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { actions as newsActions } from '../../redux/NewsRedux';
//import TransparentLayout from '../../components/TransparentLayout';
import Article from '../../components/Article';
// import Spinner from '../../components/Spinner';
// import { moment } from '../../utils/Omni';
import { colorSet } from '../../AppStyles';
import styles from './styles';
import { log } from '../../utils/log';

class StatisticScreen extends React.Component {
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
    // const { navigation, getWeatherNews } = this.props;    
    // this._navListener = navigation.addListener('focus', () => {
    //   getWeatherNews();
    //});
  }

  onRefresh = () => {
    // this.props.getWeatherNews(true);
  };

  goToNewsDetails = news => {
    // const { navigation } = this.props;
    // navigation.navigate('NewsDetailScreen', { article: news });
  };

//   renderItem = ({ item, index }) => {
//     return <Article article={item} openNews={() => this.goToNewsDetails(item)} />;
//   };

  render() {
    // const { isFetching, news } = this.props;  
    // console.log(news) 
    return (
      <React.Fragment>
        <View style={styles.container}>
            <Text>Trang Statistic</Text>
        </View>
        {/* {isFetching ? <Spinner mode="overlay" /> : null} */}
      </React.Fragment>
    );
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
)(StatisticScreen);