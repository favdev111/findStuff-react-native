import React from 'react';
import {View, Text, ImageBackground, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Images} from 'src/Theme';
import Style from './UserInfoStyle';
export default class Profile extends React.Component {

	render(){
		return (
			<ScrollView style={Style.ProfileContainer}>
				<ImageBackground
					source={Images.ProfileBannerImg}
					style={Style.ProfileHeaderContainer}>
					<View style={Style.ProfileHeaderTitleContainer}>
                  <TouchableOpacity style={Style.HeaderChevronImg}>
                     <Image
                        source={Images.whiteLeftChevron}
                        style={Style.FindStuffHeaderImg}
                     />
                  </TouchableOpacity>
						<Text style={Style.ProfileHeaderTitleText}>个人资料</Text>
					</View>
					<View style={Style.ProfileHeaderAvatarContainer}>
						<View style={Style.ProfileHeaderAvatarWrap}>
								<Image
									source={Images.femaleProfile}
									style={Style.ProfileHeaderAvatarImg}
								/>
								<Text style={Style.ProfileHeaderAvatarText}>气候品牌亮相</Text>
						</View>
					</View>
				</ImageBackground>
				<View style={Style.ProfileFunctionContainer}>
					<TouchableOpacity style={Style.ProfileUpdateContainer}>
						<View style={Style.ProfileUpdateWrap}>
							<View style={Style.ProfileUpdateLeft}>
								<Image
									source={Images.BlueMapIcon}
									style={Style.ProfileUpdateImg}
								/>
								<Text>上安医大</Text>
							</View>
							
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={Style.ProfileContactUsContainer}>
						<View style={Style.ProfileContactUsWrap}>
							<View style={Style.ProfileContactUsLeft}>
								<Image
									source={Images.ProfileContactus}
									style={Style.ProfileContactUsImg}
								/>
								<Text>电话: 1557264643</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={Style.ProfileMessageContainer}>
						<View style={Style.ProfileMessageWrap}>
							<View style={Style.ProfileMessageLeft}>
								<Image
									source={Images.Message1}
									style={Style.ProfileMessageImg}
								/>
								<Text>私信</Text>
							</View>
							<View>
								<Image
									source={Images.RightArrow}
									style={Style.ProfileRightArrow}
								/>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
	
}
