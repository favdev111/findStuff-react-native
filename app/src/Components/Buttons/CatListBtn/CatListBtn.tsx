import React from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import {Images} from 'src/Theme';
import Styles from './CatListBtnStyle';

export default function CatListBtn(props) {
  const imgSrc = Images[props.imgSource];
  return (
    <View style={Styles.CatListBtnContainer}>
      <Image source={imgSrc} style={{width: 35, height: 35}} />
      <Text>{props.title}</Text>
    </View>
  );
}
