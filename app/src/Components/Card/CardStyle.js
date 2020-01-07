import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    CardWrap: {
        flex: 1,
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
    },
    CardInfoWrap: {
        flexDirection: "row",
    },
    ImageSection:{
        flex: 2,
    },
    AvatarStyle: {
        width: 45,
        height: 45,
    },
    UserName: {
        flex:2
    },
    CardBtnGroup: {
        flex: 4,
        flexDirection: 'row-reverse'
    },
    CardCatName: {
        borderColor: 'blue',
        fontSize: 5
    },
    CardPriceBtn: {
        marginTop: 5,
    },
    CardCatBtnWrap: {
        flexDirection: "row-reverse"
    },
    CardDescription: {
        flex: 1,
        marginTop: 8,
        alignItems: 'center',
    },
    CardImageSection: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    CardImage: {
        width:80,
        height:80
    },
    CardLocation: {
        flexDirection: 'row',
    },
    CardLocationImg: {
        width: 20,
        height: 20,
    }
})
