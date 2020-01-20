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
import StuffCard from 'src/Components/Card/StuffCard';
import {tagJson} from 'src/constants';

import {baseUrl} from 'src/constants';
const axios = require('axios');

export default function CategoryList(props) {
  const kind = props.navigation.getParam('kind');

  const [list, setList] = useState([]);
  const [tag, setTag] = useState('');

  const [tmp, setTmp] = useState('');
  const [key, setKey] = useState('');

  const handleSearch = () => {
    setKey(tmp);
  };

  useEffect(() => {
    axios
      .get(baseUrl + 'api/stuffpost', {
        params: {
          kind,
          tag,
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
  }, [tag, key]);

  return (
    <ScrollView style={{backgroundColor: '#f4f6f8'}}>
      <View style={Styles.CategoryListContainer}>
        <View style={Styles.FindStuffHeaderContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('HomeView')}>
            <Image
              source={Images.whiteLeftChevron}
              style={Styles.FindStuffHeaderImg}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: '#fff'}}>寻物户示</Text>
          </View>
          <View style={Styles.HeaderRightImgContainer}></View>
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
        <View style={Styles.CategoryListWrap}>
          <FlatList
            horizontal={false}
            numColumns={4}
            style={Styles.CategoryFlatList}
            data={tagJson}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  const currentTag = Object.values(item);
                  console.log(currentTag[0]);
                  setTag(currentTag[0]);
                }}>
                <CatListBtn
                  title={Object.keys(item)}
                  imgSource={Object.values(item)}></CatListBtn>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <View style={Styles.CardsContainer}>
        {list.map((item, i) => (
          <StuffCard
            key={i}
            navigation={props.navigation}
            item={item}
            proc={() => {
              {
                props.navigation.navigate('StuffPostDetail', {item});
              }
            }}></StuffCard>
        ))}
      </View>
    </ScrollView>
  );
}
