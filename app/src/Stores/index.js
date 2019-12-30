import {combineReducers} from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'src/Sagas'
// import {reducer as ExampleReducer} from './Example/Reducers'

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    // example: ExampleReducer,
    // bookmarks: BookmarksReducer,
  })

  // return configureStore(rootReducer, rootSaga)
}
