import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Picker } from 'react-native';
import Styles from './FindStuffScreenStyle'
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput'
import CustomFormSelect from 'src/Components/CustomForm/CustomFormSelect/CustomFormSelect'
import RNPickerSelect from 'react-native-picker-select'
import {Images} from 'src/Theme'

export default class FindStuffScreen extends React.Component {

   render() {
      return (
         <ScrollView style={Styles.FindStuffScreenContainer}>
            <View style={Styles.FindStuffHeaderContainer}>
               <TouchableOpacity onPress={()=>this.props.navigation.navigate('MainScreenWithBottomNav')} style={{flex: 1}}>
                  <Image source={Images.whiteLeftChevron} style={Styles.FindStuffHeaderImg} />
               </TouchableOpacity>
               <Text style={{fontSize: 25, color: '#fff', flex: 1}}>
                  详细情况
               </Text>
               <Text style={{flex: 1}}></Text>
            </View>
            <View style={Styles.StuffInfoContainer}>
               <CustomFormSelect
                  CustomFormSelectLabel={'物品类型'}
                  CustomFormSelectPlaceholder={'请选择类型'}
               />
            </View>
         </ScrollView>
      )
   }
}