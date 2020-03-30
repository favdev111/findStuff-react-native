// React
import React, {useEffect, useState, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {withNavigation} from 'react-navigation';
import {
  View,
  Image,
} from 'react-native';

import styles from './SplashScreenStyle';
import {Images} from 'src/Theme';

function SplashScreen(props) {
	useEffect(() => {
		setTimeout(function(){ 
			props.navigation.navigate('MainScreenWithBottomNav');
		}, 3000);
	}, []);
		
	return (
		<View>
			<Image
			source={Images.SplashScreen}
			style={ styles.wrapContainer }
			/>
		</View>
	);
}
export default withNavigation(SplashScreen);