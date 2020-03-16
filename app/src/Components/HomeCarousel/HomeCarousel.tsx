import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {Images} from 'src/Theme';
import styles from './HomeCarouselStyle';

export default function HomeCarousel() {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        // onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
        dot={<View style={styles.carouselDot} />}
        activeDot={<View style={styles.carouselActiveDot} />}
        paginationStyle={{
          bottom: 23,
          left: 0,
          right: 0,
        }}
        loop
        autoplay>
        <View style={styles.slide}>
          <FastImage
            resizeMode="stretch"
            style={styles.image}
            source={Images.HomeBannerImg}
          />
        </View>
        <View style={styles.slide}>
          <FastImage
            resizeMode="stretch"
            style={styles.image}
            source={Images.HomeCarousel1}
          />
        </View>
        <View style={styles.slide}>
          <FastImage
            resizeMode="stretch"
            style={styles.image}
            source={Images.HomeCarousel2}
          />
        </View>
        <View style={styles.slide}>
          <FastImage
            resizeMode="stretch"
            style={styles.image}
            source={Images.HomeCarousel3}
          />
        </View>
      </Swiper>
    </View>
  );
}
