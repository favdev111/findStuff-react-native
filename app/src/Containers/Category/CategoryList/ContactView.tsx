import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {Images, Colors} from 'src/Theme';
import CatListBtn from 'src/Components/Buttons/CatListBtn/CatListBtn';
import Styles from './CategoryListStyle';
import ContactCard from 'src/Components/Card/ContactCard';
import {tagJson} from 'src/constants';

import {baseUrl} from 'src/constants';
const axios = require('axios');

export default function CategoryList(props) {
  const [list, setList] = useState([]);

  const [tmp, setTmp] = useState('');
  const [key, setKey] = useState('');

  const handleSearch = () => {
    setKey(tmp);
  };

  useEffect(() => {
    axios
      .get(baseUrl + 'api/contact', {
        params: {
          key,
        },
      })
      .then(function(response) {
        console.log(response.data);

        setList(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, [key]);

  return (
    <ScrollView style={{backgroundColor: '#f4f6f8'}}>
      <View style={Styles.CategoryListContainer}>
        <View style={Styles.FindStuffHeaderContainer}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => props.navigation.navigate('HomeView')}>
            <Image
              source={Images.whiteLeftChevron}
              style={Styles.FindStuffHeaderImg}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: '#fff'}}>小区电话</Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={Styles.HomeSearchContainer}>
          <View style={Styles.HomeSearchArea}>
            <TouchableOpacity onPress={handleSearch}>
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
      </View>
      <View style={Styles.CardsContainer}>
        {list.map((item, i) => (
          <ContactCard key={i} idx={i} item={item}></ContactCard>
        ))}
      </View>
    </ScrollView>
  );
}
