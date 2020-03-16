import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, Text} from 'react-native';
import Styles from './CustomVerifyInputStyle';

export default function CustomPwdInput(props) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View>
      <Text>{props.CustomVerifyLabel}</Text>
      <View
        style={{
          flexDirection: 'row',
          borderColor: '#ddd',
          borderBottomWidth: 1,
        }}>
        <TextInput
          secureTextEntry={hidePassword}
          placeholder={props.CustomPlaceholder}
          onChangeText={props.proc}
          style={Styles.CustomTextInput}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.touachableButton}
          onPress={() => setHidePassword(!hidePassword)}>
          <Text>| 获取验证码</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
