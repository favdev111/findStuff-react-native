import React from 'react'
import {Image, View, Text} from 'react-native'
import {Images} from 'src/Theme'
import Style from './CardStyle'
import RoundBtn from 'src/Components/Buttons/RoundBtn/RoundBtn'


export default class Card extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {

	  }
	}

	render() {
		return (
			<View style={Style.CardWrap}>
            <View style={Style.CardInfoWrap}>
               <View style={Style.ImageSection}>
                  <Image style={Style.AvatarStyle} source={Images.maleProfile} />
               </View>
               <View style={Style.UserName}>
                  <Text>分析过</Text>
                  <Text style={Style.Userdate}>3天前</Text>
               </View>
               <View style={Style.CardBtnGroup}>
                  <View style={Style.CardLeftBtnWrap}>
                     <Image source={Images.FindBtnBadge} style={{width: 50, height: 15}}/>
                  </View>
                  <View style={Style.CardRightBtnWrap}>
                     <View style={Style.CardCatBtnWrap}>
                        <RoundBtn RoundBtnTitle={'赏 ¥ 100'} RoundBtnColor={'MainRed'} />
                        <RoundBtn RoundBtnTitle={'联系 TA'} RoundBtnColor={'MainYellow'}/>
                     </View>
                  </View>
               </View>
            </View>
            <View style={Style.CardDesAndImgContainer} >
               <View style={Style.CardDescription}>
                  <Text numberOfLines = { 3 } style={Style.CardDescriptionText}>
                     是否有人认真分析过CPEC项目和气候危机问题？巴基斯坦媒体上的许多文章对CPEC的环境影响提出了疑问，但是似乎没有人试着给出一个明确的答案。人们用强有力的国家话语，比如“颠覆性的工业化”和“经济发展”来解释CPEC给巴基斯坦带来的种种益处，却掩盖了明显而真实的答案。
                  </Text>
               </View>
               <View style={Style.CardImageSection}>
                  <Image style={Style.CardImage} source={require('src/Images/Sample/Sample2.jpg')} />
               </View>
            </View>
            <View style={Style.CardLocation}>
               <View style={Style.CardLocationGroup}>
                  <Image style={Style.CardLocationImg} source={Images.BlueMapIcon} />
                  <Text style={Style.CardLocationText}>巴基斯坦媒体上的许多文</Text>
               </View>
               <View style={Style.CardLocationChat}>
                  <Image source={Images.BottomNavChat} style={Style.CardLocationChatImg} />
                  <Text style={Style.CardLocationChatText}>0</Text>
               </View>
            </View>
			</View>
		)
	}
}