import React, {ReactElement, FC} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import MainScreenWithBottomNav from 'src/Components/BottomTabNav/BottomTabNav';
import SigninScreen from 'src/Containers/Authentication/SignInScreen/SignInScreen';
import SignUpScreen from 'src/Containers/Authentication/SignUpScreen/SignUpScreen';
import ForgotPwdScreen from 'src/Containers/Authentication/ForgotPwdScreen/ForgotPwdScreen';
import LostStuffScreen from 'src/Containers/AddInfo/LostStuffScreen/LostStuffScreen';
import FoundStuffScreen from 'src/Containers/AddInfo/FoundStuffScreen/FoundStuffScreen';
import Published from 'src/Containers/Profile/Published/Published';
import Attention from 'src/Containers/Profile/Attention/Attention';
import Notification from 'src/Containers/Notification/NotificationList/NotificationList';
import ChatDetail from 'src/Containers/Chat/ChatDetail/ChatDetail';
import UserInfo from 'src/Containers/Category/UserInfo/UserInfo';
import News from 'src/Containers/News/News';
import NewsDetail from 'src/Containers/News/NewsDetail/NewsDetail';
import LocalPhone from 'src/Containers/LocalPhone/LocalPhone'

const AppNavigator = createStackNavigator(
	{
		MainScreenWithBottomNav: MainScreenWithBottomNav,
		Signin: SigninScreen,
		SignUp: SignUpScreen,
		ForgotPwdScreen: ForgotPwdScreen,

		LostStuffScreen: LostStuffScreen,
		FoundStuffScreen: FoundStuffScreen,

		Published: Published,
		Attention: Attention,
		Notification: Notification,
		ChatDetail: ChatDetail,
		UserInfo: UserInfo,
		News: News,
		NewsDetail: NewsDetail,
		LocalPhone: LocalPhone,
	},
	{
		initialRouteName: 'MainScreenWithBottomNav',
		headerMode: 'none',
	},
);

const AppContainer = createAppContainer(AppNavigator);

const RootApp: FC = (): ReactElement => {
	return <AppContainer />;
};

export default RootApp;
