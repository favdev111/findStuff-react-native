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
import Styles from './ChatDetailStyle';
import {Images, Colors} from 'src/Theme';
const axios = require('axios');

export default function ChatDetail(props) {
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
				<Text style={{fontSize: 25, color: '#fff'}}>User Name</Text>
            <Text style={{flex: 1}} />
			</View>
			<View style={Styles.MessageDetailContainer}>
            <View style={Styles.LastMessageContainer}>
               <View style={Styles.AvatarContainer}>
                  <Image style={Styles.AvartarImg} source={Images.maleProfile}/>
                  <View style={Styles.AvatarDesContainer}>
                     <View style={Styles.nickNameContainer}>
                        <Text style={Styles.CommonText}>user name</Text>
                     </View>
                     <View style={Styles.nickNameContainer}>
                        <Text style={Styles.CommonText}>time</Text>
                     </View>
                  </View>
               </View>
               
               <View style={Styles.LastMessageDescription}>
                  <Text style={Styles.LastMessageDescriptionText}>ABC 123 sdafsdf sdfasfsadf sfsafasfasf asdfasfasdfasfasdfsfasfasfasfasfd</Text>
               </View>
            </View>
            
            <View style={Styles.NewMessageContainer}>
               <View style={Styles.newMessageTextContainer}>
                  <TextInput
                     style={Styles.newMesssageText}
                     underlineColorAndroid="transparent"
                     placeholder="Type something"
                     placeholderTextColor="grey"
                     numberOfLines={5}
                  />
               </View>
            </View>
            <View style={Styles.replyBtnContainer}>
               <TouchableOpacity style={Styles.replyBtnWrap}>
                  <Text style={{color: '#fff', fontSize: 18}}>Reply Button</Text>
               </TouchableOpacity>
            </View>
			</View>
         
		</ScrollView>
	)
}
