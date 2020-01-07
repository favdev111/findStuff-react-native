import React from 'react'
import {Image, View, Text} from 'react-native'
import Style from './CatBtnStyle'


export default class CatBtn extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {

	  }
	}

	render() {
		return (
			<View style={Style.CatBtnWrap}>
            <Text style={Style.CatBtnText}>数码产品</Text>
         </View>
		)
	}
}