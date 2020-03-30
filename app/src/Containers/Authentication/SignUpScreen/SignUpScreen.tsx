import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Button,} from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from './SignUpScreenStyle';
import CustomTextInput from 'src/Components/CustomForm/CustomTextInput/CustomTextInput';
import CustomPwdInput from 'src/Components/CustomForm/CustomPwdInput/CustomPwdInput';
import CustomPhoneInput from 'src/Components/CustomForm/CustomPhoneInput/CustomPhoneInput';
import FormCommonBtn from 'src/Components/Buttons/FormCommonBtn/FormCommonBtn';
import Modal from 'react-native-modal';

import {Images} from 'src/Theme';

import Toast from 'react-native-simple-toast';
import {baseUrl} from 'src/config';
const axios = require('axios');

export default function SignUpScreen(props) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [init, setInit] = useState(0);
  const [sentOtp, setSentOtp] = useState(false);
  const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(true);

  const sendOTP = async () => {
    await axios
      .post(baseUrl + 'auth/otp', {
        phone,
      })
      .then(response => {
        if (response.data.success) {
          setSentOtp(true);
          Toast.show(response.data.msg); //check your inbox
          console.log('success', response.data.msg);
        } else {
          Toast.show(response.data.msg);
          setInit(init + 1);
          console.log('failed', response.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  async function handleSubmit() {
    if (otp === '' || phone === '' || password === '') {
      Toast.show('正确输入值！');
      return;
    }

    if (!sentOtp) {
      Toast.show('发送验证码！');
      return;
    }

    if (password !== confirmPassword) {
      Toast.show('密码和确认密码不同');
      return;
    }

    console.log(phone, password);

    axios
      .post(baseUrl + 'auth/signup', {
        phone,
        password,
        otp,
      })

      .then(function(response2) {
        if (response2.data.success) {
          Toast.show(response2.data.msg);
          props.navigation.navigate('Signin');
        } else {
          Toast.show(response2.data.msg);
        }
      })
      .catch(function(error) {
        console.log(error);
        // Toast.show('错误');
      });
  }

  useEffect(() => {}, [phone]);

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={Styles.SignUpHeader}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => props.navigation.navigate('Signin')}>
            <FastImage
              source={Images.whiteLeftChevron}
              style={Styles.SignUpHeaderImg}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 20, color: '#fff'}}>用户注册</Text>
          <Text style={{flex: 1}}></Text>
        </View>
        <View style={Styles.SignFormContainer}>
          <View style={Styles.FormInput}>
            <CustomPhoneInput
              CustomLabel={'手机'}
              CustomPlaceholder={'请输入账号或手机号码'}
              proc={value => setPhone(value)}
              proc2={() => {
                sendOTP();
              }}
              init={init}
            />
          </View>
          <View style={Styles.FormInput}>
            <CustomPwdInput
              CustomPwdLabel={'密码'}
              CustomPwdPlaceholder={'请输入密码'}
              proc={value => {
                setPassword(value);
              }}
            />
          </View>
          <View style={Styles.FormInput}>
            <CustomPwdInput
              CustomPwdLabel={'确认密码'}
              CustomPwdPlaceholder={'请输入确认密码'}
              proc={value => {
                setConfirmPassword(value);
              }}
            />
          </View>
          <View style={Styles.FormInput}>
            <CustomTextInput
              CustomLabel={'验证码'}
              CustomPlaceholder={'验证码'}
              proc={value => {
                setOtp(value);
              }}
            />
          </View>

          <View style={Styles.SignBtn}>
            <FormCommonBtn CustomBtnTitle={'注册'} proc={handleSubmit} />
          </View>
        </View>
				<Modal
        isVisible={isModalVisible}
        coverScreen={true}
        style={{
          backgroundColor: '#fff',
          // marginTop: 100,
          // marginBottom: 100,
          // marginLeft: 30,
          // marginRight: 30,
					borderRadius: 10,
					// width: "100%",
					// height: "100%",
        }}>
        <ScrollView
          style={{
            flexDirection: 'column',
            // justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              flex: 6,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
						<View
              style={{
                // justifyContent: 'center',
                // alignItems: 'center',
                padding: 25,
              }}>
              <Text>
								欢迎光临寻N失物招领，请您仔细阅读以下条款，如果您对本协议的任何条款表示异议，您可以选择不进入寻N失物招领，进入寻N失物招领则意味着您将自愿遵守以下规则，并完全服从于寻N失物招领的统一管理。{"\n"}
							</Text>
							<Text>
								第一章 总则 {"\n"}
							</Text>
							<Text>
								第1条 本平台命名为 “寻N失物招领”，以下简称“平台” {"\n"}
								第2条 本平台所有权、经营权、管理权均属比耶公司。 {"\n"}
								第3条 本协议最终解释权归属平台。 {"\n"}
							</Text>
							<Text>
								第二章 平台用户  {"\n"}
							</Text>
							<Text>
								第4条 凡是注册用户和浏览用户均为本平台用户（以下统称“用户”）。{"\n"}
								第5条 用户的个人信息受到保护，不接受任何个人或单位的查询。司法、检察机关因法律需要除外、用户的个人设置公开除外。{"\n"}
								第6条 用户享有言论自由的权力。{"\n"}
								第7条 用户的言行不得违反《计算机信息网络国际联网安全保护管理办法》、《互联网信息服务管理办法》、《互联网电子公告服务管理规定》、《维护互联网安全的决定》等相关法律规定，不得在本平台发布任何违反国家法律法规的言论，不得发表任何包含种族、性别、宗教的歧视性内容，不得发表猥亵性的文章，对于任何人都不能进行侮辱、谩骂及人身攻击，本平台用户必须严格遵守本办法及网络礼仪规定。{"\n"}
								第8条 用户在相关平台发表文章时，除遵守本条例外，还需遵守版主对该版的相关规定；遵守本平台条例的用户在本站中拥有言论自由的权利。{"\n"}
								第9条 不允许在本平台内发布任何形式的非失物招领、寻物启事信息。{"\n"}
								第10条 用户应承担一切因其个人的行为而直接或间接导致的民事或刑事法律责任，因用户行为给平台造成损失的，用户应负责赔偿。{"\n"}
								第11条 本平台拥有对违反本站规则的用户进行处理的权力，直至禁止其在本平台内发布信息。{"\n"}
							</Text>
							<Text>
								第三章 版权声明 {"\n"}
							</Text>
							<Text>
								第12条 本平台文章仅代表作者本人观点，与本站立场无关。作者文责自负；用户之间通过平台相识、交往中所发生或可能发生的任何心理、生理上的伤害和经济上的损失，平台不承担任何责任。 对于用户的发言的真实性寻N（比耶）也不承担任何责任。 {"\n"}
								第13条 用户在本站发表的信息，平台有权在网站内转载或引用。 {"\n"}
								1.在用于非商业、非盈利、非广告性目的时需注明作者及文章出处“寻N失物招领”；{"\n"}
								2.在用于商业、盈利、广告性目的时需征得文章原作者同意，并注明作者姓名、授权范围及文章出处“寻N失物招领”；{"\n"}
								3.任何修改与部份删除均需应保持作者文字原意并征求原作者同意，并注明授权范围。{"\n"}
							</Text>
							<Text>
								第四章 处罚规则 {"\n"}
							</Text>
							<Text>
								第15条 本平台用户若出现下列情况任意一种或几种，平台有权关闭部分权限、暂停直至删除其帐号。  {"\n"}
								1.使用不雅或不恰当ID和昵称；{"\n"}
								2.在各平台发表含有猥亵、色情、人身攻击和反政府言论等非法或侵权言论的； {"\n"}
								3.从事非法商业活动； {"\n"}
								4.模仿平台管理人员ID或者他人ID，用以假冒管理人员或破坏管理人员形象； {"\n"}
								第16条 凡文章出现以下情况之一，平台管理人员有权不提前通知作者直接删除，并依照有关规定作相应处罚。情节严重者，平台有权对其做出关闭部分权限、暂停直至删除其帐号。{"\n"}
								1.发表谩骂、包含人身攻击的文章；{"\n"}
								2.发表不符合版面主题，或者无内容的灌水文章；{"\n"}
								3.同一文章多次出现的；{"\n"}
								4.非广告发布区域发布的与版面主题关系不大的广告；{"\n"}
								5.文章内容或个人签名会包含有严重影响网友浏览的内容或格式的；{"\n"}
								6.其他平台认为不恰当的情况。{"\n"}
							</Text>
							<Text>
								第四章 处罚规则 {"\n"}
							</Text>
							<Text>
								第15条 本平台用户若出现下列情况任意一种或几种，平台有权关闭部分权限、暂停直至删除其帐号。  {"\n"}
								1.使用不雅或不恰当ID和昵称；{"\n"}
								2.在各平台发表含有猥亵、色情、人身攻击和反政府言论等非法或侵权言论的； {"\n"}
								3.从事非法商业活动； {"\n"}
								4.模仿平台管理人员ID或者他人ID，用以假冒管理人员或破坏管理人员形象； {"\n"}
								第16条 凡文章出现以下情况之一，平台管理人员有权不提前通知作者直接删除，并依照有关规定作相应处罚。情节严重者，平台有权对其做出关闭部分权限、暂停直至删除其帐号。{"\n"}
								1.发表谩骂、包含人身攻击的文章；{"\n"}
								2.发表不符合版面主题，或者无内容的灌水文章；{"\n"}
								3.同一文章多次出现的；{"\n"}
								4.非广告发布区域发布的与版面主题关系不大的广告；{"\n"}
								5.文章内容或个人签名会包含有严重影响网友浏览的内容或格式的；{"\n"}
								6.其他平台认为不恰当的情况。{"\n"}
							</Text>
							<Text>
								第五章 附则 {"\n"}
							</Text>
							<Text>
								第17条 所有用户发表的文章因版权引起的纠纷，与本平台无关。 {"\n"}
								第18条 平台如因系统维护或升级等而需暂停服务时，将事先公告。若因硬件故障或其它不可抗力而导致暂停服务，于暂停服务期间造成的一切不便与损失，本平台不负任何责任。 由于平台的调整导致的帖子等信息的丢失本平台不负担任何责任。 {"\n"}
								第19条 本平台用户在本平台内发布的信息如有任何违法行为比耶公司有权将用户资料信息如实上报当地公安处理。{"\n"}
								第20条 本办法未涉及的问题参见国家有关法律法规，当本法与国家法律法规冲突时，以国家法律法规为准。{"\n"}
							</Text>
						</View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
							justifyContent: 'center',
							paddingBottom: 20,
            }}>
            <View style={{flex: 1}}></View>
            <View style={{width: '50%'}}>
              <Button
                title="同意"
                onPress={() => {
									setIsModalVisible(!isModalVisible);
                }}
              />
            </View>
            <View style={{flex: 1}}></View>
          </View>
        </ScrollView>
      </Modal>			
			</View>
    </ScrollView>
  );
}
