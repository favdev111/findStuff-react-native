import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image,} from 'react-native';
import Styles from './CustomFormSelectStyle'
import RNPickerSelect from 'react-native-picker-select'
import {Images, Colors} from 'src/Theme'

export default class CustomFormSelect extends React.Component {

   render() {
      const placeholder = {
         label: this.props.CustomFormSelectPlaceholder,
         value: null,
         color: Colors.grey,
      }
      return (
         <View style={Styles.CustomFormSelectContainer}>
            <View style={Styles.CustomFormSelectTextContainer}>
               <Text style={Styles.CustomFormSelectText}>{this.props.CustomFormSelectLabel}</Text>
            </View>
            <View style={Styles.CustomFormSelectPickerContainer}>
               <RNPickerSelect
                  placeholder={placeholder}
                  onValueChange={(value) => console.log(value)}
                  items={[
                     { label: 'Football', value: 'football' },
                     { label: 'Baseball', value: 'baseball' },
                     { label: 'Hockey', value: 'hockey' },
                  ]}
               />
            </View>
         </View>
      )
   }
}