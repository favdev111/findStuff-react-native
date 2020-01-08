// React
import React, {Component} from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'
import {Text, FlatList, View, ScrollView, Image} from 'react-native'
import HomeCarousel from 'src/Components/HomeCarousel/HomeCarousel'
import styles from './HomeViewStyle'
import {Images} from 'src/Theme'
import CategoryAll from 'src/Containers/Category/CategoryAll'

export default class HomeView extends Component {

  render() {
    const {navigation} = this.props
    return (
        <ScrollView style={{flex: 1 }}>
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
        </ScrollView>
    )
  }
}