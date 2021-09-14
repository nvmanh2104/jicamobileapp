import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView ,StatusBar} from 'react-native';
import Header from '../../components/Header';
import { actions as newsActions } from '../../redux/NewsRedux';
//import TransparentLayout from '../../components/TransparentLayout';
import WebView from '../../components/WebView';
import Back from '../../components/Back';
import Divider from '../../components/Divider';
import RenderHtml from 'react-native-render-html'
// import Spinner from '../../components/Spinner';
import { colorSet } from '../../AppStyles';
import { cleanUpHtmlTag } from '../../utils/html';
import { log } from '../../utils/Omni';
import styles from './styles';
import ArticleDetail from '../../components/ArticleDetail';


class NewsDetailScreen extends React.PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {};
  }

  detail = () => {
    const { navigation,route } = this.props;
    const article =
      route && route.params && route.params.article
        ? route.params.article
        : null;

    const { tittle, content } = article;
    if (!article || !content) {
      return null;
    }

    // const text = cleanUpHtmlTag(content);
    
    return (

      <View style={styles.container}>
      
      <Header  backButton={this.backButton}/>
       <ScrollView style ={styles.HtmlView} >
       <RenderHtml  textColor={colorSet.Text} fontSize={11} html={content} />
       </ScrollView>
      </View>
    );
  };

  backButton = () => {
    const { navigation } = this.props;
    return <Back navigation={navigation} />;
  };

  render() {
    // const { isFetching } = this.props;

    return (
      <React.Fragment>
        <View >{this.detail()}</View>
        {/* {isFetching ? <Spinner mode="overlay" /> : null} */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ netInfo, weatherNews }) => ({
  // netInfo,
  // isFetching: weatherNews.isFetching,
  news: weatherNews.news,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    getWeatherNews: () => {
      dispatch(newsActions.getWeatherNews());
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(NewsDetailScreen);
