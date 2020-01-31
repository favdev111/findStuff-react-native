import React, {createRef, ReactElement, useContext} from 'react';
import {Image, Linking, Text, View} from 'react-native';
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import AddInfoView from 'src/Containers/AddInfo/AddInfo';
import ProfileView from 'src/Containers/Profile/Profile';
import HomeView from 'src/Containers/Home';
import Style from './BottomTabNavStyle';
import ChatView from 'src/Containers/Chat/Chat';
import {store} from 'src/Store';
import {Colors, Images} from 'src/Theme';

import StuffPostView from 'src/Containers/Category/CategoryList/StuffPostView';
import StuffPostDetail from 'src/Containers/Category/CategoryDetail/StuffPostDetail';

import NotificationView from 'src/Containers/Notification/NotificationList/NotificationList';
import NotificationDetail from 'src/Containers/Notification/NotificationDetail/NotificationDetail';

import NewsView from 'src/Containers/Category/CategoryList/NewsView';
import NewsDetail from 'src/Containers/Category/CategoryDetail/NewsDetail';

import ContactView from 'src/Containers/Category/CategoryList/ContactView';

const TabBarComponent = props => <BottomTabBar {...props} />;

const NotificationStackNavigator = createStackNavigator(
  {
    NotificationView: {
      screen: NotificationView,
    },
    NotificationDetail: {
      screen: NotificationDetail,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const AddInfoStackNavigator = createStackNavigator(
  {
    AddInfoView: {
      screen: AddInfoView,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const HomeStackNavigator = createStackNavigator(
  {
    HomeView: {
      screen: HomeView,
    },
    StuffPostView: {
      screen: StuffPostView,
    },
    StuffPostDetail: {
      screen: StuffPostDetail,
    },
    NewsView: {
      screen: NewsView,
    },
    NewsDetail: {
      screen: NewsDetail,
    },
    ContactView: {
      screen: ContactView,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const ChatStackNavigator = createStackNavigator(
  {
    ChatView: {
      screen: ChatView,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    AppHome: {
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
      screen: ProfileView,
    },
  },
  {
    tabBarComponent: (props: any): ReactElement => (
      <TabBarComponent {...props} style={Style.BottomNavTabContainer} />
    ),
    initialRouteName: 'AppHome',
    backBehavior: null,
    defaultNavigationOptions: ({navigation}: any): ReactElement => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state;

        if (routeName === 'AppHome') {
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

const MainScreenWithBottomNav = props => {
  // const [state, dispatch] = useContext(store);

  return <BottomTabNavigator navigation={props.navigation} />;
};
MainScreenWithBottomNav.router = BottomTabNavigator.router;

export default MainScreenWithBottomNav;
