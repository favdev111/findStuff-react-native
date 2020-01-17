import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import LostCard from 'src/Components/Card/LostCard';

import {baseUrl} from 'src/constants';
const axios = require('axios');

export default function HomeCategoryTab() {
  const [state, setState] = useState({
    index: 0,
    routes: [
      {key: 'createAt', title: '最新'},
      {key: 'browse', title: '热门'},
    ],
  });

  const [list, setList] = useState([]);

  const ListArea = () => (
    <ScrollView style={[styles.scene, {backgroundColor: '#ffffff'}]}>
      {list.map((item, i) => (
        <LostCard key={i} item={item}></LostCard>
      ))}
    </ScrollView>
  );

  useEffect(() => {
    axios
      .get(baseUrl + 'api/lostpost', {
        params: {
          sort: state.index,
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
  }, [state]);

  return (
    <TabView
      navigationState={state}
      renderScene={SceneMap({
        createAt: ListArea,
        browse: ListArea,
      })}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#1071c8'}}
          style={{backgroundColor: 'white', elevation: 0}}
          labelStyle={{color: 'black'}}
        />
      )}
      onIndexChange={index => setState({...state, index})}
      initialLayout={{width: Dimensions.get('window').width}}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
