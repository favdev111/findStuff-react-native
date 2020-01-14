import * as React from 'react'
import { View, ScrollView, StyleSheet, Dimensions, Image, Text } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import NotificationCard from 'src/Components/Card/NotificationCard/NotificationCard'
import Styles from './NotificationTabStyle'
import {Images, Colors} from 'src/Theme'
 
const FirstRoute = () => (
	<ScrollView style={[styles.scene, { backgroundColor: '#ffffff' }]}>
		<NotificationCard></NotificationCard>
		<NotificationCard></NotificationCard>
		<NotificationCard></NotificationCard>
		<NotificationCard></NotificationCard>
		<NotificationCard></NotificationCard>
		<NotificationCard></NotificationCard>
		<NotificationCard></NotificationCard>
	</ScrollView>
);
 
const SecondRoute = () => (
	<ScrollView style={[styles.scene, { backgroundColor: '#f4f6f8' }]}>
		<View style={Styles.NewsContainer}>
			<View style={Styles.RaisedContainer}>
				<View style={Styles.RaisedWrap}>
					<View style={Styles.RaiseLeftContainer}>
						<Image source={Images.Raised} style={{width: 40, height: 40, marginRight: 5}} />
						<Text>获赞</Text>
					</View>
					<View style={Styles.RaisedRigthContainer}>
						<Text style={{color: Colors.MainYellow}}>999</Text>
					</View>
				</View>
			</View>
			<View style={Styles.SystemContainer}>
				<View style={Styles.SystemWrap}>
					<Image source={Images.Admin} style={{width: 40, height: 40, borderRadius: 20, marginRight: 5}} />
					<Text>系统消息</Text>
				</View>
			</View>
		</View>
		<View style={Styles.NewsListContainer}>
			<View style={Styles.NewsListHeader}>
				<Text style={{fontSize: 18}}>--评论--</Text>
			</View>
			<NotificationCard></NotificationCard>
			<NotificationCard></NotificationCard>
			<NotificationCard></NotificationCard>
			<NotificationCard></NotificationCard>
			<NotificationCard></NotificationCard>
			<NotificationCard></NotificationCard>
			<NotificationCard></NotificationCard>
		</View>
	</ScrollView>
);
 
export default class NotificationTab extends React.Component {
	state = {
		index: 0,
		routes: [
			{ key: 'first', title: '关注' },
			{ key: 'second', title: '消息' },
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
				
				renderTabBar={props =>
					<TabBar
						{...props}
						indicatorStyle={{ backgroundColor: '#1071c8'}}
						style={{ backgroundColor: 'white', elevation: 0,}}
						labelStyle={{color:'black'}}
					/>
				 }
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