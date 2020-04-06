// React
import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeModules,
  NativeEventEmitter,
  Platform,
  Alert,
} from 'react-native';
import { BackHandler } from 'react-native';    // hardware backhandler
import FastImage from 'react-native-fast-image';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import StuffCard from 'src/Components/Card/StuffCard';
import HomeCarousel from 'src/Components/HomeCarousel/HomeCarousel';
import styles from './HomeViewStyle';
import {Images} from 'src/Theme';

import axios from 'axios';
import {baseUrl} from 'src/config';

import regionJson from 'src/Lib/rn-wheel-picker-china-region/regionJson';
import {NavigationEvents} from 'react-navigation';
import Modal from 'react-native-modal';
import Accordion from 'react-native-collapsible-accordion';
import {store} from 'src/Store';
import io from 'socket.io-client';

// import {Geolocation} from 'react-native-baidu-map';
import {init} from 'react-native-amap-geolocation';
import {Location, ReGeocode} from './types';
import {checkPermissions, requestLocationPermission} from 'src/Permissions';

import AsyncStorage from '@react-native-community/async-storage';
import {RESULTS} from 'react-native-permissions';

const AMapGeolocation = NativeModules.AMapGeolocation;
const eventEmitter = new NativeEventEmitter(AMapGeolocation);

