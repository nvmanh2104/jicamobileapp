// TableDemo.tsx

import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Table,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import {connect} from 'react-redux';
const borderColor = '#C1C0B9';
const primaryColor = 'dodgerblue';
const backgroundColor = '#F7F6E7';

const headerHeight = 40;
const leftColumnWidth = 180;

class Tables extends React.Component {

    constructor(props) {
        super(props);
        this.leftRef = React.createRef();
       
        this.rightRef = React.createRef();
  
        this.state = {
            leftHead:[
                'Station',
                'Name'
            ],
            lefArr :[80,100],
            tableHead: [
              'Head1',
              'Head2',
              'Head3',
              'Head4',
              'Head5',
              'Head6',
              'Head7',
              'Head8',
              'Head9',
            ],
            widthArr: [50, 60, 80, 100, 120, 140, 160, 180, 200],
          };
        
      }
//   const leftRef = useRef<ScrollView>(null);
//   const rightRef = useRef<ScrollView>(null);

  

  
render(){

  const{isFetching,stations}= this.props

  let jicaStations =  stations.length!==0 ? stations.filter(x =>x.Project==='JICA'):[]

console.log(jicaStations)
const recordData = [];
for (let i = 0; i < jicaStations.length; i += 1) {
  
  recordData.push([jicaStations[i].StationID,jicaStations[i].StationName.EN]);
}

const tableData = [];
for (let i = 0; i < jicaStations.length; i += 1) {
  const rowData = [];
  for (let j = 0; j < 9; j += 1) {
    rowData.push(`${i}${j}`);
  }
  tableData.push(rowData);
}


  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eee',
      }}
    >
      {/* Left Column */}
      <View
        style={{
           width: leftColumnWidth,
          backgroundColor: 'white',
        }}
      >
        <ScrollView horizontal={true} bounces={false}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor }}>
              <Row
                data={this.state.leftHead}
                widthArr={this.state.lefArr}
                style={styles.head}
                textStyle={{ ...styles.text, color: 'white' }}
              />
            </Table>
            <ScrollView
             ref={this.leftRef}
              style={styles.dataWrapper}
              scrollEventThrottle={16}
              bounces={false}
             
            >
              <Table borderStyle={{ borderWidth: 1, borderColor }}>
                {recordData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={this.state.lefArr}
                    style={index % 2 ? styles.row : { backgroundColor }}
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
        }}
      >
        <ScrollView horizontal={true} bounces={false}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor }}>
              <Row
                data={this.state.tableHead}
                widthArr={this.state.widthArr}
                style={styles.head}
                textStyle={{ ...styles.text, color: 'white' }}
              />
            </Table>
            <ScrollView
             ref={this.rightRef}
              style={styles.dataWrapper}
              scrollEventThrottle={16}
              bounces={false}
              onScroll={(e) => {
                const { y } = e.nativeEvent.contentOffset;
                this.leftRef.current?.scrollTo({ y, animated: false });
              }}
            >
              <Table borderStyle={{ borderWidth: 1, borderColor }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={this.state.widthArr}
                    style={index % 2 ? styles.row : { backgroundColor }}
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
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#eee' },
  head: { height: 40, backgroundColor: primaryColor },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
});


const mapStateToProps = ({netInfo, aws}) => ({
    // netInfo,
    //   isFetching: weatherNews.isFetching,
    //   news: weatherNews.news,
    stations: aws.stationReducer.stations,
  });
  
  const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const {dispatch} = dispatchProps;
  
    return {
      ...ownProps,
      ...stateProps,
      
    };
  };
  
  export default connect(mapStateToProps, undefined, mergeProps)(Tables);