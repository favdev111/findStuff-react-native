import React from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native'
import {Images, Colors} from 'src/Theme'
import Styles from './CategoryDetailStyle'

export default class Published extends React.Component {

	render() {
		return (
         <>
            <ScrollView style={{backgroundColor: '#f4f6f8'}}>
               <View style={Styles.CategoryListContainer}>
                  <View style={Styles.FindStuffHeaderContainer}>
                     <TouchableOpacity >
                        <Image source={Images.whiteLeftChevron} style={Styles.FindStuffHeaderImg} />
                     </TouchableOpacity>
                     <View style={{ alignItems: 'center'}}>
                        <Text style={{fontSize: 20, color: '#fff'}}>
                           详情
                        </Text>
                     </View>
                     <View></View>
                  </View>
                  <View style={Styles.UserInfoContainer}>
                     <View style={Styles.AvatarContainer}>
                        <View style={Styles.AvatarPhotoContainer}>
                           <Image source={Images.maleProfile} style={Styles.AvatarPhoto} />
                           <View style={Styles.UserNameContainer}>
                              <View style={Styles.UserNameWrap}>
                                 <View style={Styles.UserNameTextContainer}>
                                    <Text>abc123</Text>
                                 </View>
                                 <View style={Styles.UserNameBtnContainer}>
                                    <View style={Styles.UserNameBtn}>
                                       <Text style={{color: '#fff', fontSize: 12}}>LV2</Text>
                                    </View>
                                 </View>
                              </View>
                              <View style={Styles.UserDateContainer}>
                                 <Text style={{color: Colors.grey}}>
                                    19-4-25 19:42
                                 </Text>
                              </View>
                           </View>
                        </View>                     
                        <View style={Styles.PickBtnContainer}>
                           <View style={Styles.PickBtn}>
                              <Text style={{color: '#fff'}}>拾</Text>
                           </View>
                        </View>
                     </View>
                     <View style={Styles.UserLocationContainer}>
                        <View style={Styles.UserLocaionWrap}>
                           <Image source={Images.BlueMapIcon} style={Styles.UserLocationImg} />
                           <Text style={{color: Colors.grey}}>请输入关键词进行搜索</Text>
                        </View>
                        <View style={Styles.ContactBtnContainer}>
                           <View style={Styles.ContactBtn}>
                              <Text style={{color: '#fff'}}>联系TA</Text>
                           </View>
                        </View>
                     </View>
                  </View>
                  <View style={Styles.StuffInfoContainer}>
                     <View style={Styles.StuffDescriptionContainer}>
                        <Text style={{color: Colors.grey}}>请输入关键词进行搜索请输入关键词进行搜索请输入关键词进行搜索请输入关键词进行搜索请输入关键词进行搜索请输入关键词进行搜索</Text>
                     </View>
                     <View style={Styles.StuffImgContainer}>
                        <Image source={require('src/Images/Sample/Sample2.jpg')} style={Styles.StuffImg} />
                        <Image source={require('src/Images/Sample/Sample2.jpg')} style={Styles.StuffImg} />
                     </View>
                     <View style={Styles.StuffReportContainer}>
                        <View style={Styles.StuffReportWrap}>
                           <Text style={{color: Colors.grey}}>举报</Text>
                        </View>
                        <View style={Styles.StuffViewedContainer}>
                           <Text style={{color: Colors.grey}}>浏览105次</Text>
                        </View>
                     </View>
                  </View>            
                  <View style={Styles.CommentContainer}>
                     <View style={Styles.CountCommentContainer}>
                        <Text style={{fontSize: 16}}>共5条评论</Text>
                     </View>
                     <View style={Styles.CommentAvatarContainer}>
                        <View style={Styles.AvatarContainer}>
                           <Image source={Images.maleProfile} style={Styles.AvatarImg} />
                        </View>
                        <View style={Styles.CommentUserNameContainer}>
                           <Text>abc123</Text>
                           <Text style={{color: Colors.grey}}>2019年4月25日</Text>
                        </View>
                     </View>
                     <View style={Styles.CommentDescriptionContainer}>
                        <View style={{width: '80%'}}>
                           <View style={Styles.UserDescriptionContainer}>
                              <Text>请输入关键词进行搜索 请输入关键词进行搜索请输入关 键词进行搜索请输入关键词进行搜索</Text>
                           </View>
                           <View style={Styles.OtherDescriptionContainer}>
                              <Text>请输入关键词进行搜索 请输入关键词进行搜索请输入关 键词进行搜索请输入关键词进行搜索</Text>
                           </View>
                           <View style={Styles.CommentReplyContainer}>
                              <Text style={{color: Colors.grey}}>4-19</Text>
                              <Text style={{marginLeft: 5,color: Colors.grey}}>回复</Text>
                           </View>
                        </View>
                        
                     </View>
                  </View>
               </View>
            </ScrollView>
            <View style={Styles.CommentInputContainer}>
               <View style={Styles.CommentInputWrap}>
                  <View style={Styles.InputImgContainer}>
                     <Image source={Images.TextEdit} style={Styles.InputImg} />
                  </View>
                  <View style={Styles.InputContainer}>
                     <TextInput placeholder={'说点什么...'} />
                  </View>
               </View>
               <TouchableOpacity style={Styles.LikeCommentContainer}>
                  <Image source={Images.RedLike} style={Styles.LikeCommentImg} />
                  <Text>93</Text>
               </TouchableOpacity>
            </View>
         </>
		);
	}
}
