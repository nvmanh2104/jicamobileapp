import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {Text, View} from 'react-native';

const Checkbox = ({children,value,handleChange, ...props}) => {
  return (
    <View>
      <View>
      <CheckBox
          type={'checkbox'}
          value={value}
          onValueChange={handleChange}
          //   checked={value}
          {...props}
        />
        <Text>{children}</Text>
      </View>
    </View>
  );
};

export default Checkbox;
