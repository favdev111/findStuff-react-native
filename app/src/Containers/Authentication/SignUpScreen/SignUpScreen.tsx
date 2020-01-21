import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Styles from './SignUpScreenStyle';
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput';
import CustomPwdInput from 'src/Components/CustomForm/CustomPwdInput/CustomPwdInput';
import FormCommonBtn from 'src/Components/Buttons/FormCommonBtn/FormCommonBtn';
import CustomVerifyInput from 'src/Components/CustomForm/CustomVerifyInput/CustomVerifyInput';
import {Images} from 'src/Theme';

import Toast from 'react-native-simple-toast';
import {baseUrl} from 'src/constants';
const axios = require('axios');

export default function SignUpScreen(props) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    if (otp === '' || phone === '' || password === '') {
      Toast.show('正确输入值！');
      return;
    }

    axios
      .post(baseUrl + 'auth/signup', {
        phone,
        password,
      })

      .then(function(response2) {
        if (response2.data) {
          Toast.show('成功!');
          props.navigation.navigate('Signin');
        } else {
          Toast.show('失败了!');
        }
      })
      .catch(function(error) {
        Toast.show(error);
      });
  }

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={Styles.SignUpHeader}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Signin')}
            style={{flex: 1}}>
            <Image
              source={Images.whiteLeftChevron}
              style={Styles.SignUpHeaderImg}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 20, color: '#fff', flex: 1}}>用户注册</Text>
          <Text style={{flex: 1}}></Text>
        </View>
        <View style={Styles.SignFormContainer}>
          <View style={Styles.SignPhoneInput}>
            <CustomTextInput
              CustomLabel={'手机'}
              CustomPlaceholder={'请输入手机号码'}
              proc={value => setPhone(value)}
            />
          </View>
          <View style={Styles.SignVerifyInput}>
            <CustomVerifyInput
              CustomVerifyLabel={'验证码'}
              CustomPlaceholder={'请输入验证码'}
              proc={value => {
                setOtp(value);
              }}
            />
          </View>
          <View style={Styles.SignPwdInput}>
            <CustomPwdInput
              CustomPwdLabel={'密码'}
              CustomPwdPlaceholder={'请输入密码'}
              proc={value => {
                setPassword(value);
              }}
            />
          </View>

          <View style={Styles.SignBtn}>
            <FormCommonBtn CustomBtnTitle={'注册'} proc={handleSubmit} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
