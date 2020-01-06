// import {PropTypes} from 'prop-types'
import React, {createRef} from 'react'
import {Image, Linking, Text} from 'react-native'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import AddInfoView from 'src/Containers/AddInfo/AddInfo'
import CategoryView from 'src/Containers/Category/CategoryAll'
import ProfileView from 'src/Containers/Profile/Profile'
import HomeView from 'src/Containers/Home'
import Style from './BottomTabNavStyle'
import {Colors, Images} from 'src/Theme'

const CategoryStackNavigator = createStackNavigator({
  CategoryView: {
    screen: CategoryView,
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

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
    },
    Category: {
      screen: CategoryStackNavigator,
    },
    AddInfo: {
      screen: AddInfoStackNavigator,
    },
    Profile: {
      screen: ProfileStackNavigator,
    },
  },
  {
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
            <>
              <Image
                source={Images.BottomNavAdd}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
            </>
          )
        } else if (routeName === 'Category') {
          return (
            <>
              <Image
                source={Images.BottomNavCat}
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
export default BottomTabNavigator;
// class BottomTabNav extends React.Component {

//   render() {
//     const {navigation} = this.props
//     return (
//         <BottomTabNavigator navigation={navigation} />
//     )
//   }
// }

// export default BottomTabNav
