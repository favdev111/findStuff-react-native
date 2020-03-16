import React, {useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from 'src/Theme';
import Styles from './CategoryListStyle';
import Style from 'src/Style';
import Header from 'src/Components/Header/Header';
import NewsCard from 'src/Components/Card/NewsCard/NewsCard';
import {baseUrl} from 'src/config';
import axios from 'axios';
import {store} from 'src/Store';

export default function CategoryList(props) {
  const [state, dispatch] = useContext(store);

  const getList = () => {
    axios
      .get(baseUrl + 'api/news', {
        params: {},
      })
      .then(function(response) {
        dispatch({type: 'setNews', payload: response.data});
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };

  useEffect(() => {
    console.log('current_screen value is...', state.current_screen);
    getList();
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#f4f6f8'}}>
      <View style={Styles.CategoryListContainer}>
        <Header back={() => props.navigation.goBack()} label={'新闻'} />
      </View>
      <View>
        {state.news &&
          state.news.map((item, i) => (
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
