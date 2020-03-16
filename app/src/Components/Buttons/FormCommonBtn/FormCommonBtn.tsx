import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Styles from './FormCommonBtnStyle';

export default function FormCommonBtn(props) {
  return (
    <TouchableOpacity style={Styles.FormCommonBtn} onPress={props.proc}>
      <Text style={Styles.FormCommonBtnText}>{props.CustomBtnTitle}</Text>
    </TouchableOpacity>
  );
}
