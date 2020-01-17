import React from 'react'
import {Image, View, Text} from 'react-native'
import {Images} from 'src/Theme'
import Style from './VerticalCardStyle'

export default class VerticalCard extends React.Component {
	public state: any;

	constructor(props) {
	  super(props)
	  this.state = {
	  }
	}

	render() {
		return (
			<View style={Style.VerticalCardWrap}>
            <View style={Style.ImageContainer}>
               <Image source={require('src/Images/Sample/Sample2.jpg')} style={Style.ImageImg} />
            </View>
            <View style={Style.InfoContainer}>
               <View style={Style.DescriptionContainer}>
                  <Text style={Style.DescriptionText} numberOfLines = { 2 }>
                     是否有人认真分析过CPEC项目和气候危机问题？巴基斯坦媒体上的许多文章对CPEC的环境影响提出了疑问，但是似乎没有人试着给出一个明确的答案。
                  </Text>
               </View>
               <View style={Style.BadgeContainer}>
                  <Image source={Images.FindBtnBadge} style={Style.BadgeImg}/>
               </View>
               <View style={Style.AvatarContainer}>
                  <View style={Style.PhotoContainer}>
                     <Image source={Images.maleProfile} style={Style.PhotoImg} />
                  </View>
                  <View style={Style.nameContainer}>
                     <Text>abc123</Text>
                  </View>
                  <View style={Style.ChatContainer}>
                     <Image source={Images.Message1} style={Style.ChatImg} />
                     <Text>3</Text>
                  </View>
                  <View style={Style.LikeContainer}>
                     <Image source={Images.WhiteLike} style={Style.LikeImg} />
                     <Text>9</Text>
                  </View>
               </View>
            </View>
			</View>
		)
	}
}