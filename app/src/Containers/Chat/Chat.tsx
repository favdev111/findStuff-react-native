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
import Styles from './ChatStyle';
import {Images, Colors} from 'src/Theme';
const axios = require('axios');
const messageListJson = [
    {
        'userName' : 'abc123',
        'description': 'hello world',
        'messageDate': '22:00',
    },
    {
        'userName' : 'abc123',
        'description': 'hello world',
        'messageDate': '22:00',
    },
    {
        'userName' : 'abc123',
        'description': 'hello world',
        'messageDate': '22:00',
    }
]

export default function Chat(props) {
	return (
		<ScrollView style={Styles.GetStuffScreenContainer}>
			<View style={Styles.FindStuffHeaderContainer}>
				<Text style={{fontSize: 25, color: '#fff'}}>私信</Text>
			</View>
			<View style={Styles.MessageListContainer}>
                <FlatList
                horizontal={false}
                style={Styles.MessageFlatList}
                data={messageListJson}
                renderItem={({item}) => (
                    <TouchableOpacity style={Styles.MessageListWrap}
                    onPress={() => props.navigation.navigate('ChatDetail')}>
                        <View style={Styles.MessageListAvatarWrap}>
                            <View style={Styles.MessageListImgWrap}>
                                <Image source={Images.maleProfile} style={Styles.MessageListAvatar} />
                                <View style={Styles.AvatarBadgeContainer}>
                                    <Text style={{color: '#fff'}}>2</Text>
                                </View>
                            </View>
                            <View style={Styles.MessageListTextContainer}>
                                <Text>{item.userName}</Text>
                                <Text style={{color: Colors.grey}}>{item.description}</Text>
                            </View>
                        </View>
                        <Text style={{color: Colors.grey}}>{item.messageDate}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
			</View>
		</ScrollView>
	)
}
