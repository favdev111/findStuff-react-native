import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAppContainer, createStackNavigator} from 'react-navigation'
import NavigationService from 'src/Services/NavigationService'
import HomeScreen from 'src/Containers/Home'



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
      
      HomeScreen: HomeScreen,
    },
    {
      // By default the application will show the splash screen
      initialRouteName: 'HomeScreen',
      // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
      headerMode: 'none',
    },
  ),
)

export default class RootApp extends Component {
//   componentDidMount() {
//     // Run the startup saga when the application is starting
//     this.props.startup()
//   }

  render() {
    return (
      <AppContainer
        // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
        // <Button onPress={() => this.drawer && this.drawer.openDrawer()}>Open drawer</Button>
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    )
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
