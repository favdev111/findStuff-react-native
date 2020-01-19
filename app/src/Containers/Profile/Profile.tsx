import React from 'react';
import {View, Text, ImageBackground, Image, ScrollView, Alert} from 'react-native';
import {Images} from 'src/Theme';
import Style from './ProfileStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomModal from 'src/Components/CustomModal/CustomModal';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default class Profile extends React.Component {
	public setState: any;
	public props: any;
	public navigation: any;
  	state = {
		isModalVisible: false,
	};
	toggleModal = () => {
		this.setState({isModalVisible: true});
	};

	render(){
		return (
			<ScrollView style={Style.ProfileContainer}>
				<ImageBackground
					source={Images.ProfileBannerImg}
					style={Style.ProfileHeaderContainer}>
					<View style={Style.ProfileHeaderTitleContainer}>
						<Text style={Style.ProfileHeaderTitleText}>我的</Text>
					</View>
					<View style={Style.ProfileHeaderAvatarContainer}>
						<View style={Style.ProfileHeaderAvatarWrap}>
							<TouchableOpacity style={Style.HeaderImgContainer}>
								<Image
									source={Images.femaleProfile}
									style={Style.ProfileHeaderAvatarImg}
								/>
								<Image source={Images.Camera} style={Style.HeaderImgBadge} />
							</TouchableOpacity>
							<TouchableOpacity style={Style.HeaderTextContainer}>
								<Text style={Style.ProfileHeaderAvatarText}>气候品牌亮相</Text>
								<Text style={{color: Colors.grey, fontSize: 12}}>1566896555</Text>
							</TouchableOpacity>
							<Image source={Images.TextEdit} style={Style.HeaderTextBadge} />
						</View>
					</View>
				</ImageBackground>
				<View style={Style.ProfileBtnGroupContainer}>
					<View style={Style.ProfileBtnGroupWrap}>
						<TouchableOpacity style={Style.ProfileBtnPublishedContainer}
							onPress={() => {
							this.toggleModal();
							}}>
							<Image
								source={Images.ProfileBtnPublished}
								style={Style.ProfileBtnPublishedImg}
							/>
							<Text>服务</Text>
						</TouchableOpacity>
						<TouchableOpacity style={Style.ProfileLikeContainer}
							onPress={() => {
							this.toggleModal();
							}}>
							<Image
								source={Images.ProfileBtnLike}
								style={Style.ProfileBtnLikeImg}
							/>
							<Text>联系我们</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={Style.ProfileFunctionContainer}>
					<TouchableOpacity style={Style.ProfileUpdateContainer}
						onPress={() => {
						this.toggleModal();
						}}>
						<View style={Style.ProfileUpdateWrap}>
							<View style={Style.ProfileUpdateLeft}>
								<Image
									source={Images.ProfileUpdate}
									style={Style.ProfileUpdateImg}
								/>
								<Text>检查更新</Text>
							</View>
							<View>
								<Image
									source={Images.RightArrow}
									style={Style.ProfileRightArrow}
								/>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={Style.ProfileContactUsContainer}
						onPress={() => {
							this.toggleModal();
					}}>
						<View style={Style.ProfileContactUsWrap}>
							<View style={Style.ProfileContactUsLeft}>
								<Image
									source={Images.ProfileContactus}
									style={Style.ProfileContactUsImg}
								/>
								<Text>关于寻N</Text>
							</View>
							<View>
								<Image
									source={Images.RightArrow}
									style={Style.ProfileRightArrow}
								/>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={Style.ProfileIntroContainer}
						onPress={() => {
						this.toggleModal();
						}}>
						<View style={Style.ProfileContactUsWrap}>
							<View style={Style.ProfileContactUsLeft}>
								<Image
									source={Images.ProfileWithFriend}
									style={Style.ProfileContactUsImg}
								/>
								<Text>分享给朋友</Text>
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
				<TouchableOpacity style={Style.BottomContainer}
					onPress={() => {
					this.toggleModal();
					}}>
					<View style={Style.BottomBtnWrap}>
						<Text style={Style.BottomBtnText}>安全退出</Text>
					</View>
				</TouchableOpacity>
				<CustomModal isPropsModalVisible={this.state.isModalVisible}/>
			</ScrollView>
		);
	}
	
}
