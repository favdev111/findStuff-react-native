import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Styles from './CategoryListStyle';
import FastImage from 'react-native-fast-image';
import {Images} from 'src/Theme';

const SearchBox = props => {
  return (
    <View style={Styles.HomeSearchArea}>
      <View style={Styles.HomeSearchInputContainer}>
        <TextInput
          placeholder={'请输入关键词进行搜索'}
          style={Styles.HomeSearchInput}
          onChangeText={props.inputProc}
        />
        <FastImage source={Images.Search} style={Styles.HomeSearchImg} />
      </View>
      <TouchableOpacity
        onPress={props.handleSearch}
        style={Styles.HomeSearchBtn}>
        <Text>搜索</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
