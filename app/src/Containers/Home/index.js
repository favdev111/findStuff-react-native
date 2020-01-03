// React
import React, {Component} from 'react'
import {Text, FlatList, View, ScrollView, Image} from 'react-native'
import HomeCarousel from 'src/Components/HomeCarousel/HomeCarousel'
import styles from './HomeScreenStyle'
import {Images} from 'src/Theme'


export default class HomeScreen extends React.Component {

  render() {
    return (
      <ScrollView style={styles.homeScrollView}>
        <HomeCarousel />
        <View style={styles.HomeMainBtnGroup}>
          <Image style={{width: 52, height: 52}}
            source={Images.HomeFindBtn}
          />
          <Image style={{width: 52, height: 52}}
            source={Images.HomeGetBtn}
          />
        </View>
      </ScrollView>
    )
  }
}
