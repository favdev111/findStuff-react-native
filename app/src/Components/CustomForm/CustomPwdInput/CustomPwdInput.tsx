import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, Text, Image} from 'react-native';
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
          <Image
            resizeMode="contain"
            style={{width: 25}}
            source={hidePassword ? Images.HideIcon : Images.ShowIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
