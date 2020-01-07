import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import {Images} from 'src/Theme'
import CatListBtn from 'src/Components/Buttons/CatListBtn/CatListBtn'
import Styles from './CategoryListStyle'

 
const CategoryListJson = [
         {'手机': 'CatMobile'},
         {'钱包': 'CatWallet'},
         {'宠物': 'CatPet'},
         {'书籍': 'CatBook'},
         {'首饰': 'CatJewelry'},
         {'生活用品': 'CatLife'},
         {'钥匙': 'CatKey'},
         {'证件': 'CatCard'},
         {'衣物': 'CatClothes'},
         {'交通工具': 'CatCar'},
         {'背包 / 手袋': 'CatBag'},
         {'寻人启事': 'CatHeart'},
         {'数码产品': 'CatDigital'}
]

export default class CategoryList extends React.Component {

	render() {
		return (
         <ScrollView>
            <View style={Styles.CategoryListContainer}>
               <View style={Styles.CategoryListHeader}>
                  <Text style={{color: '#ffffff', fontSize: 20 }}>分类</Text>
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
         </ScrollView>
		);
	}
}
