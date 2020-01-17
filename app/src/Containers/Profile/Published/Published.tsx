import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {Images, Colors} from 'src/Theme';
import Styles from './PublishedStyle';
import VerticalCard from 'src/Components/Card/VerticalCard/VerticalCard';

export default class Published extends React.Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: '#f4f6f8'}}>
        <View style={Styles.CategoryListContainer}>
          <View style={Styles.FindStuffHeaderContainer}>
            <TouchableOpacity>
              <Image
                source={Images.whiteLeftChevron}
                style={Styles.FindStuffHeaderImg}
              />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#fff'}}>已发布</Text>
            </View>
            <View style={Styles.HeaderRightImgContainer}>
              <Image source={Images.TextEdit} style={Styles.HeaderRightImg} />
            </View>
          </View>
          <View style={Styles.CategoryListWrap}>
            <View style={{flex: 1}}>
              <View style={Styles.VerticalCardWrap}>
                <VerticalCard></VerticalCard>
              </View>
              <View style={Styles.VerticalCardWrap}>
                <VerticalCard></VerticalCard>
              </View>
            </View>
            <View style={{flex: 1}}>
              <View style={Styles.VerticalCardWrap}>
                <VerticalCard></VerticalCard>
              </View>
              <View style={Styles.VerticalCardWrap}>
                <VerticalCard></VerticalCard>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
