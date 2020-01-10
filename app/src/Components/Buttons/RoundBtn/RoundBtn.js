import React from 'react'
import {Image, View, Text} from 'react-native'
import Style from './RoundBtnStyle'
import {Colors} from 'src/Theme'


export default class RoundBtn extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
		ImgColor: this.props.RoundBtnColor,
	  }
	}

	render() {
		return (
			<View style={[Style.RoundBtnWrap, {backgroundColor: Colors[this.props.RoundBtnColor]}]}>
            <Text style={Style.RoundBtnText}>{this.props.RoundBtnTitle}</Text>
         </View>
		)
	}
}