/* eslint-disable */

import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import store from './src/configureStore';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import Router from './src/Router';


class App extends React.Component {

//  constructor(props){
//    super(props)
//    this.localNotify = null
//  }
//  componentDidMount(){
//    this.localNotify= notificationManager
//    this.localNotify.configure()
//  }
  render() {
    const persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

// const mapStateToProps = ({netInfo, location}) => ({
//   // netInfo,
//   //   isFetching: weatherNews.isFetching,
//   //   news: weatherNews.news,
  
// });

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//   const {dispatch} = dispatchProps;

//   return {
//     ...ownProps,
//     ...stateProps,
//   };
// };
export default App
// export default connect(mapStateToProps, undefined, mergeProps)(App);

