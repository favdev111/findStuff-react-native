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
import Styles from './AttentionStyle';
import AttentionTab from 'src/Containers/Profile/Attention/AttentionTab/AttentionTab';

export default class Attention extends React.Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: '#f4f6f8'}}>
        <View>
          <View style={Styles.FindStuffHeaderContainer}>
            <TouchableOpacity style={{flex: 1}}>
              <Image
                source={Images.whiteLeftChevron}
                style={Styles.FindStuffHeaderImg}
              />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: '#fff'}}>关注</Text>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <View>
            <AttentionTab />
          </View>
        </View>
      </ScrollView>
    );
  }
}
