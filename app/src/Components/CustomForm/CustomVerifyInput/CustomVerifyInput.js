import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text} from 'react-native';
import Styles from './CustomVerifyInputStyle'

export default class CustomPwdInput extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hidePassword: true }
    }
  
    setPasswordVisibility = () => {
      this.setState({ hidePassword: !this.state.hidePassword });
    }

    render() {
      return (
         <View style={Styles.container}>
            <View style={Styles.textBoxContainer}>
               <Text>{this.props.CustomVerifyLabel}</Text>
               <TextInput 
                  secureTextEntry={this.state.hidePassword} 
                  style={Styles.textBox} 
                  placeholder={this.props.CustomPlaceholder}
               />
               <TouchableOpacity activeOpacity={0.8} style={Styles.touachableButton} onPress={this.setPasswordVisibility}>
                  <Text style={Styles.buttonImage}>| 获取验证码</Text>
               </TouchableOpacity>
            </View>
         </View>
      )
    }
  }
