import React from 'react'
import { View, ScrollView, StyleSheet, Text, Image} from 'react-native'
import {Images} from 'src/Theme'
import Styles from './CatListBtnStyle'

 

export default class CatListBtn extends React.Component {
	
	render() {
		const imgSrc = Images[this.props.imgSource]
		return (
			<View style={Styles.CatListBtnContainer}>
            <Image source={imgSrc} style={Styles.CatListBtnImg}/>
				<Text>{this.props.title}</Text>
         </View>
		);
	}
}
