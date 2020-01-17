import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Styles from './CustomTextInputStyle';

export default function CustomTextInput(props) {
  return (
    <View style={{flex: 1}}>
      <Text>{props.CustomLabel}</Text>
      <TextInput
        style={Styles.CustomTextInput}
        placeholder={props.CustomPlaceholder}
        onChangeText={props.proc}
      />
    </View>
  );
}
