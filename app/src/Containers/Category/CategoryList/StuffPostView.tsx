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
import {NavigationEvents} from 'react-navigation';
import {baseUrl} from 'src/constants';
const axios = require('axios');

export default function CategoryList(props) {
  const [list, setList] = useState([]);
  const [tag, setTag] = useState('');

  const [tmp, setTmp] = useState('');
  const [key, setKey] = useState('');
  const [kind, setKind] = useState('');

  const handleSearch = () => {
    setKey(tmp);
  };

  const getList = () => {
    setKind(props.navigation.getParam('kind'));
    console.log('ccccccccccccccccccccc', kind);

    axios
      .get(baseUrl + 'api/stuffpost', {
        params: {
          kind: props.navigation.getParam('kind'),
          tag,
          key,
        },
      })
      .then(function(response) {
        console.log(response.data);
        console.log(response.data.length, '=======================');

        setList(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };

  useEffect(() => {
    getList();
  }, [tag, key, kind]);

  return (
    <ScrollView style={{backgroundColor: '#f4f6f8'}}>
      <NavigationEvents
        onDidFocus={() => {
          console.log('wweweweewe', props.navigation.getParam('kind'));
          getList();
        }}
      />
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
            <Text style={{fontSize: 20, color: '#fff'}}>
              {kind === 'lost' ? '寻物启事' : '失物招领'}
            </Text>
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
