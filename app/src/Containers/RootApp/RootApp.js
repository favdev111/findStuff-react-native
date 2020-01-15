import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import NavigationService from 'src/Services/NavigationService';
import MainScreenWithBottomNav from 'src/Components/BottomTabNav/BottomTabNav';
import SigninScreen from 'src/Containers/Authentication/SignInScreen/SignInScreen';
import SignUpScreen from 'src/Containers/Authentication/SignUpScreen/SignUpScreen';
import ForgotPwdScreen from 'src/Containers/Authentication/ForgotPwdScreen/ForgotPwdScreen';
import LostStuffScreen from 'src/Containers/AddInfo/LostStuffScreen/LostStuffScreen';
import FoundStuffScreen from 'src/Containers/AddInfo/FoundStuffScreen/FoundStuffScreen';
import Published from 'src/Containers/Profile/Published/Published';
import CategoryDetail from 'src/Containers/Category/CategoryDetail/CategoryDetail';
import Attention from 'src/Containers/Profile/Attention/Attention';
import Notification from 'src/Containers/Notification/NotificationList/NotificationList';

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const AppContainer = createAppContainer(
  createStackNavigator(
    {
      // Create the application routes here (the key is the route name, the value is the target screen)
      // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs

      MainScreenWithBottomNav: MainScreenWithBottomNav,
      Signin: SigninScreen,
      SignUp: SignUpScreen,
      ForgotPwdScreen: ForgotPwdScreen,
      LostStuffScreen: LostStuffScreen,
      FoundStuffScreen: FoundStuffScreen,
      Published: Published,
      CategoryDetail: CategoryDetail,
      Attention: Attention,
      Notification: Notification,
    },
    {
      // By default the application will show the splash screen
      initialRouteName: 'MainScreenWithBottomNav',
      // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
      headerMode: 'none',
    },
  ),
);

export default class RootApp extends Component {
  //   componentDidMount() {
  //     // Run the startup saga when the application is starting
  //     this.props.startup()
  //   }

  render() {
    return <AppContainer />;
  }
}

// const mapStateToProps = () => ({})

// const mapDispatchToProps = (dispatch) => ({
//   startup: () => dispatch(StartupActions.startup()),
// })

// RootApp.propTypes = {
//   startup: PropTypes.func,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(RootApp)
