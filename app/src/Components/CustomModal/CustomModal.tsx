import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Images} from 'src/Theme';
import Styles from './CustomModalStyle';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class CustomModal extends Component {
	public props: any;
	public setState: any;
	public navigation: any;
	state = {
		isModalVisible: false,
	};
	componentWillReceiveProps(){
		this.setState({isModalVisible: this.props.isPropsModalVisible});
	}

	toggleModal = () => {
		this.setState({isModalVisible: false});
	};
	
	render() {
		return (
			<View style={{flex: 1}}>
				<Modal
					style={Styles.AddInfoModalContainer}
					isVisible={this.state.isModalVisible}
					backdropColor={'#c4c4c4'}
					backdropOpacity={0.9}>
					<View style={{alignItems: 'center', justifyContent: 'center'}}>
						<View style={Styles.ContentContainer}>
							<View style={Styles.ContentWrap}>
								<Text>
									2019年12月，众议院以两项罪名——滥用职权和妨碍国会对特朗普提出弹劾。2020年1月16日，美国参议院正式开启了针对特朗普弹劾案的审理，正式审判将从21日下午1点开始，预计将持续六天，周日除外。

								　　据外媒报道，民主党人向参议院发出了对其要求弹劾美国总统特朗普的详细论据，众议院情报委员会网站上刊登了这111页文件。

								　　文件称：“特朗普利用官方权力对外国政府施压，要求其为自己的个人政治利益干预美国大选。之后，他试图通过妨碍国会调查其违规行为来隐瞒这一图谋。”

								　　该文件称：“当总统犯下如此严重的滥用职权时，宪法提供了解决方案——弹劾和罢免。参议院应利用这一解决方案来捍卫2020年美国大选，捍卫我们的宪政方式，并消除总统对美国国家安全所构成的威胁。”
								</Text>
							</View>
							<TouchableOpacity style={Styles.bottomBtnContainer}
								onPress={() => {
								this.toggleModal();
								}}>
								<Text style={{color: 'blue', fontSize: 21}}>同意</Text>
							</TouchableOpacity>
						</View>	
							
					</View>
				</Modal>
			</View>
		);
	}
}
