// TableDemo.tsx

import React, {useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Table, Row, Rows, Col} from 'react-native-table-component';
import {connect} from 'react-redux';
import moment from 'moment';
const borderColor = '#C1C0B9';
const primaryColor = 'dodgerblue';
const backgroundColor = '#F7F6E7';

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
    };
  }
  //   const leftRef = useRef<ScrollView>(null);
  //   const rightRef = useRef<ScrollView>(null);
  // calculateRightHeader = (begin, end, interval) => {
  //   var tableHead = [];
  //   var arrRightSize =[]
  //   var hours = Math.floor(
  //     (Math.ceil(
  //       (moment(begin).minutes() + moment(begin).hours() * 60) / interval,
  //     ) *
  //       interval) /
  //       60,
  //   );
  //   var minutes =
  //     (Math.ceil(
  //       (moment(begin).minutes() + moment(begin).hours() * 60) / interval,
  //     ) *
  //       interval) %
  //     60;
  //   var newbegin = '';
  //   if (hours === 24) {
  //     newbegin = moment(begin).add(1, 'd');
  //     newbegin.hours(0);
  //   } else {
  //     newbegin = moment(begin).hours(hours);
  //   }
  //   newbegin.minutes(minutes);
  //   newbegin.seconds(0);
  //   var i = 0;
  //   var arrend = moment(end);
  //   tableHead.push(newbegin.format('MM-DD[\n]HH:mm'))
  //   arrRightSize.push[60]
  //   while (true) {
  //     var next = newbegin.add(interval, 'm');

  //     if (next > arrend) {
  //       break;
  //     }
  //     if (i === 100) {
  //       break;
  //     }
  //     i = i + 1;
  //     tableHead.push(next.format('MM-DD[\n]HH:mm'));
  //     arrRightSize.push[60]
  //   }
  //   return {tableHead,arrRightSize};
  // };

  // calculateRightData = (StationIDs, jicaStations, tableHead, data) => {
  //   var leftData = [];
  //   var rightData = [];

  //   var myStations =StationIDs===null ?jicaStations:jicaStations.filter(x=> StationIDs.includes(x.StationID))
  //   myStations.map(station => {
  //       const rowData = [];
  //       var obj = data.filter(x => x.StationID === station.StationID);
  //       //neu trong data co
  //       if (obj.length !== 0) {
  //         leftData.push([
  //           station.StationID,
  //           station.StationName.EN,
  //           obj[0].TotalRain,
  //         ]);
          

  //         tableHead.map(head => {
  //           var arrObj = Object.entries(obj[0].Data)
  //           // Object.keys(obj[0].Data).filter( key=> moment(key).format('MM-DD[\n]HH:mm') === head) 
  //           var rs= arrObj.filter(([key, value]) => moment(key).format('MM-DD[\n]HH:mm') === head);
  //           rs.length===0 ? rowData.push(''):rowData.push(rs[0][1].toFixed(1))
  //           });
  //       } else {
  //         leftData.push([station.StationID, station.StationName.EN, '']);
  //         tableHead.map(head => {
  //           rowData.push('');
  //         });
  //       }
  //       rightData.push(rowData);
     
  //     });
    
  //   return {leftData, rightData};

  //   // else{
  //   //   StationIDs.map(station =>{
  //   //     var obj = jicaStations.filter(x=>x.StationID===station)
  //   //     leftData.push([obj.StationID,obj.StationName.EN,obj.TotalRain]);
  //   //     const rowData = [];
  //   //     Object.keys(obj.data).map(function(key, index) {
  //   //       tableHead.map(head =>{
  //   //         if(moment(key).format('MM-DD[\n]HH:mm')===head){
  //   //           rowData.push(data[key].toFixed(1))
  //   //         }
  //   //       })
  //   //     });
  //   //     rightData.push(rowData)
  //   //   })
  //   // }
  // };

  render() {
     const {tableHead,arrRightSize,leftData,rightData} = this.props;
    // const {isFetching, stations, data, header} = this.props;
    // var {tableHead ,arrRightSize}= this.calculateRightHeader(
    //   header.DateTimeFrom,
    //   header.DateTimeTo,
    //   header.Interval,
    // );
 
    // let jicaStations =
    //   stations.length !== 0 ? stations.filter(x => x.Project === 'JICA') : [];
    // var {leftData, rightData} = this.calculateRightData(
    //   header.StationIDs,
    //   jicaStations,
    //   tableHead,
    //   data,
    // );
  
    // const recordData = [];
    // for (let i = 0; i < jicaStations.length; i += 1) {

    //   recordData.push([jicaStations[i].StationID,jicaStations[i].StationName.EN]);
    // }

    // const tableData = [];
    // for (let i = 0; i < jicaStations.length; i += 1) {
    //   const rowData = [];
    //   for (let j = 0; j < 9; j += 1) {
    //     rowData.push(`${i}${j}`);
    //   }
    //   tableData.push(rowData);
    // }
    
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#eee',
        }}>
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
