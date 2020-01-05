import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import {Images} from 'src/Theme'
import styles from './HomeCarouselStyle'


export default class extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} 
          // onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={styles.carouselDot} />}
          activeDot={<View style={styles.carouselActiveDot} />}
          paginationStyle={{
            bottom: 23, left: null, right: 10
          }} loop autoplay>
          <View style={styles.slide}>
            <Image resizeMode='stretch' style={styles.image} source={Images.HomeCarousel1} />
          </View>
          <View style={styles.slide}>
            <Image resizeMode='stretch' style={styles.image} source={Images.HomeCarousel2} />
          </View>
          <View style={styles.slide}>
            <Image resizeMode='stretch' style={styles.image} source={Images.HomeCarousel3} />
          </View>
        </Swiper>
      </View>
    )
  }
}