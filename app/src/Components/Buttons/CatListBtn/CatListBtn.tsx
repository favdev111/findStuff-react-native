import React from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from 'src/Theme';
import Styles from './CatListBtnStyle';

export default function CatListBtn(props) {
  const imgSrc = Images[props.imgSource];
  return (
    <View style={Styles.CatListBtnContainer}>
      <FastImage source={imgSrc} style={{width: 35, height: 35}} />
      <Text>{props.title}</Text>
    </View>
  );
}
