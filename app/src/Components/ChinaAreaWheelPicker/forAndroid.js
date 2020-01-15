import React, {Component, PropTypes} from 'react';
import {View, Text, Modal, ScrollView} from 'react-native';
import styles from './androidStyles';

class ForAndroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      isCityVisible: false,
      isAreaVisible: false,
      areaData: this.props.areaData,
      provinces: this.props.provinces,
      provincesList: this.props.provinces,
      citysList: [],
      areasList: [],
      selectedProvince: this.props.selectedProvince,
      selectedCity: this.props.selectedCity,
      selectedArea: this.props.selectedArea,
    };
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.setState({
      visible: false,
      isCityVisible: false,
      isAreaVisible: false,
    });
  }

  handleProvinceChange(provinceId) {
    let provinceArr = this.state.provinces.filter(province => {
      return province.id === provinceId;
    });
    let citys = this.formatCitys(provinceId);
    if (citys.length === 1) {
      let areas = this.formatAreas(citys[0].id);
      if (areas.length) {
        this.setState({
          visible: false,
          isAreaVisible: true,
          provinceText: provinceArr[0].name,
          selectedProvince: provinceId,
          cityText: citys[0].name,
          selectedCity: citys[0].id,
          areas,
          areasList: areas,
        });
      } else {
        this.setState({
          visible: false,
          isCityVisible: true,
          provinceText: provinceArr[0].name,
          selectedProvince: provinceId,
          citys,
          citysList: citys,
        });
      }
    } else {
      this.setState({
        visible: false,
        isCityVisible: true,
        provinceText: provinceArr[0].name,
        selectedProvince: provinceId,
        citys,
        citysList: citys,
      });
    }
  }

  handleCityChange(cityId) {
    let cityArr = this.state.citys.filter(city => {
      return city.id === cityId;
    });
    let areas = this.formatAreas(cityId);
    if (!areas.length) {
      this.setState({
        isCityVisible: false,
        isAreaVisible: false,
        cityText: cityArr[0].name,
        selectedCity: cityId,
      });
      if (this.props.handleChanged) {
        this.props.handleChanged({
          provinceId: this.state.selectedProvince,
          provinceText: this.state.provinceText,
          cityId: cityId,
          cityText: cityArr[0].name,
          areaId: '',
          areaText: '',
        });
      }
    } else {
      this.setState({
        isCityVisible: false,
        isAreaVisible: true,
        cityText: cityArr[0].name,
        selectedCity: cityId,
        areas,
        areasList: areas,
      });
    }
  }

  handleAreaChange(areaId) {
    let areaArr = this.state.areas.filter(area => {
      return area.id === areaId;
    });

    this.setState({
      isAreaVisible: false,
      areaText: areaArr[0].name,
      selectedArea: areaId,
    });

    if (this.props.handleChanged) {
      this.props.handleChanged({
        provinceId: this.state.selectedProvince,
        provinceText: this.state.provinceText,
        cityId: this.state.selectedCity,
        cityText: this.state.cityText,
        areaId: areaId,
        areaText: areaArr[0].name,
      });
    }
  }

  formatCitys(provinceId) {
    let areaData = this.state.areaData;
    let citys = [];
    for (let pcode in areaData) {
      if (areaData[pcode].parentCode === provinceId) {
        citys.push({
          id: pcode,
          name: areaData[pcode].name,
        });
      }
    }
    return citys;
  }

  formatAreas(cityId) {
    let areaData = this.state.areaData;
    let areas = [];
    for (let cCode in areaData) {
      if (areaData[cCode].parentCode === cityId) {
        areas.push({
          id: cCode,
          name: areaData[cCode].name,
        });
      }
    }
    return areas;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    });
  }

  pickerModal() {
    let provinceModal = (
      <Modal
        animationType="fade"
        transparent
        visible={this.state.visible}
        onRequestClose={this.handleCancel}
        key={'provinces'}>
        <View style={styles.overlayStyle}>
          <View style={styles.container}>
            <Text style={styles.title}>请选择省份</Text>
            <ScrollView style={styles.list}>
              {this.state.provincesList.map(rowData => {
                return (
                  <Text
                    style={styles.listItem}
                    key={rowData.id}
                    onPress={this.handleProvinceChange.bind(this, rowData.id)}>
                    {rowData.name}
                  </Text>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
    let cityModal = (
      <Modal
        animationType="fade"
        transparent
        visible={this.state.isCityVisible}
        onRequestClose={this.handleCancel}
        key={'citys'}>
        <View style={styles.overlayStyle}>
          <View style={styles.container}>
            <Text style={styles.title}>请选择城市</Text>
            <ScrollView style={styles.list}>
              {this.state.citysList.map(rowData => {
                return (
                  <Text
                    style={styles.listItem}
                    key={rowData.id}
                    onPress={this.handleCityChange.bind(this, rowData.id)}>
                    {rowData.name}
                  </Text>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
    let areaModal = (
      <Modal
        animationType="fade"
        transparent
        visible={this.state.isAreaVisible}
        onRequestClose={this.handleCancel}
        key={'areas'}>
        <View style={styles.overlayStyle}>
          <View style={styles.container}>
            <Text style={styles.title}>请选择区/县</Text>
            <ScrollView style={styles.list}>
              {this.state.areasList.map(rowData => {
                return (
                  <Text
                    style={styles.listItem}
                    key={rowData.id}
                    onPress={this.handleAreaChange.bind(this, rowData.id)}>
                    {rowData.name}
                  </Text>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
    return [provinceModal, cityModal, areaModal];
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        {this.pickerModal()}
      </View>
    );
  }
}

export default ForAndroid;
