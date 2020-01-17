import React from 'react';
import {View, Button, Text, TouchableHighlight} from 'react-native';
import Styles from './FormCommonBtnStyle';

export default function FormCommonBtn(props) {
  return (
    <TouchableHighlight style={Styles.FormCommonBtn} onPress={props.proc}>
      <Text style={Styles.FormCommonBtnText}>{props.CustomBtnTitle}</Text>
    </TouchableHighlight>
  );
}
