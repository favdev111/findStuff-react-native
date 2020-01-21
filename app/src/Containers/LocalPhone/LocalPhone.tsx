import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import Styles from './LocalPhoneStyle';
import {Images, Colors} from 'src/Theme';
const axios = require('axios');
const messageListJson = [
  {
    city: 'city',
    apartmentNum: 'apartment Number',
    phoneNum: '154885454',
  },
  {
    city: 'city',
    apartmentNum: 'apartment Number',
    phoneNum: '154885454',
  },
  {
    city: 'city',
    apartmentNum: 'apartment Number',
    phoneNum: '154885454',
  },
  {
    city: 'city',
    apartmentNum: 'apartment Number',
    phoneNum: '154885454',
  },
  {
    city: 'city',
    apartmentNum: 'apartment Number',
    phoneNum: '154885454',
  },
  {
    city: 'city',
    apartmentNum: 'apartment Number',
    phoneNum: '154885454',
  },
];

export default function LocalPhone(props) {
  return (
    <ScrollView style={Styles.GetStuffScreenContainer}>
      <View style={Styles.FindStuffHeaderContainer}>
        <Text style={{fontSize: 20, color: '#fff'}}>小区电话</Text>
      </View>
      <View style={Styles.HomeSearchContainer}>
        <View style={Styles.HomeSearchArea}>
          <TouchableOpacity>
            <Image source={Images.Search} style={Styles.HomeSearchImg} />
          </TouchableOpacity>
          <View style={Styles.HomeSearchInputContainer}>
            <TextInput
              placeholder={'请输入关键词进行搜索'}
              style={Styles.HomeSearchInput}
              onChangeText={value => {
                setTmp(value);
              }}
            />
          </View>
        </View>
      </View>
      <View style={Styles.MessageListContainer}>
        <FlatList
          horizontal={false}
          style={Styles.MessageFlatList}
          data={messageListJson}
          renderItem={({item}) => (
            <View style={Styles.MessageListWrap}>
              <Text style={{color: Colors.grey}}>{item.city}</Text>
              <Text style={{color: Colors.grey}}>{item.apartmentNum}</Text>
              <Text style={{color: Colors.grey}}>{item.phoneNum}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
}
