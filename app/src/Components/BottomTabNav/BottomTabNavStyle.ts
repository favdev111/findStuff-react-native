import {StyleSheet} from 'react-native'
export default StyleSheet.create({
    tabBarIcon: {
        width: 25,
        height: 25,
    },
    AddInfoContainer: {
        position: 'absolute',
        left: 0,
        top: -20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 20,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowColor: '#000000',
        elevation: 3,
    },
    BottomNavTabContainer: {
        borderTopWidth: 0.3,
        borderColor: '#ddd',
    }
})