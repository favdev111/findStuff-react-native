import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Style from './RoundBtnStyle';
import {Colors} from 'src/Theme';
import {dotedBadge} from 'src/utils';

export default function RoundBtn(props) {
  return (
    <View
      style={[
        Style.RoundBtnWrap,
        {backgroundColor: Colors[props.RoundBtnColor]},
      ]}>
      <TouchableOpacity onPress={props.proc}>
        <Text style={Style.RoundBtnText}>
          {dotedBadge(props.RoundBtnTitle)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
