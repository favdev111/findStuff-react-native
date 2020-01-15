import React, {Component, PropTypes} from 'react';
import {View, Text, Modal, Picker} from 'react-native';
import styles from './iosStyles';

class ForIOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      areaData: this.props.areaData,
      provinces: this.props.provinces,
      citys: [],
      areas: [],
      selectedProvince: this.props.selectedProvince,
      selectedCity: this.props.selectedCity,
      selectedArea: this.props.selectedArea,
    };
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleAreaChange = this.handleAreaChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  handleSubmit() {
    if (this.props.handleChanged) {
      let provinceArr = this.state.provinces.filter(province => {
        return province.id === this.state.selectedProvince;
      });
      let cityArr = this.state.citys.filter(city => {
        return city.id === this.state.selectedCity;
      });
      let areaArr = this.state.areas.filter(area => {
        return area.id === this.state.selectedArea;
      });
      if (!areaArr.length) {
        this.props.handleChanged({
          provinceId: this.state.selectedProvince,
          provinceText: provinceArr[0].name,
          cityId: this.state.selectedCity,
          cityText: cityArr[0].name,
          areaId: this.state.selectedArea,
          areaText: '',
        });
      } else {
        this.props.handleChanged({
          provinceId: this.state.selectedProvince,
          provinceText: provinceArr[0].name,
          cityId: this.state.selectedCity,
          cityText: cityArr[0].name,
          areaId: this.state.selectedArea,
          areaText: areaArr[0].name,
        });
      }
    }
  }

  handleProvinceChange(provinceId) {
    this.setState({
      selectedProvince: provinceId,
    });
    this.formatCitys(provinceId, true);
  }

  handleCityChange(cityId) {
    this.setState({
      selectedCity: cityId,
    });
    this.formatAreas(cityId, true);
  }

  handleAreaChange(areaId) {
    this.setState({
      selectedArea: areaId,
    });
  }

  formatCitys(defaultProvinceId, changed = false) {
    let areaData = this.state.areaData;
    let citys = [];
    for (let pcode in areaData) {
      if (areaData[pcode].parentCode === defaultProvinceId) {
        citys.push({
          id: pcode,
          name: areaData[pcode].name,
        });
      }
    }
    this.setState({
      citys,
    });
    let cityId;
    if (changed) {
      cityId = citys[0].id;
      this.setState({
        selectedCity: cityId,
      });
    } else if (this.props.selectedCity) {
      cityId = this.props.selectedCity;
    }
    this.formatAreas(cityId, changed);
  }

  formatAreas(defaultCityId, changed) {
    let areaData = this.state.areaData;
    let areas = [];
    for (let cCode in areaData) {
      if (areaData[cCode].parentCode === defaultCityId) {
        areas.push({
          id: cCode,
          name: areaData[cCode].name,
        });
      }
    }
    if (!areas.length) {
      this.setState({
        areas,
      });
      if (changed) {
        this.setState({
          selectedArea: '',
        });
      }
    } else {
      this.setState({
        areas,
      });
      if (changed) {
        this.setState({
          selectedArea: areas[0].id,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    });
    this.formatCitys(nextProps.selectedProvince);
  }

  renderPicker() {
    return (
      <View style={styles.overlayStyle}>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerNavWrap}>
            <View
              isHandlerPress={true}
              onPress={this.handleCancel}
              style={styles.btn}>
              <Text style={styles.btnText}>取消</Text>
            </View>
            <View
              isHandlerPress={true}
              onPress={this.handleSubmit}
              style={styles.btn}>
              <Text style={styles.btnText}>完成</Text>
            </View>
          </View>
          <View style={styles.pickerWrap}>
            <Picker
              onValueChange={this.handleProvinceChange}
              selectedValue={this.state.selectedProvince}
              style={styles.pickerItem}>
              {this.state.provinces.map((province, index) => {
                return (
                  <Picker.Item
                    value={province.id}
                    label={province.name}
                    key={index}
                  />
                );
              })}
            </Picker>
            <Picker
              onValueChange={this.handleCityChange}
              selectedValue={this.state.selectedCity}
              style={styles.pickerItem}>
              {this.state.citys.map((city, index) => {
                return (
                  <Picker.Item value={city.id} label={city.name} key={index} />
                );
              })}
            </Picker>
            <Picker
              onValueChange={this.handleAreaChange}
              selectedValue={this.state.selectedArea}
              style={styles.pickerItem}>
              {this.state.areas.map((area, index) => {
                return (
                  <Picker.Item value={area.id} label={area.name} key={index} />
                );
              })}
            </Picker>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.state.visible}
        onRequestClose={this.handleCancel}>
        {this.renderPicker()}
      </Modal>
    );
  }
}

export default ForIOS;
