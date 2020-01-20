import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Styles from './SignInScreenStyle';
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput';
import CustomPwdInput from 'src/Components/CustomForm/CustomPwdInput/CustomPwdInput';
import FormCommonBtn from 'src/Components/Buttons/FormCommonBtn/FormCommonBtn';

import {store} from 'src/Store';

import Toast from 'react-native-simple-toast';
import {baseUrl} from 'src/constants';
const axios = require('axios');

export default function SignInScreen(props) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [state, dispatch] = useContext(store);

  const handleSubmit = async () => {
    if (phone === '' || password === '') {
      Toast.show('正确输入值！');
      return;
    }

    axios
      .post(baseUrl + 'auth/signin', {
        phone,
        password,
      })
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: 'setState',
            payload: {
              auth_token: response.headers.auth_token,
              user: response.data.user,
            },
          });
          Toast.show('Success!');
          props.navigation.navigate('MainScreenWithBottomNav');
        } else {
          Toast.show(response.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

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
            proc={value => setPhone(value)}
          />
        </View>
        <View style={Styles.SignPwdInput}>
          <CustomPwdInput
            CustomPwdLabel={'密码'}
            CustomPwdPlaceholder={'请输入密码'}
            proc={value => setPassword(value)}
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
          <FormCommonBtn CustomBtnTitle={'登录'} proc={handleSubmit} />
        </View>
      </View>
    </View>
  );
}
