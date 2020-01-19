import React, {useState, useEffect} from 'react';
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	Image,
   TextInput,
   FlatList,
} from 'react-native';
import Styles from './NewsDetailStyle';
import {Images, Colors} from 'src/Theme';
const axios = require('axios');

export default function NewsDetail(props) {
	return (
		<ScrollView style={Styles.GetStuffScreenContainer}>
			<View style={Styles.FindStuffHeaderContainer}>
            <TouchableOpacity
            onPress={() => props.navigation.navigate('MainScreenWithBottomNav')}
            style={{flex: 1}}>
            <Image
               source={Images.whiteLeftChevron}
               style={Styles.FindStuffHeaderImg}
            />
            </TouchableOpacity>
				<Text style={{fontSize: 25, color: '#fff'}}>News Detail</Text>
            <Text style={{flex: 1}} />
			</View>
			<View style={Styles.MessageDetailContainer}>
            <View style={Styles.LastMessageContainer}>
               <View style={Styles.LastMessageDescription}>
                  <Text style={Styles.LastMessageDescriptionText}>ABC 123 sdafsdf sdfasfsadf sfsafasfasf asdfasfasdfasfasdfsfasfasfasfasfd</Text>
               </View>
            </View>
			</View>
         
		</ScrollView>
	)
}
