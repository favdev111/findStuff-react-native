// import {PropTypes} from 'prop-types'
import React, {createRef} from 'react'
import {Image, Linking, Text, View} from 'react-native'
import {createBottomTabNavigator, createStackNavigator, BottomTabBar} from 'react-navigation'
import AddInfoView from 'src/Containers/AddInfo/AddInfo'
// import CategoryView from 'src/Containers/Category/CategoryList/CategoryList'
import ProfileView from 'src/Containers/Profile/Profile'
import HomeView from 'src/Containers/Home'
import Style from './BottomTabNavStyle'
import ChatView from 'src/Containers/Chat/Chat'
import NotificationView from 'src/Containers/Notification/NotificationList/NotificationList'
import {Colors, Images} from 'src/Theme'

const TabBarComponent = props => <BottomTabBar {...props} />;

const NotificationStackNavigator = createStackNavigator({
  NotificationView: {
    screen: NotificationView,
    navigationOptions: {
      header: null,
    },
  },
})

const AddInfoStackNavigator = createStackNavigator({
  AddInfoView: {
    screen: AddInfoView,
    navigationOptions: {
      header: null,
    },
  },
})

const ProfileStackNavigator = createStackNavigator({
  ProfileView: {
    screen: ProfileView,
    navigationOptions: {
      header: null,
    },
  },
})

const HomeStackNavigator = createStackNavigator({
  HomeView: {
    screen: HomeView,
    navigationOptions: {
      header: null,
    },
  },
})

const ChatStackNavigator = createStackNavigator({
  ChatView: {
    screen: ChatView,
    navigationOptions: {
      header: null,
    },
  },
})

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
    },
    Chat : {
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
    tabBarComponent: props => (
      <TabBarComponent {...props} style={Style.BottomNavTabContainer} />
    ),
    initialRouteName: 'Home',
    backBehavior: null,
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state
        if (routeName === 'Home') {
          return (
            <>
              <Image
                source={Images.BottomNavHome}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </>
          )
        } else if (routeName === 'Profile') {
          return (
            <>
              <Image
                source={Images.BottomNavProfile}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </>
          )
        } else if (routeName === 'AddInfo') {
          return (
            <View style={Style.AddInfoContainer}>
              <Image
                source={Images.BottomNavAdd}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </View>
          )
        } else if (routeName === 'Chat') {
          return (
            <>
              <Image
                source={Images.BottomNavChat}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </>
          )
        } else if (routeName === 'Notification') {
          return (
            <>
              <Image
                source={Images.BottomNavNews}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </>
          )
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
)
export default class MainScreenWithBottomNav extends React.Component {
  static router = BottomTabNavigator.router

  render() {
    const {navigation} = this.props
    return (
        <BottomTabNavigator navigation={navigation} />
    )
  }
}

// export default BottomTabNav
