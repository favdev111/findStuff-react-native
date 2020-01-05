// React
import React, {Component} from 'react'
import {Text, FlatList, View, ScrollView, Image} from 'react-native'
import HomeCarousel from 'src/Components/HomeCarousel/HomeCarousel'
import styles from './HomeViewStyle'
import {Images} from 'src/Theme'
// import BottomTabNavigator from 'src/Components/BottomTabNav/BottomTabNav'


export default class HomeView extends React.Component {
  // static router = BottomTabNavigator.router
  render() {
    // const {navigation} = this.props
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
