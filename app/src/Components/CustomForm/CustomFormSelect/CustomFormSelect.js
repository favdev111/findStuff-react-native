import React from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import Styles from './CustomFormSelectStyle';
import RNPickerSelect from 'react-native-picker-select';
import {Images, Colors} from 'src/Theme';

export default function CustomFormSelect(props) {
  const {CustomFormSelectPlaceholder, CustomFormSelectLabel, procFunc} = props;

  const placeholder = {
    label: CustomFormSelectPlaceholder,
    value: null,
    color: Colors.grey,
  };
  return (
    <View style={Styles.CustomFormSelectContainer}>
      <View style={Styles.CustomFormSelectTextContainer}>
        <Text style={Styles.CustomFormSelectText}>{CustomFormSelectLabel}</Text>
      </View>
      <View style={Styles.CustomFormSelectPickerContainer}>
        <RNPickerSelect
          placeholder={placeholder}
          onValueChange={procFunc}
          items={[
            {label: 'key', value: 'key'},
            {label: 'wallet', value: 'wallet'},
            {label: 'bag', value: 'bag'},
          ]}
        />
      </View>
    </View>
  );
}
