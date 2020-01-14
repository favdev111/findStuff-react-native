import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image} from 'react-native'
import {Images, Colors} from 'src/Theme'
import CatListBtn from 'src/Components/Buttons/CatListBtn/CatListBtn'
import Styles from './CategoryListStyle'
import Card from 'src/Components/Card/Card'

 
const CategoryListJson = [
         {'钱包': 'CatWallet'},
         {'钥匙': 'CatKey'},
         {'数码': 'CatDigital'},
         {'办公': 'CatOffice'},
         {'寻人': 'CatMan'},
         {'宠物': 'CatPet'},
         {'背包': 'CatBag'},
         {'其他': 'CatOther'},
]

export default class CategoryList extends React.Component {

	render() {
		return (
         <ScrollView style={{backgroundColor: '#f4f6f8'}}>
            <View style={Styles.CategoryListContainer}>
               <View style={Styles.FindStuffHeaderContainer}>
                  <TouchableOpacity >
                     <Image source={Images.whiteLeftChevron} style={Styles.FindStuffHeaderImg} />
                  </TouchableOpacity>
                  <View style={{ alignItems: 'center'}}>
                     <Text style={{fontSize: 20, color: '#fff'}}>
                        寻物户示
                     </Text>
                  </View>
                  <View style={Styles.HeaderRightImgContainer}>
                     <Image source={Images.TextEdit} style={Styles.HeaderRightImg} />
                  </View>
               </View>
               <View style={Styles.CategoryListWrap}>
                  <FlatList
                     horizontal={false}
                     numColumns={4}
                     style={Styles.CategoryFlatList}
                     data={CategoryListJson}
                     renderItem={({item}) => (
                        <TouchableOpacity>
                           <CatListBtn title={Object.keys(item)} imgSource={Object.values(item)} ></CatListBtn>
                        </TouchableOpacity>
                     )}
                     keyExtractor={(item, index) => index.toString()}
                  />
               </View>
            </View>
            <View style={Styles.CardsContainer}>
               <Card></Card>
               <Card></Card>
               <Card></Card>
               <Card></Card>
            </View>
         </ScrollView>
		);
	}
}
