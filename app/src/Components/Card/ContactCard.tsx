import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Images} from 'src/Theme';
import Style from './CardStyle';
import RoundBtn from 'src/Components/Buttons/RoundBtn/RoundBtn';

import moment from 'moment';
import {baseUrl} from 'src/constants';

export default function ContactCard({item, idx}) {
  return (
    <View style={Style.CardDesAndImgContainer}>
      <View style={Style.CardDescription}>
        <Text numberOfLines={1} style={Style.CardDescriptionText}>
          {idx + 1}
        </Text>
      </View>
      <View style={Style.CardDescription}>
        <Text numberOfLines={3} style={Style.CardDescriptionText}>
          {item.city}
        </Text>
      </View>
      <View style={Style.CardDescription}>
        <Text numberOfLines={3} style={Style.CardDescriptionText}>
          {item.district}
        </Text>
      </View>
      <View style={Style.CardDescription}>
        <Text numberOfLines={3} style={Style.CardDescriptionText}>
          {item.number}
        </Text>
      </View>
    </View>
  );
}
