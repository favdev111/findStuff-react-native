import * as React from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import Card from 'src/Components/Card/Card'
 
const FirstRoute = () => (
	<ScrollView style={[styles.scene, { backgroundColor: '#ffffff' }]}>
		<Card></Card>
		<Card></Card>
		<Card></Card>
		<Card></Card>
		<Card></Card>
	</ScrollView>
);
 
const SecondRoute = () => (
  	<View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
 
export default class CategoryAll extends React.Component {
	state = {
		index: 0,
		routes: [
			{ key: 'first', title: '寻物启事' },
			{ key: 'second', title: '招领启事' },
		],
	};
 
	render() {
		return (
			<TabView
				navigationState={this.state}
				renderScene={SceneMap({
					first: FirstRoute,
					second: SecondRoute,
				})}
				onIndexChange={index => this.setState({ index })}
				initialLayout={{ width: Dimensions.get('window').width }}
			/>
		);
	}
}
 
const styles = StyleSheet.create({
	scene: {
		flex: 1,
	},
});