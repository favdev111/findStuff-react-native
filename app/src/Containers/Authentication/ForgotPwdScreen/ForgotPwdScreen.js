import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import Styles from './ForgotPwdScreenStyle'
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput'
import CustomPwdInput from 'src/Components/CustomForm/CustomPwdInput/CustomPwdInput'
import FormCommonBtn from 'src/Components/Buttons/FormCommonBtn/FormCommonBtn'
import CustomVerifyInput from 'src/Components/CustomForm/CustomVerifyInput/CustomVerifyInput'
import {Images} from 'src/Theme'

export default class ForgotPwdScreen extends React.Component {

   render() {
      return (
            <View style={{flex: 1 }}>
               <View style={Styles.SignUpHeader}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signin')} style={{flex: 1}}>
                     <Image source={Images.whiteLeftChevron} style={Styles.SignUpHeaderImg} />
                  </TouchableOpacity>
                  <Text style={{fontSize: 25, color: '#fff', flex: 1}}>
                     找回密码
                  </Text>
                  <Text style={{flex: 1}}></Text>
               </View>
               <View style={Styles.SignFormContainer}>
                  <View style={Styles.SignPhoneInput}>
                     <CustomTextInput CustomLabel={'手机'} CustomPlaceholder={'请输入密码'}/>
                  </View>
                  <View style={Styles.SignVerifyInput}>
                     <CustomVerifyInput CustomVerifyLabel={'验证码'} CustomPlaceholder={'请输入验证码'} />
                  </View>
                  <View style={Styles.SignPwdInput}>
                     <CustomPwdInput CustomPwdLabel={'密码'} CustomPwdPlaceholder={'请输入密码'} />
                  </View>
                  <View style={Styles.SignBtn}>
                     <FormCommonBtn CustomBtnTitle={'完成'} />
                  </View>
               </View>
            </View>
      )
   }
}