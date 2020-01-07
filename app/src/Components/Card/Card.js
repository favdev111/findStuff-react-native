import React from 'react'
import {Image, View, Text} from 'react-native'
import {Images} from 'src/Theme'
import Style from './CardStyle'
import CatBtn from 'src/Components/Buttons/CatBtn/CatBtn'
import PriceBtn from 'src/Components/Buttons/PriceBtn/PriceBtn'


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
                  <Text>3天前</Text>
               </View>
               <View style={Style.CardBtnGroup}>
                  <View style={{flexDirection: "column"}}>
                     <View style={Style.CardCatBtnWrap}>
                        <CatBtn></CatBtn>
                     </View>
                     <View style={{marginTop: 5}}>
                        <PriceBtn style={Style.CardPriceBtn}></PriceBtn>
                     </View>
                  </View>
               </View>
            </View>
            <View style={Style.CardDescription}>
               <Text numberOfLines = { 2 }>
                  是否有人认真分析过CPEC项目和气候危机问题？巴基斯坦媒体上的许多文章对CPEC的环境影响提出了疑问，但是似乎没有人试着给出一个明确的答案。人们用强有力的国家话语，比如“颠覆性的工业化”和“经济发展”来解释CPEC给巴基斯坦带来的种种益处，却掩盖了明显而真实的答案。
               </Text>
            </View>
            <View style={Style.CardImageSection}>
               <Image style={Style.CardImage} source={require('src/Images/Sample/Sample1.jpg')} />
               <Image style={Style.CardImage} source={require('src/Images/Sample/Sample2.jpg')} />
               <Image style={Style.CardImage} source={require('src/Images/Sample/Sample3.jpg')} />
            </View>
            <View style={Style.CardLocation}>
               <Image style={Style.CardLocationImg} source={Images.MapPin} />
               <Text>巴基斯坦媒体上的许多文</Text>
            </View>
			</View>
		)
	}
}