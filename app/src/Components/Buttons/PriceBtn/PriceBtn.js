import React from 'react'
import {Image, View, Text} from 'react-native'
import Style from './PriceBtnStyle'


export default class PriceBtn extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {

	  }
	}

	render() {
		return (
			<View style={Style.PriceBtnWrap}>
            <Text style={Style.PriceBtnWrap}>4565</Text>
         </View>
		)
	}
}