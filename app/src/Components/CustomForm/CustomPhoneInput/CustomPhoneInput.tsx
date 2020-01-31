import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Styles from './CustomPhoneInputStyle';

export default function CustomPhoneInput(props) {
  return (
    <View>
      <Text>{props.CustomLabel}</Text>
      <View
        style={{
          flexDirection: 'row',
          borderColor: '#ddd',
          borderBottomWidth: 1,
        }}>
        <TextInput
          style={Styles.CustomTextInput}
          placeholder={props.CustomPlaceholder}
          onChangeText={props.proc}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.touachableButton}
          onPress={props.proc2}>
          <Text>| 发送验证码</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
