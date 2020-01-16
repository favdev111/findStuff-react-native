import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Styles from './LostStuffScreenStyle';
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput';
import CustomFormSelect from 'src/Components/CustomForm/CustomFormSelect/CustomFormSelect';
import {Colors, Images} from 'src/Theme';

import ChinaRegionWheelPicker from 'src/Lib/rn-wheel-picker-china-region';

export default function FindStuffScreen(props) {
  const [region, setRegion] = useState('');

  return (
    <ScrollView style={Styles.FindStuffScreenContainer}>
      <View style={Styles.FindStuffHeaderContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('MainScreenWithBottomNav')}
          style={{flex: 1}}>
          <Image
            source={Images.whiteLeftChevron}
            style={Styles.FindStuffHeaderImg}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 25, color: '#fff', flex: 1}}>详细情况</Text>
        <Text style={{flex: 1}}></Text>
      </View>
      <View style={Styles.StuffInfoContainer}>
        <CustomFormSelect
          CustomFormSelectLabel={'物品类型'}
          CustomFormSelectPlaceholder={'请选择类型'}
        />
        <View style={Styles.FindStuffAreaContainer}>
          <View style={Styles.FindStuffAreaLabelContainer}>
            <Text style={Styles.FindStuffAreaLabel}>选择地点</Text>
          </View>

          <ChinaRegionWheelPicker
            onSubmit={params =>
              setRegion(`${params.province},${params.city},${params.area}`)
            }
            onCancel={() => console.log('cancel')}>
            <Text
              style={{
                backgroundColor: '#FFF',
                width: 200,
                paddingVertical: 20,
                textAlign: 'center',
                color: 'black',
              }}>
              {region || '点击去选择地区'}
            </Text>
          </ChinaRegionWheelPicker>
        </View>

        <View style={Styles.FindStuffDetailAreaContainer}>
          <View style={Styles.FindStuffDetailAreaTextContainer}>
            <Text style={Styles.FindStuffDetailAreaText}>详细地址</Text>
          </View>
          <View style={Styles.FindStuffDetailAreaInputContainer}>
            <TextInput style={Styles.FindStuffDetailAreaInput} />
          </View>
          <TouchableOpacity style={Styles.FindStuffDetailAreaBtnContainer}>
            <Text style={Styles.FindStuffDetailAreaBtn}>定位</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.FindStuffPriceBtnContainer}>
        <Text style={Styles.FindStuffPriceLabel}>悬赏金额</Text>
        <TextInput style={Styles.FindStuffPriceInput} />
        <Text style={Styles.FindStuffPriceText}>元</Text>
      </View>
      <View style={Styles.FindStuffFooter}>
        <View style={Styles.FindStuffDescription}>
          <Text style={Styles.FindStuffDescription}>物品描述</Text>
          <TextInput
            style={Styles.FindStuffTextArea}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View style={Styles.FindStuffImgUploadContainer}>
          <TouchableOpacity style={Styles.FindStuffImgUploadWrap}>
            <Image source={Images.Camera} style={Styles.FindStuffImgUpload} />
            <Text style={{color: Colors.grey}}>添加图片</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.FindStuffImgGroupContainer}>
          <Image
            source={require('src/Images/Sample/Sample2.jpg')}
            style={{width: 70, height: 70}}
          />
          <Image
            source={require('src/Images/Sample/Sample2.jpg')}
            style={{width: 70, height: 70}}
          />
          <Image
            source={require('src/Images/Sample/Sample2.jpg')}
            style={{width: 70, height: 70}}
          />
        </View>
      </View>
      <View style={Styles.FindStuffSubBtnContainer}>
        <TouchableOpacity style={Styles.FindStuffSubBtn}>
          <Text style={Styles.FindStuffSubBtnText}>确认发布</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
