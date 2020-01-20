import * as React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  SectionList,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Styles from './AttentionTabStyle';
import {Images, Colors} from 'src/Theme';

const FirstRoute = () => (
  <ScrollView>
    <View style={Styles.AttentionContainer}>
      <SectionList
        sections={[
          {title: 'A', data: ['Aevin', 'Aan', 'Aominic']},
          {
            title: 'B',
            data: [
              'Backson',
              'Bames',
              'Billian',
              'Bimmy',
              'Boel',
              'Bohn',
              'Bulie',
            ],
          },
          {
            title: 'C',
            data: [
              'Cackson',
              'Cames',
              'Cillian',
              'Cimmy',
              'Cel',
              'Cohn',
              'Culie',
            ],
          },
        ]}
        renderItem={({item}) => (
          <View style={Styles.AttentionListWrap}>
            <View style={Styles.AttentionListImgContainer}>
              <Image
                source={Images.maleProfile}
                style={{width: 35, height: 35}}
              />
              <View style={Styles.AttentionListTextContainer}>
                <Text>{item}</Text>
              </View>
            </View>
            <View>
              <Image
                source={Images.EachAttention}
                style={Styles.AttentionListBtn}
              />
            </View>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <Text style={Styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView>
    <View style={Styles.AttentionContainer}>
      <SectionList
        sections={[
          {title: 'A', data: ['Aevin', 'Aan', 'Aominic']},
          {
            title: 'B',
            data: [
              'Backson',
              'Bames',
              'Billian',
              'Bimmy',
              'Boel',
              'Bohn',
              'Bulie',
            ],
          },
          {
            title: 'C',
            data: [
              'Cackson',
              'Cames',
              'Cillian',
              'Cimmy',
              'Cel',
              'Cohn',
              'Culie',
            ],
          },
        ]}
        renderItem={({item}) => (
          <View style={Styles.AttentionListWrap}>
            <View style={Styles.AttentionListImgContainer}>
              <Image
                source={Images.maleProfile}
                style={{width: 35, height: 35}}
              />
              <View style={Styles.AttentionListTextContainer}>
                <Text>{item}</Text>
              </View>
            </View>
            <View>
              <Image
                source={Images.EachAttention}
                style={Styles.AttentionListBtn}
              />
            </View>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <Text style={Styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  </ScrollView>
);

export default class AttentionTab extends React.Component {
  public setState: any;
  state = {
    index: 0,
    routes: [
      {key: 'first', title: '我的关注'},
      {key: 'second', title: '关注我的'},
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
