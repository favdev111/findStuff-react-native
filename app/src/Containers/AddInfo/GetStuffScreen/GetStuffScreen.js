import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Styles from './GetStuffScreenStyle'
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput'
import CustomFormSelect from 'src/Components/CustomForm/CustomFormSelect/CustomFormSelect'
import Picker from 'react-native-picker'
import {Images} from 'src/Theme'
import { Colors } from 'src/Theme'


let data = [];
for(var i=0;i<100;i++){
    data.push(i);
}


export default class GetStuffScreen extends React.Component {
   constructor(props){
      super(props);
      this.state = {}
   }
   componentDidMount() {
      Picker.init({
         pickerData: data,
         selectedValue:Picker.init({
            pickerData: data,
            selectedValue: [9],
            onPickerConfirm: data => {
               console.log(data);
            },
            onPickerCancel: data => {
               console.log(data);
            },
            onPickerSelect: data => {
               console.log(data);
            }
         })
      })
   }

   pickerShow = () =>{
      Picker.show();
   }

   render() {
      return (
         <ScrollView style={Styles.GetStuffScreenContainer}>
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
               <View style={Styles.FindStuffAreaContainer}>
                  <View style={Styles.FindStuffAreaLabelContainer}>
                     <Text style={Styles.FindStuffAreaLabel}>选择地点</Text>
                  </View>
                  <TouchableOpacity onPress={()=>this.pickerShow()} style={Styles.FindStuffAreaTextWrap} >
                     <Text style={Styles.FindStuffAreaText}>选择地点</Text>
                     <Text style={Styles.FindStuffAreaText}>选择地点</Text>
                     <Text style={Styles.FindStuffAreaText}>选择地点</Text>
                  </TouchableOpacity>
               </View>
               <View style={Styles.FindStuffDetailAreaContainer}>
                  <View style={Styles.FindStuffDetailAreaTextContainer}>
                     <Text style={Styles.FindStuffDetailAreaText}>
                        详细地址
                     </Text>
                  </View>
                  <View style={Styles.FindStuffDetailAreaInputContainer}>
                     <TextInput style={Styles.FindStuffDetailAreaInput} />
                  </View>
                  <TouchableOpacity style={Styles.FindStuffDetailAreaBtnContainer}>
                     <Text style={Styles.FindStuffDetailAreaBtn}>
                        定位
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
            
            <View style={Styles.FindStuffFooter}>
               <View style={Styles.FindStuffDescription}>
                  <Text style={Styles.FindStuffDescription}>
                     物品描述
                  </Text>
                  <TextInput style={Styles.FindStuffTextArea} multiline = {true} numberOfLines = {4} />
               </View>
               <View style={Styles.FindStuffImgUploadContainer}>
                  <TouchableOpacity style={Styles.FindStuffImgUploadWrap}>
                     <Image source={Images.Camera} style={Styles.FindStuffImgUpload} />
                     <Text style={{color: Colors.grey}}>添加图片</Text>
                  </TouchableOpacity>
               </View>
               <View style={Styles.FindStuffImgGroupContainer}>
                  <Image source={require('src/Images/Sample/Sample2.jpg')} style={{width: 70, height: 70}} />
                  <Image source={require('src/Images/Sample/Sample2.jpg')} style={{width: 70, height: 70}} />
                  <Image source={require('src/Images/Sample/Sample2.jpg')} style={{width: 70, height: 70}} />
               </View>
            </View>
            <View style={Styles.FindStuffSubBtnContainer}>
               <TouchableOpacity style={Styles.FindStuffSubBtn}>
                  <Text style={Styles.FindStuffSubBtnText}>
                     确认发布
                  </Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      )
   }
}