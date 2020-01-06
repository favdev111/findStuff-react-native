// React
import React, {Component} from 'react'
import {Text, FlatList, View, ScrollView, Image} from 'react-native'
import HomeCarousel from 'src/Components/HomeCarousel/HomeCarousel'
import styles from './HomeViewStyle'
import {Images} from 'src/Theme'
import CategoryAll from 'src/Containers/Category/CategoryAll'

export default class HomeView extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.homeScrollView}>
          <HomeCarousel />
          <View style={styles.HomeMainBtnGroup}>
            <Image style={{width: 52, height: 52}}
              source={Images.HomeFindBtn}
            />
            <Image style={{width: 52, height: 52}}
              source={Images.HomeGetBtn}
            />
          </View>
        </View>
        <CategoryAll style={styles.homeCategoryAll} />
      </View>
    )
  }
}
