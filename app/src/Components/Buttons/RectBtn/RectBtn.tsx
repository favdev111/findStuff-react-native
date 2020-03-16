import React from 'react';
import {View, Text} from 'react-native';
import Style from './RectBtnStyle';
import {Colors} from 'src/Theme';

export default function RectBtn(props) {
  return (
    <View
      style={[
        Style.RectBtnWrap,
        {backgroundColor: Colors[props.RectBtnColor]},
      ]}>
      <Text style={Style.RectBtnText}>{props.RectBtnTitle}</Text>
    </View>
  );
}
