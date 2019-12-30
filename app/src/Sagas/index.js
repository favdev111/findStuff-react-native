import {takeLatest, all} from 'redux-saga/effects'

// import {StartupTypes} from 'App/Stores/Startup/Actions'
// import {startup} from './StartupSaga'

// import {BookmarksTypes} from 'App/Stores/Bookmarks/Actions'
// import {fetchBookmarks} from './BookmarksSaga'

// import { ExampleTypes } from 'App/Stores/Example/Actions'
// import { fetchUser } from './ExampleSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    // takeLatest(StartupTypes.STARTUP, startup),

    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    // takeLatest(ExampleTypes.FETCH_USER, fetchUser),

    // takeLatest(BookmarksTypes.FETCH_BOOKMARKS, fetchBookmarks),
  ])
}
