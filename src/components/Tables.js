// TableDemo.tsx

import React, {useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Table, Row, Rows, Col} from 'react-native-table-component';
import {connect} from 'react-redux';
import moment from 'moment';
const borderColor = '#C1C0B9';
const primaryColor = 'dodgerblue';
const backgroundColor = '#F7F6E7';
import Spinner from 'react-native-loading-spinner-overlay';
const headerHeight = 40;
const leftColumnWidth = 180;

class Tables extends React.PureComponent {
  constructor(props) {
    super(props);
    this.leftRef = React.createRef();

    this.rightRef = React.createRef();

    this.state = {
      leftHeadEN: ['Station', 'Name', 'Total'],
      leftHeadVIE: ['Mã', 'Tên', 'Tổng'],
      lefArr: [60, 100,70],  
      spinner: false
    };
  }
 

  render() {
     const {tableHead,arrRightSize,leftData,rightData,isFetching} = this.props;
     
    
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#eee',
        }}>
        {/* <Spinner
          visible={true}
          textContent={'LoadingData...'}
          textStyle={styles.spinnerTextStyle}
        /> */}
        {/* Left Column */}
        <View
          style={{
            width: leftColumnWidth,
            backgroundColor: 'white',
          }}>
          <ScrollView horizontal={true} bounces={false}>
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor}}>
                <Row
                  data={this.props.language? this.state.leftHeadVIE:this.state.leftHeadEN}
                  widthArr={this.state.lefArr}
                  style={styles.head}
                  textStyle={{...styles.text, color: 'white'}}
                />
              </Table>
              <ScrollView
                ref={this.leftRef}
                style={styles.dataWrapper}
                scrollEventThrottle={16}
                bounces={false}
                onScroll={e => {
                  const {y} = e.nativeEvent.contentOffset;
                  this.rightRef.current?.scrollTo({y, animated: false});
                }}>
              
                  
                <Table borderStyle={{borderWidth: 1, borderColor}}>
                  {leftData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={this.state.lefArr}
                      style={index % 2 ? styles.row : {backgroundColor,height: 28}}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>

        {/* Right Column */}
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <ScrollView horizontal={true} bounces={false}>
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor}}>
                <Row
                  data={tableHead}
                  widthArr={arrRightSize}
                  style={styles.head}
                  textStyle={{...styles.text, color: 'white'}}
                />
              </Table>
              <ScrollView
                ref={this.rightRef}
                style={styles.dataWrapper}
                scrollEventThrottle={16}
                bounces={false}
                onScroll={e => {
                  const {y} = e.nativeEvent.contentOffset;
                  this.leftRef.current?.scrollTo({y, animated: false});
                }}>
                <Table borderStyle={{borderWidth: 1, borderColor}}>
                  {rightData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={arrRightSize}
                      style={index % 2 ? styles.row : {backgroundColor,height: 28}}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#eee'},
  head: {height: 40, backgroundColor: primaryColor},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 28},
  text: {textAlign: 'center'},
  dataWrapper: {marginTop: -1},
  spinnerTextStyle: {
    color: '#FFF'
  },
});

const mapStateToProps = ({netInfo, aws,locationReducer}) => ({
  // netInfo,
  //   isFetching: weatherNews.isFetching,
  //   news: weatherNews.news,
  // stations: aws.stationReducer.stations,
  // data: aws.tableDataReducer.data,
  language: locationReducer.languageReducer.isEn,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Tables);
