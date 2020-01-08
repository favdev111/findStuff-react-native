import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Styles from './CustomTextInputStyle'

export default class CustomTextInput extends React.Component {

    render() {
      return (
          <View style={{flex: 1}}>
            <Text>{this.props.CustomLabel}</Text>
            <TextInput
               style={Styles.CustomTextInput}
               placeholder={this.props.CustomPlaceholder}
            />
          </View>
      )
    }
  }