import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, TextInput, Text} from 'react-native';
import Styles from './CustomVerifyInputStyle';

export default function CustomPwdInput(props) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View>
      <View style={Styles.textBoxContainer}>
        <Text>{props.CustomVerifyLabel}</Text>
        <TextInput
          secureTextEntry={hidePassword}
          style={Styles.textBox}
          placeholder={props.CustomPlaceholder}
          onChangeText={props.proc}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.touachableButton}
          onPress={() => setHidePassword(!hidePassword)}>
          <Text style={Styles.buttonImage}>| 获取验证码</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
