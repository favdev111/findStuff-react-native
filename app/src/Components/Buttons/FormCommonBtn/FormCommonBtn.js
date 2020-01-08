import React from 'react';
import { View, Button, Text, TouchableHighlight } from 'react-native';
import Styles from './FormCommonBtnStyle'

export default class FormCommonBtn extends React.Component {

    render() {
      return (
         <TouchableHighlight
            style={Styles.FormCommonBtn} >
               <Text style={Styles.FormCommonBtnText}>{this.props.CustomBtnTitle}</Text>
         </TouchableHighlight>
      )
    }
  }