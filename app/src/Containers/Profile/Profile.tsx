import React from 'react';
import {View, Text, ImageBackground, Image, ScrollView} from 'react-native';
import {Images} from 'src/Theme';
import Style from './ProfileStyle';
export default function Profile(props) {
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
            <Image
              source={Images.femaleProfile}
              style={Style.ProfileHeaderAvatarImg}
            />
            <Text style={Style.ProfileHeaderAvatarText}>气候品牌亮相</Text>
            {/* <Image source={Images.} style={Style.ProfileHeaderAvatarBadge} /> */}
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </ImageBackground>
      <View style={Style.ProfileBtnGroupContainer}>
        <View style={Style.ProfileBtnGroupWrap}>
          <View style={Style.ProfileBtnPublishedContainer}>
            <Image
              source={Images.ProfileBtnPublished}
              style={Style.ProfileBtnPublishedImg}
            />
            <Text>已发布</Text>
          </View>
          <View style={Style.ProfileLikeContainer}>
            <Image
              source={Images.ProfileBtnLike}
              style={Style.ProfileBtnLikeImg}
            />
            <Text>赞过</Text>
          </View>
        </View>
      </View>
      <View style={Style.ProfileFunctionContainer}>
        <View style={Style.ProfileUpdateContainer}>
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
        </View>
        <View style={Style.ProfileContactUsContainer}>
          <View style={Style.ProfileContactUsWrap}>
            <View style={Style.ProfileContactUsLeft}>
              <Image
                source={Images.ProfileContactus}
                style={Style.ProfileContactUsImg}
              />
              <Text>联系我们</Text>
            </View>
            <View>
              <Image
                source={Images.RightArrow}
                style={Style.ProfileRightArrow}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={Style.BottomContainer}>
        <View style={Style.BottomBtnWrap}>
          <Text style={Style.BottomBtnText}>安全退出</Text>
        </View>
      </View>
    </ScrollView>
  );
}