function HomeView(props) {
  const [state, dispatch] = useContext(store);

  const [isGpsDlgVisible, setIsGpsDlgVisible] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const [list, setList] = useState([]);
  const [key, setKey] = useState('');
  const [keyTmp, setKeyTmp] = useState('');

  const [tabState, setTabState] = useState({
    index: 0,
    routes: [
      {key: 'ads', title: '精华'},
      {key: 'browse', title: '热门'},
      {key: 'createAt', title: '最新'},
    ],
  });

  const _filterCitys = province => {
    const provinceData = regionJson.find(item => item.name === province);
    return provinceData.city.map(item => item.name);
  };

  const _filterAreas = (province, city) => {
    const provinceData = regionJson.find(item => item.name === province);
    const cityData = provinceData.city.find(item => item.name === city);
    return cityData.area;
  };

  const [citys, setCitys] = useState(_filterCitys('新疆'));

  const getList = () => {
    axios
      .get(baseUrl + 'api/stuffpost', {
        params: {
          sort: tabState.index,
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
      .finally(function() {});
  };

  const getLastNote = () => {
    axios
      .get(baseUrl + 'api/notification', {
        params: {region: state.region, limit: 1},
      })
      .then(function(response) {
        if (response.data.item === 0) {
          dispatch({type: 'setLastNote', payload: {content: ''}});
        } else {
          dispatch({type: 'setLastNote', payload: response.data});
        }
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {});
  };

  const updateLocation = location => {
    if (!state.user._id || !location) return;

    console.log('will update my locatoin as ', location);

    axios
      .post(baseUrl + 'api2/user/location', {
        user_id: state.user._id,
        location,
      })
      .then(function(response) {
        console.log(response.data, 'setLocation result...');
      })
      .catch(function(error) {
        console.log(error, 'setLocation error...');
      })
      .finally(function() {});
  };

  const getBaiduLocation = () => {
    // Geolocation.getCurrentPosition()
    // .then((data) => {
    //   console.log('>>>>>>>>>>', data);
    // });
    // console.log('@@@@@@@@@@@@@@@@');
    //   const promise= Geolocation.getCurrentPosition("gcj02");
    //   promise.then(data => {
    //       console.log('!!!!!!!!!!!!!!!!!!!!!!!!!', data);
    //       if (data.city) {
    //         dispatch({type: 'setRegion', payload: data.city});
    //         updateLocation(data.city);
    //       }
    //     }, err => {
    //       console.log('promise error====', err);
    //     });
  };

  function addLocationListener(
    listener: (location: Location & ReGeocode) => void,
  ) {
    return eventEmitter.addListener('AMapGeolocation', listener);
  }

  const geoAMapLocation = async () => {
    if (Platform.OS === 'android') {
      await requestLocationPermission();
      const location_ps = await checkPermissions('location');
      console.log('location_ps...', location_ps);
    }

    try {
      await init({
        ios: '099b23712ab62b8704c42b256553d6dd',
        android: '7c09f30df0777beee6f441252b0fa1f2',
      });

      if (Platform.OS === 'ios') {
        AMapGeolocation.setLocatingWithReGeocode(true);
      }

      const listener = addLocationListener(location => {
        if (location.city) {
          dispatch({type: 'setRegion', payload: location.city});
          updateLocation(location);

          AMapGeolocation.stop();
          listener.remove();
          console.log('location listener removed...');
        }
      });

      AMapGeolocation.start();
      console.log('location listener started...');
    } catch (err) {
      console.log('+++++++++++++++++++++++++++>', err);
    }
  };

  useEffect(() => {
    geoAMapLocation();
    //getBaiduLocation();

    return () => {};
  }, [state.user._id]);

  useEffect(() => {
    console.log(
      'changed region... ... .. ',
      state.current_screen,
      state.region,
      tabState.index,
      key,
    );
    getList();
  }, [state.region, tabState.index, key]);

  useEffect(() => {}, [list]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton); 
    console.log('component did mounted');
  }, []);

  useEffect(() => {
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      console.log('component will unmounted');
    }
  }, []);

  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   console.log('you clicked back button. go to the app home.');
  //   props.navigation.navigate(
  //     'SplashScreen',
  //     {
  //       onGoBack: () => console.log('Will go back from nextComponent'),
  //     }
  //     );
  //   return true;
  // });

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('willFocus', () => {
      console.log('focus');
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    });

    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('willBlur', () => {
      console.log('blur');
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    });

    return unsubscribe;
  }, [props.navigation]);


  const handleBackButton = () => {               
    Alert.alert(
        '提示',
        '是否退出寻N?', [{
            text: '取消',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: '确定',
            onPress: () => BackHandler.exitApp()
        }, ], {
            cancelable: false
        }
     )
     return true;
   }

  useEffect(() => {
    getLastNote();
  }, [state.region]);

  const getsignInfo = async () => {
    try {
      if (state.user._id) return;
      console.log('will get signinfo from the asyncStorage...');
      const rawSignInfo = await AsyncStorage.getItem('signInfo');
      console.log('signInfo=====================>', rawSignInfo);
      if (!rawSignInfo) return;
      const signInfo = JSON.parse(rawSignInfo);
      dispatch({
        type: 'setTokenUser',
        payload: signInfo,
      });
      dispatch({
        type: 'setSocket',
        payload: io(baseUrl, {
          query: {user_id: signInfo.user._id},
          ransports: ['websocket'],
          jsonp: false,
        }),
      });
    } catch (error) {
      console.log('getSignInfo exception... ... ...', error);
    }
    return {};
  };

  useEffect(() => {
    getsignInfo();
  }, []);

  const ListArea = () => (
    <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
      {list.map((item, i) => (
        <StuffCard
          key={i}
          navigation={props.navigation}
          item={item}></StuffCard>
      ))}
    </ScrollView>
  );

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <NavigationEvents
          onDidFocus={() => {
            getLastNote();
            getList();
            dispatch({type: 'setCurrentScreen', payload: 'home'});
          }}
        />
        <View style={styles.homeScrollView}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: Platform.OS === 'android' ? 25 : 40,
              paddingBottom: 3,
              backgroundColor: '#0084da',
              alignItems: 'flex-end',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setIsGpsDlgVisible(true);
              }}>
              <Text style={{color: 'white', marginLeft: 10}}>
                {state.region}
              </Text>
              <FastImage
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
              <View style={styles.HomeSearchInputContainer}>
                <TextInput
                  placeholder={'请输入关键词进行搜索'}
                  style={styles.HomeSearchInput}
                  onChangeText={value => {
                    setKeyTmp(value);
                  }}
                />
                <FastImage
                  source={Images.Search}
                  style={styles.HomeSearchImg}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setKey(keyTmp);
                }}
                style={styles.HomeSearchBtn}>
                <Text>搜索</Text>
              </TouchableOpacity>
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
                <FastImage
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
                <FastImage
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
                <FastImage
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
                <FastImage
                  style={{width: 52, height: 52}}
                  source={Images.HomeMapBtn}
                />
                <Text style={{fontSize: 12}}>小区电话</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.HomeCategoryContainer}>
            <View style={styles.HomeNotificationArea}>
              <FastImage
                source={Images.RedSound}
                style={{width: 20, height: 18}}
              />
              <Text style={styles.HomeNotificationText} numberOfLines={2}>
                {state.last_note.content ? state.last_note.content : ''}
              </Text>
            </View>

            <View>
              <TabView
                navigationState={tabState}
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
                onIndexChange={index => {
                  setKey(keyTmp);
                  setTabState({...tabState, index});
                }}
                initialLayout={{width: Dimensions.get('window').width}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={isGpsDlgVisible}
        onBackdropPress={() => setIsGpsDlgVisible(false)}
        coverScreen={false}
        style={{
          opacity: 0.8,
          backgroundColor: '#0af',
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
                    <Text style={{color: '#fff'}}>{item}</Text>
                  </View>
                )}
                renderContent={() => (
                  <View
                    style={{
                      paddingLeft: 30,
                      marginTop: 5,
                      backgroundColor: '#0cf',
                    }}>
                    {_filterAreas('新疆', item).map((itemValue, idx) => (
                      <TouchableOpacity
                        style={{marginTop: 3}}
                        onPress={() => {
                          dispatch({type: 'setRegion', payload: itemValue});
                          setIsGpsDlgVisible(false);
                        }}>
                        <Text style={{color: '#fff'}}>{itemValue}</Text>
                      </TouchableOpacity>
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
