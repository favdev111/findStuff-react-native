// React
import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import StuffCard from 'src/Components/Card/StuffCard';
import {BaiduMapManager, Geolocation} from 'react-native-baidu-map';
import HomeCarousel from 'src/Components/HomeCarousel/HomeCarousel';
import styles from './HomeViewStyle';
import {Images} from 'src/Theme';

import {baseUrl} from 'src/constants';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import regionJson from 'src/Lib/rn-wheel-picker-china-region/regionJson';
import {NavigationEvents} from 'react-navigation';

import Modal from 'react-native-modal';

import Accordion from 'react-native-collapsible-accordion';

BaiduMapManager.initSDK('sIMQlfmOXhQmPLF1QMh4aBp8zZO9Lb2A');

function HomeView(props) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const [location, setLocation] = useState({});
  const [note, setNote] = useState('');

  const [state, setState] = useState({
    index: 0,
    routes: [
      {key: 'createAt', title: '最新'},
      {key: 'browse', title: '热门'},
      {key: 'ads', title: '精华'},
    ],
  });
  // const [state, dispatch] = useContext(store);

  const _filterCitys = province => {
    const provinceData = regionJson.find(item => item.name === province);

    return provinceData.city.map(item => item.name);
  };

  const _filterAreas = (province, city) => {
    const provinceData = regionJson.find(item => item.name === province);
    const cityData = provinceData.city.find(item => item.name === city);
    return cityData.area;
  };

  const [region, setRegion] = useState('新疆');
  const [citys, setCitys] = useState(_filterCitys('新疆'));
  const [areas, setAreas] = useState(_filterAreas('新疆', '乌鲁木齐'));

  const [selectedCity, setSelectedCity] = useState('乌鲁木齐');
  const [selectedArea, setSelectedArea] = useState('天山区');

  const [showArea, setShowArea] = useState(false);

  const [list, setList] = useState([]);
  const [key, setKey] = useState('');

  const handleTab = index => {
    setState({...state, index});
    getList();
  };

  const getList = () => {
    axios
      .get(baseUrl + 'api/stuffpost', {
        params: {
          sort: state.index,
          key,
          region,
        },
      })
      .then(function(response) {
        console.log('aa', response.data);
        setList(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };

  const getList2 = newRegion => {
    axios
      .get(baseUrl + 'api/stuffpost', {
        params: {
          sort: state.index,
          key,
          region: newRegion,
        },
      })
      .then(function(response) {
        console.log('bsssssssssssssssssss', response.data);
        setList(response.data);
      })
      .catch(function(error) {
        console.log('bbbbbwwwwwwwwwwwwwww', error);
      })
      .finally(function() {
        // always executed
      });
  };

  const getNote = () => {
    axios
      .post(baseUrl + 'api/notification/last')
      .then(function(response) {
        if (response.data.item) {
          setNote(response.data.item.content);
        }
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition().then(data => {
      setLocation(data);
    });
  };

  useEffect(() => {
    AsyncStorage.clear();

    getCurrentLocation();
    getNote();
    getList();

    return () => {};
  }, []);

  const ListArea = () => (
    <ScrollView style={{backgroundColor: '#ffffff', flex: 1}}>
      {list.map((item, i) => (
        <StuffCard
          key={i}
          navigation
          item={item}
          proc={() => {
            props.navigation.navigate('StuffPostDetail', {item});
          }}></StuffCard>
      ))}
    </ScrollView>
  );

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <NavigationEvents
          onDidFocus={() => {
            getList();
          }}
        />
        <View style={styles.homeScrollView}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: 25,
              backgroundColor: '#0084da',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setIsFilterVisible(true);
              }}>
              <Text style={{color: 'white', marginLeft: 10}}>
                {selectedArea}
              </Text>
              <Image
                source={Images.DownArrow}
                style={{width: 10, height: 10, margin: 3}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.HomeBannerContainer}>
            <HomeCarousel />
          </View>
          <View style={styles.HomeSearchContainer}>
            <View style={styles.HomeSearchArea}>
              <TouchableOpacity onPress={getList}>
                <Image source={Images.Search} style={styles.HomeSearchImg} />
              </TouchableOpacity>
              <View style={styles.HomeSearchInputContainer}>
                <TextInput
                  placeholder={'请输入关键词进行搜索'}
                  style={styles.HomeSearchInput}
                  onChangeText={value => {
                    setKey(value);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.HomeMainBtnGroup}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  props.navigation.navigate('StuffPostView', {kind: 'lost'})
                }>
                <Image
                  style={{width: 52, height: 52}}
                  source={Images.HomeFindBtn}
                />
                <Text style={{fontSize: 12}}>寻物启事</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  props.navigation.navigate('StuffPostView', {kind: 'found'})
                }>
                <Image
                  style={{width: 52, height: 52}}
                  source={Images.HomeGetBtn}
                />
                <Text style={{fontSize: 12}}>失物招领</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                props.navigation.navigate('NewsView', {kind: 'found'})
              }>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image
                  style={{width: 52, height: 52}}
                  source={Images.HomeNewsBtn}
                />
                <Text style={{fontSize: 12}}>新闻</Text>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  props.navigation.navigate('ContactView', {kind: 'found'})
                }>
                <Image
                  style={{width: 52, height: 52}}
                  source={Images.HomeMapBtn}
                />
                <Text style={{fontSize: 12}}>小区电话</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.HomeCategoryContainer}>
            {note.length > 0 && (
              <View style={styles.HomeNotificationArea}>
                <Image
                  source={Images.RedSound}
                  style={{width: 40, height: 40}}
                />
                <Text style={styles.HomeNotificationText} numberOfLines={2}>
                  {note}
                </Text>
              </View>
            )}
            <View>
              <TabView
                navigationState={state}
                renderScene={SceneMap({
                  createAt: ListArea,
                  browse: ListArea,
                  ads: ListArea,
                })}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    indicatorStyle={{backgroundColor: '#1071c8'}}
                    style={{backgroundColor: 'white', elevation: 0}}
                    labelStyle={{color: 'black'}}
                  />
                )}
                onIndexChange={index => handleTab(index)}
                initialLayout={{width: Dimensions.get('window').width}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={isFilterVisible}
        onBackdropPress={() => setIsFilterVisible(false)}
        coverScreen={false}
        style={{
          opacity: 0.8,
          backgroundColor: '#eee',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '55%',
          height: '100%',
          marginLeft: 0,
          marginTop: 0,
        }}>
        <View>
          <ScrollView>
            {citys.map((item, i) => (
              <Accordion
                onChangeVisibility={value => {
                  setShowMoreInfo(value);
                }}
                renderHeader={() => (
                  <View style={styles.wrapDropDownHeader}>
                    <Text style={{color: '#0057e7'}}>{item}</Text>
                  </View>
                )}
                renderContent={() => (
                  <View style={{paddingLeft: 30, marginTop: 5}}>
                    {_filterAreas('新疆', item).map((itemValue, idx) => (
                      <TouchableHighlight
                        style={{marginTop: 3}}
                        onPress={() => {
                          setSelectedArea(itemValue);
                          setIsFilterVisible(false);
                          setRegion('新疆,' + itemValue);
                          console.log('regionKey is ', itemValue);
                          getList2(itemValue);
                        }}>
                        <Text style={{color: '#ff3377'}}>{itemValue}</Text>
                      </TouchableHighlight>
                    ))}
                  </View>
                )}
              />
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

export default HomeView;
