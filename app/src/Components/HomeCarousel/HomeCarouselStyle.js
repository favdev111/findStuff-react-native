import {StyleSheet} from 'react-native'
import { Text, View, Image, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        height: 200
    },
    
    wrapper: {
    },
    
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    
    image: {
        width,
        flex: 1
    },
    carouselDot: {
        backgroundColor: 'rgba(0,0,0,.2)', 
        width: 5, 
        height: 5, 
        borderRadius: 4, 
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 3
    },
    carouselActiveDot: {
        backgroundColor: '#000', 
        width: 8, 
        height: 8, 
        borderRadius: 4, 
        marginLeft: 3, 
        marginRight: 3, 
        marginTop: 3, 
        marginBottom: 3
    }


})