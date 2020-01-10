import {StyleSheet, Dimensions} from 'react-native'
import {Colors} from 'src/Theme'
export default StyleSheet.create({
    homeScrollView: {
        flex: 1,
        backgroundColor: '#f4f6f8',
    },
    HomeBannerContainer: {
        flex: 1
    },
    HomeBannerImg: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width/2 
    },
    HomeBannerMsg:{
        position: 'absolute',
        right: 20,
        top: 20,
        width: 40,
        height: 40
    },
    HomeSearchArea: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: -15,
        flexDirection: 'row',
        width: '85%',
        height: 45,
        borderRadius: 4,
        padding: 10,
    },
    HomeSearchImg: {
        width: 26,
        height: 26
    },
    HomeSearchContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    HomeSearchInputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    HomeSearchInput: {
        height: 40,
    },
    HomeMainBtnGroup: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginTop:40,
        marginBottom: 2,
        flex: 1
    },
    HomeCategoryContainer: {
        marginTop: 10,
        padding: 10,
        paddingTop: 5,
        backgroundColor: 'white',
    },
    HomeNotificationArea: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5
    },
    HomeNotificationText: {
        flex: 1,
        color: Colors.grey
    }
})