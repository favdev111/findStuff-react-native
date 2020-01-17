import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {Images, Colors} from 'src/Theme';
import Styles from './CategoryDetailStyle';

import moment from 'moment';
import {baseUrl} from 'src/constants';

const axios = require('axios');

export default function FoundCategoryDetail({navigation}) {
  const [item, setItem] = useState(navigation.getParam('item'));
  useEffect(() => {
    axios
      .post(baseUrl + 'api/foundpost/' + item._id)
      .then(function(response) {
        if (response.data.item) {
          setItem(response.data.item);
        }
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, []);

  return (
    <>
      <ScrollView style={{backgroundColor: '#f4f6f8'}}>
        <View>
          <View style={Styles.FindStuffHeaderContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FoundCategoryView')}>
              <Image
                source={Images.whiteLeftChevron}
                style={Styles.FindStuffHeaderImg}
              />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#fff'}}>详情</Text>
            </View>
            <View></View>
          </View>
          <View style={Styles.UserInfoContainer}>
            <View style={Styles.AvatarContainer}>
              <View style={Styles.AvatarPhotoContainer}>
                <Image source={Images.maleProfile} style={Styles.AvatarPhoto} />
                <View style={Styles.UserNameContainer}>
                  <View style={Styles.UserNameWrap}>
                    <View>
                      <Text>abc123</Text>
                    </View>
                    <View>
                      <View style={Styles.UserNameBtn}>
                        <Text style={{color: '#fff', fontSize: 12}}>LV2</Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={{color: Colors.grey}}>
                      {moment(item.createAt).format('M月D日 ')}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={Styles.PickBtn}>
                  <Text style={{color: '#fff'}}>拾</Text>
                </View>
              </View>
            </View>
            <View style={Styles.UserLocationContainer}>
              <View style={Styles.UserLocaionWrap}>
                <Image
                  source={Images.BlueMapIcon}
                  style={Styles.UserLocationImg}
                />
                <Text style={{color: Colors.grey}}>{item.place}</Text>
              </View>
              <View>
                <View style={Styles.ContactBtn}>
                  <Text style={{color: '#fff'}}>联系TA</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={Styles.StuffInfoContainer}>
            <View>
              <Text style={{color: Colors.grey}}>{item.description}</Text>
            </View>
            <View style={Styles.StuffImgContainer}>
              {item.photos.map((photo, i) => (
                <Image
                  key={i}
                  source={{
                    uri: baseUrl + 'download/photo?path=' + photo.path,
                  }}
                  style={Styles.StuffImg}
                />
              ))}
            </View>
            <View style={Styles.StuffReportContainer}>
              <View>
                <Text style={{color: Colors.grey}}>举报</Text>
              </View>
              <View>
                <Text style={{color: Colors.grey}}>浏览{item.browse}次</Text>
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
          <Image source={Images.RedLike} />
          <Text>93</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
