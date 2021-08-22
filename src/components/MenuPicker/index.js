import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {Formik} from 'formik';
import Checkbox from '../Checkbox';
import moment from 'moment';
import DateTime from '../Datetime';
import Dropdown from '../Dropdown';
var {width, height} = Dimensions.get('window');

const DismissKeyboardHOC = Comp => {
  return ({children, ...props}) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View);

class MenuPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  } 
  handleSubmit =(values)=>{
    this.props.onSubmitForm(values)
  }
  componentDidMount() {}
  render() {

    return (
      <React.Fragment>
        <Modal
          backdropOpacity={0}
          isVisible={this.props.isVisible}
          animationIn="slideInLeft"
          animationOut="slideOutLeft">
          <View
            style={{
              backgroundColor: 'white',
              width: width,
              height: height * 0.8,
              padding: 22,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderColor: 'rgba(0, 0, 0, 0.1)',
             
            }}>
            <View style={{flex: 1}}>
              <Formik
                initialValues={{StationIDs: null,DateTimeFrom: moment().format('YYYY-MM-DDTHH:mm'),
                DateTimeTo: moment().format('YYYY-MM-DDTHH:mm'),
              Interval : 10
              
              }}
                onSubmit={values => this.handleSubmit(values)}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  setFieldValue,
                }) => (
                  <React.Fragment>
                    <View style={styles.formGroup}>
                      <Text style={styles.inputText}>StationID</Text>
                      <DismissKeyboardView>
                        <TextInput
                          style={styles.input}
                          onChangeText={handleChange('StationIDs')}
                          onBlur={handleBlur('StationIDs')}
                          value={values.StationIDs}
                        />
                      </DismissKeyboardView>
                    </View>
                    <View style={styles.formGroup}>
                    
                    
                    <DateTime name = 'DateTimeFrom' label="StartDate" value={values.DateTimeFrom} setFieldValue={setFieldValue}  />
                    <DateTime name = 'DateTimeTo' label="EndDate" value={values.DateTimeTo} setFieldValue={setFieldValue} />
                  

                    <Dropdown name = 'Interval' label="Interval" value={values.Interval} setFieldValue={setFieldValue}/>

                    </View>
                    <TouchableOpacity style = {styles.btnSubmit}
                    onPress ={handleSubmit}
           
                    >
                      <Text style ={styles.btnSubmitText}>Submit</Text>
                    </TouchableOpacity>
                    {/* <Button style ={styles.btnSubmit}onPress={handleSubmit} title="Submit" /> */}
                  </React.Fragment>
                )}
              </Formik>
              <TouchableOpacity style = {styles.btnClose}
                    onPress ={this.props.closeModal}
           
                    >
                      <Text style ={styles.btnSubmitText}>Close</Text>
                    </TouchableOpacity>
            </View>
             
            
                  
           
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
  };
};
const BTN ={
    zIndex:1,
    height: 40,
    borderRadius:10,
    justifyContent:'center',
    marginTop:25
}
const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 10,
    zIndex:100
  },
  input: {
    height: 40,
    width: width - 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 25,
    fontSize: 16,
    borderWidth: 1,
  },
  inputText: {
    color: '#7d7e79',
    fontSize: 16,
    lineHeight: 30,
  },
  btnSubmit:{
    ...BTN,
    backgroundColor:"#006da9",
  },
  btnClose:{
    ...BTN,
    backgroundColor:"#DC143C",
  },
  btnSubmitText:{
    color :"#fff",
    textAlign:'center',
    fontWeight:'700'
  }
});

export default connect(mapStateToProps, undefined, mergeProps)(MenuPicker);
