import React, {useState, useEffect, useRef, useContext} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from 'src/Theme';
import CatListBtn from 'src/Components/Buttons/CatListBtn/CatListBtn';
import Styles from './CategoryListStyle';
import Style from 'src/Style';
import Header from 'src/Components/Header/Header';
import StuffCard from 'src/Components/Card/StuffCard';
import {tagJson} from 'src/config';
import {NavigationEvents} from 'react-navigation';
import {baseUrl} from 'src/config';
import {store} from 'src/Store';

import SearchBox from './SearchBox';

const axios = require('axios');

export default function CategoryList(props) {
  const [state, dispatch] = useContext(store);

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

    axios
      .get(baseUrl + 'api/stuffpost', {
        params: {
          kind: props.navigation.getParam('kind'),
          tag,
          key,
          region: state.region,
        },
      })
      .then(function(response) {
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
          getList();
          dispatch({type: 'setCurrentScreen', payload: 'post-list'});
        }}
      />
      <View style={Styles.CategoryListContainer}>
        <Header
          back={() => props.navigation.goBack()}
          label={kind === 'lost' ? '寻物启事' : '失物招领'}
        />

        <SearchBox inputProc={setTmp} handleSearch={handleSearch} />
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
      <View>
        {list.map((item, i) => (
          <StuffCard
            key={i}
            navigation={props.navigation}
            item={item}></StuffCard>
        ))}
      </View>
    </ScrollView>
  );
}
