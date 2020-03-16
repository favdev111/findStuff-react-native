import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images, Colors} from 'src/Theme';
import Style from 'src/Style';

export default function Header(props) {
  return (
    <View style={Style.FindStuffHeaderContainer}>
      <TouchableOpacity style={{flex: 1}} onPress={props.back}>
        <FastImage
          source={Images.whiteLeftChevron}
          style={Style.FindStuffHeaderImg}
        />
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: '#fff'}}>{props.label}</Text>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
}
