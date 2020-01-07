import React from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import {Images} from 'src/Theme'
import Styles from './CategoryListStyle'

 

export default class CategoryList extends React.Component {
	 
	render() {
		return (
			<View style={Styles.CategoryListContainer}>
            <View style={Styles.CategoryListHeader}>
               <Text>分类</Text>
            </View>
            <View style={Styles.CategoryListWrap}>
               
            </View>
         </View>
		);
	}
}
