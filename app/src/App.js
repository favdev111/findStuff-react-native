import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'
import RootApp from 'src/Containers/RootApp/RootApp'
// import createStore from 'src/Stores'
// const {store, persistor} = createStore()

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      // <Provider store={store}>
        
        // <PersistGate loading={null} persistor={persistor}>

          <RootApp />
        // </PersistGate>
      // </Provider>
    )
  }
}

