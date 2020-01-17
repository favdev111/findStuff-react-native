import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, TextInput, Text} from 'react-native';
import Styles from './CustomPwdInputStyle';
import {Images} from 'src/Theme';

export default function CustomPwdInput(props) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View>
      <View style={Styles.textBoxContainer}>
        <Text>{props.CustomPwdLabel}</Text>
        <TextInput
          secureTextEntry={hidePassword}
          style={Styles.textBox}
          placeholder={props.CustomPwdPlaceholder}
          onChangeText={props.proc}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.touachableButton}
          onPress={() => setHidePassword(!hidePassword)}>
          <Image
            source={hidePassword ? Images.HideIcon : Images.ShowIcon}
            style={Styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
