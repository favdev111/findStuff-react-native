import * as React from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Card from 'src/Components/Card/Card';

const FirstRoute = () => (
  <ScrollView style={[styles.scene, {backgroundColor: '#ffffff'}]}>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
  </ScrollView>
);

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);
const ThirdRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

export default class HomeCategoryTab extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'first', title: '最新'},
      {key: 'second', title: '热门'},
      {key: 'third', title: '精华'},
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute,
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: '#1071c8'}}
            style={{backgroundColor: 'white', elevation: 0}}
            labelStyle={{color: 'black'}}
          />
        )}
        onIndexChange={index => this.setState({index})}
        initialLayout={{width: Dimensions.get('window').width}}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
