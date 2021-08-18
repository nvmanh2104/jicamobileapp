import React from 'react';
import { FlatList, Text, RefreshControl, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { colorSet } from '../../AppStyles';
import styles from './styles';
import { log } from '../../utils/log';
import LineChart from '../../components/LineChart';

class RadarScreen extends React.Component {
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
    // this.props.getWeatherNews(true);
  };

  

  render() {
    // const { isFetching, news } = this.props;  
    // console.log(news) 
    return (
      <React.Fragment>
        <View style={styles.container}>
         
        </View>
      
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
    // getWeatherNews: (force = false) => {
    //   dispatch(newsActions.getWeatherNews(force));
    // },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(RadarScreen);
