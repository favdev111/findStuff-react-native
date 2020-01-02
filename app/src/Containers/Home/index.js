// React
import React, {Component} from 'react'
import {Text, FlatList, View, ScrollView} from 'react-native'
import HomeCarousel from 'src/Components/HomeCarousel/HomeCarousel'
import styles from './HomeScreenStyle'


export default class HomeScreen extends React.Component {


  render() {
  
    return (
      <ScrollView style={styles.homeScrollView}>
        <HomeCarousel />
      </ScrollView>
    )
  }
}
