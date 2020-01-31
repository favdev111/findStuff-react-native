import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, TextInput, Text} from 'react-native';
import Styles from './CustomPwdInputStyle';
import {Images} from 'src/Theme';

export default function CustomPwdInput(props) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View>
      <Text>{props.CustomPwdLabel}</Text>
      <View
        style={{
          flexDirection: 'row',
          borderColor: '#ddd',
          borderBottomWidth: 1,
        }}>
        <TextInput
          secureTextEntry={hidePassword}
          style={Styles.CustomTextInput}
          placeholder={props.CustomPwdPlaceholder}
          onChangeText={props.proc}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.touachableButton}
          onPress={() => setHidePassword(!hidePassword)}>
          <Image source={hidePassword ? Images.HideIcon : Images.ShowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
