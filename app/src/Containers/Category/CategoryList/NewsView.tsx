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
import NewsCard from 'src/Components/Card/NewsCard/NewsCard';
import {tagJson} from 'src/constants';

import {baseUrl} from 'src/constants';
const axios = require('axios');

export default function CategoryList(props) {
  const kind = props.navigation.getParam('kind');
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + 'api/news', {
        params: {},
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
  }, []);

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
            <Text style={{fontSize: 20, color: '#fff'}}>新闻</Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </View>
      <View style={Styles.CardsContainer}>
        {list.map((item, i) => (
          <NewsCard
            key={i}
            item={item}
            proc={() => {
              {
                props.navigation.navigate('NewsDetail', {item});
              }
            }}></NewsCard>
        ))}
      </View>
    </ScrollView>
  );
}
