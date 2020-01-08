import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, Text} from 'react-native';
import Styles from './CustomPwdInputStyle'
import {Images} from 'src/Theme'

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
               <Text>{this.props.CustomPwdLabel}</Text>
               <TextInput 
                  secureTextEntry={this.state.hidePassword} 
                  style={Styles.textBox} 
                  placeholder={this.props.CustomPwdPlaceholder}
               />
               <TouchableOpacity activeOpacity={0.8} style={Styles.touachableButton} onPress={this.setPasswordVisibility}>
                  <Image source={(this.state.hidePassword) ? Images.HideIcon : Images.ShowIcon} style={Styles.buttonImage} />
               </TouchableOpacity>
            </View>
         </View>
      )
    }
  }
