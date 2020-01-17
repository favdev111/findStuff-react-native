import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Styles from './SignInScreenStyle';
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput';
import CustomPwdInput from 'src/Components/CustomForm/CustomPwdInput/CustomPwdInput';
import FormCommonBtn from 'src/Components/Buttons/FormCommonBtn/FormCommonBtn';

export default function SignInScreen(props) {
  return (
    <View style={{flex: 1}}>
      <View style={Styles.SignInHeader}>
        <Text style={{fontSize: 25}}>欢迎使用</Text>
      </View>
      <View style={Styles.SignFormContainer}>
        <View style={Styles.SignPhoneInput}>
          <CustomTextInput
            CustomLabel={'手机'}
            CustomPlaceholder={'请输入手机号码'}
          />
        </View>
        <View style={Styles.SignPwdInput}>
          <CustomPwdInput
            CustomPwdLabel={'密码'}
            CustomPwdPlaceholder={'请输入密码'}
          />
        </View>
        <View style={Styles.SignOtherFunc}>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text>新用户注册 &nbsp;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ForgotPwdScreen')}>
            <Text> | &nbsp; 找回密码</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.SignBtn}>
          <FormCommonBtn CustomBtnTitle={'登录'} />
        </View>
      </View>
    </View>
  );
}
