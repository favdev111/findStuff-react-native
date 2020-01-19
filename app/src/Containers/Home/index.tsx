// React
import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './HomeViewStyle';
import {Images} from 'src/Theme';
import HomeCategoryTab from 'src/Containers/Category/HomeCategoryTab/HomeCategoryTab';

export default function HomeView({navigation}) {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.homeScrollView}>
        <View style={styles.HomeBannerContainer}>
          <Image source={Images.HomeBannerImg} style={styles.HomeBannerImg} />
        </View>
        <View style={styles.HomeSearchContainer}>
          <View style={styles.HomeSearchArea}>
            <View>
              <Image source={Images.Search} style={styles.HomeSearchImg} />
            </View>
            <View style={styles.HomeSearchInputContainer}>
              <TextInput
                placeholder={'请输入关键词进行搜索'}
                style={styles.HomeSearchInput}
              />
            </View>
          </View>
        </View>
        <View style={styles.HomeMainBtnGroup}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LostCategoryView')}>
              <Image
                style={{width: 52, height: 52}}
                source={Images.HomeFindBtn}
              />
              <Text>寻物启事</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FoundCategoryView')}>
              <Image
                style={{width: 52, height: 52}}
                source={Images.HomeGetBtn}
              />
              <Text>失物招领</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
          onPress={() => navigation.navigate('News')}
          style={{flexDirection: 'column', alignItems: 'center'}}>
            <Image
              style={{width: 52, height: 52}}
              source={Images.HomeNewsBtn}
            />
            <Text>新闻</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => navigation.navigate('LocalPhone')}
          style={{flexDirection: 'column', alignItems: 'center'}}>
            <Image style={{width: 52, height: 52}} source={Images.HomeMapBtn} />
            <Text>小区电话</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.HomeCategoryContainer}>
          <View style={styles.HomeNotificationArea}>
            <Image source={Images.RedSound} style={{width: 40, height: 40}} />
            <Text style={styles.HomeNotificationText} numberOfLines={2}>
              北风伴冬阳！北京今日晴为主 北风三级注意防寒
              注意保暖！广东明后天新冷空气抵达 降温又降雨
              重庆市优质气候品牌亮相第十九届西部农交会
              新疆特克斯县经专家评审入选“中国气候康养地”
              春运首日湖南雨水作伴河北大雾来袭航班延误
              2020春运首日：全国路网总体顺畅 通行状况良好
            </Text>
          </View>
          <View>
            <HomeCategoryTab />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
