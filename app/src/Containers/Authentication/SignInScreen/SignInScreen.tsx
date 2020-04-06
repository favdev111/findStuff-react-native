import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import Styles from './SignInScreenStyle';
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput';
import CustomPwdInput from 'src/Components/CustomForm/CustomPwdInput/CustomPwdInput';
import FormCommonBtn from 'src/Components/Buttons/FormCommonBtn/FormCommonBtn';
import AsyncStorage from '@react-native-community/async-storage';

import {store} from 'src/Store';

import Toast from 'react-native-simple-toast';
import {baseUrl} from 'src/config';
import axios from 'axios';
import io from 'socket.io-client';

// import Pushy from 'pushy-react-native';

export default function SignInScreen(props) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [state, dispatch] = useContext(store);

  const saveToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('saveToken Exception... ... ...', e);
    }
  };

  const handleSubmit = async () => {
    if (phone === '' || password === '') {
      Toast.show('正确输入值！');
      return;
    }

    await axios
      .post(baseUrl + 'auth/signin', {
        phone,
        password,
      })
      .then(async response => {
        if (response.data.success) {
          console.log('user info...', response.data.user);

          // Register the device for push notifications
          /*
          Pushy.register()
            .then(async deviceToken => {
              axios
                .post(baseUrl + 'auth/device', {
                  user_id: response.data.user._id,
                  device: deviceToken,
                })
                .then(response => {
                  console.log(response.data.user, 'user with device token');
                })
                .catch(error => {
                  console.log(error);
                });

              await fetch(baseUrl + 'api/auth/device?token=' + deviceToken);
            })
            .catch(err => {
              // Handle registration errors
              console.log('Device registration exception.......', err);
            });
          */
          const signInfo = {
            auth_token: response.headers.auth_token,
            user: response.data.user,
            rooms: response.data.rooms,
          };

          dispatch({
            type: 'setTokenUser',
            payload: signInfo,
          });

          dispatch({
            type: 'setSocket',
            payload: io(baseUrl, {
              query: {user_id: response.data.user._id},
              ransports: ['websocket'],
              jsonp: false,
            }),
          });

          await saveToken('signInfo', JSON.stringify(signInfo));

          Toast.show('成功!');
          props.navigation.navigate('AppHome');
        } else {
          Toast.show(response.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    props.navigation.setParams({from_screen: 'signin'});

    console.log(
      props.navigation.getParam('from_screen'),
      'just defined the from _screen params',
    );

    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   console.log('you clicked back button. go to the app home.');
    //   props.navigation.navigate('AppHome');
    //   return true;
    // });

    BackHandler.addEventListener('hardwareBackPress', signinHandleBackButton);
  }, []);

  const signinHandleBackButton = () => {               
    props.navigation.navigate(
          'AppHome',
          {
            onGoBack: () => console.log('Will go back from nextComponent'),
          }
          );
     return true;
   }

  useEffect(() => {
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', signinHandleBackButton);
      console.log('component will unmounted');
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={Styles.SignInHeader}>
        <Text style={{fontSize: 20}}>欢迎使用</Text>
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
