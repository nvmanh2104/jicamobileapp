import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from 'react-native-responsive-linechart';
import moment from 'moment';

var {width, height} = Dimensions.get('window');
class LineChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    var {data} = this.props;
    
    // var yMin = data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
    var yMax = data.length ===0?0:data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
   

    return (
      <React.Fragment>
        {data.length !==0?
       <Chart
       style={{height: height*0.35, width: width*0.95}}
       data={data}
       padding={{left: 50, bottom: 50, right: 40, top: 30}}
       xDomain={{min: data[0].x, max: data[data.length-1].x}}
       yDomain={{min: 0, max: yMax}}>
       <VerticalAxis
         tickCount={5}
         theme={{labels: {formatter: v => v.toFixed(2) +"mm"}}}
       />
       <HorizontalAxis
         tickCount={9}
         includeOriginTick={true}
         theme={{
           labels: {
             visible: true,
             label: {
               color: '#000',
               fontSize: 10,
               fontWeight: 300,
               textAnchor: 'middle',
               opacity: 1,
               dx: 0,
               dy: -18,
               rotation: 45,
             },
             formatter: v => moment(v).format('HH:mm'),
           },
         }}
       />

       <Line
         tooltipComponent={
           <Tooltip
             theme={{shape: {
              width: 130,
              height: 20,
              dx: 0,
              dy: 20,
              rx: 4,
              color: 'black',
            },
               formatter: (v: data) =>`${String(moment(v.x).format('DD-MM HH:mm'))}-${String(v.y)} mm` ,
             }}
           />
         }
         theme={{
           stroke: {color: '#44bd32', width: 5},
           scatter: {
             default: {width: 8, height: 8, rx: 4, color: '#44ad32'},
             selected: {color: 'red'},
           },
         }}
       />
     </Chart>:
     <Text style ={{justifyContent:'center'}}>Missing Data</Text>
    }
       
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({aws}) => ({});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(LineChart);
