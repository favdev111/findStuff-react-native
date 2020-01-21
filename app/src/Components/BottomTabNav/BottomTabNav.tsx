import React, {createRef, ReactElement} from 'react';
import {Image, Linking, Text, View} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  BottomTabBar,
} from 'react-navigation';
import AddInfoView from 'src/Containers/AddInfo/AddInfo';
import ProfileView from 'src/Containers/Profile/Profile';
import HomeView from 'src/Containers/Home';
import Style from './BottomTabNavStyle';
import ChatView from 'src/Containers/Chat/Chat';
import {Colors, Images} from 'src/Theme';

import StuffPostView from 'src/Containers/Category/CategoryList/StuffPostView';
import StuffPostDetail from 'src/Containers/Category/CategoryDetail/StuffPostDetail';

import NotificationView from 'src/Containers/Notification/NotificationList/NotificationList';
import NotificationDetail from 'src/Containers/Notification/NotificationDetail/NotificationDetail';

import NewsView from 'src/Containers/Category/CategoryList/NewsView';
import NewsDetail from 'src/Containers/Category/CategoryDetail/NewsDetail';

import ContactView from 'src/Containers/Category/CategoryList/ContactView';

const TabBarComponent = props => <BottomTabBar {...props} />;

const NotificationStackNavigator = createStackNavigator({
  NotificationView: {
    screen: NotificationView,
    navigationOptions: {
      header: null,
    },
  },
  NotificationDetail: {
    screen: NotificationDetail,
    navigationOptions: {
      header: null,
    },
  },
});

const AddInfoStackNavigator = createStackNavigator({
  AddInfoView: {
    screen: AddInfoView,
    navigationOptions: {
      header: null,
    },
  },
});

const ProfileStackNavigator = createStackNavigator({
  ProfileView: {
    screen: ProfileView,
    navigationOptions: {
      header: null,
    },
  },
});

const HomeStackNavigator = createStackNavigator({
  HomeView: {
    screen: HomeView,
    navigationOptions: {
      header: null,
    },
  },
  StuffPostView: {
    screen: StuffPostView,
    navigationOptions: {
      header: null,
    },
  },
  StuffPostDetail: {
    screen: StuffPostDetail,
    navigationOptions: {
      header: null,
    },
  },
  NewsView: {
    screen: NewsView,
    navigationOptions: {
      header: null,
    },
  },
  NewsDetail: {
    screen: NewsDetail,
    navigationOptions: {
      header: null,
    },
  },
  ContactView: {
    screen: ContactView,
    navigationOptions: {
      header: null,
    },
  },
});

const ChatStackNavigator = createStackNavigator({
  ChatView: {
    screen: ChatView,
    navigationOptions: {
      header: null,
    },
  },
});

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
    },
    Chat: {
      screen: ChatStackNavigator,
    },
    AddInfo: {
      screen: AddInfoStackNavigator,
    },
    Notification: {
      screen: NotificationStackNavigator,
    },
    Profile: {
      screen: ProfileStackNavigator,
    },
  },
  {
    tabBarComponent: (props: any): ReactElement => (
      <TabBarComponent {...props} style={Style.BottomNavTabContainer} />
    ),
    initialRouteName: 'Home',
    backBehavior: null,
    defaultNavigationOptions: ({navigation}: any): ReactElement => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state;
        if (routeName === 'Home') {
          return (
            <>
              <Image
                source={focused ? Images.BottomNavHome2 : Images.BottomNavHome}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </>
          );
        } else if (routeName === 'Profile') {
          return (
            <>
              <Image
                source={
                  focused ? Images.BottomNavProfile2 : Images.BottomNavProfile
                }
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </>
          );
        } else if (routeName === 'AddInfo') {
          return (
            <View style={Style.AddInfoContainer}>
              <Image
                source={Images.BottomNavAdd}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </View>
          );
        } else if (routeName === 'Chat') {
          return (
            <>
              <Image
                source={focused ? Images.BottomNavChat2 : Images.BottomNavChat}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </>
          );
        } else if (routeName === 'Notification') {
          return (
            <>
              <Image
                source={focused ? Images.BottomNavNews2 : Images.BottomNavNews}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </>
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.selected,
      style: Style.bottomBar,
      activeColor: Colors.selected,
      inactiveColor: Colors.inActive,
      //   inactiveBackgroundColor: 'red',
      //   activeBackgroundColor: 'yellow',
      showLabel: false,
      tabStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
      },
      bottomTabs: {
        titleDisplayMode: 'alwaysShow',
      },
    },
  },
);
export default class MainScreenWithBottomNav extends React.Component {
  public props: any;
  static router = BottomTabNavigator.router;

  render() {
    return <BottomTabNavigator navigation={this.props.navigation} />;
  }
}
