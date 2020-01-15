import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import PropTypes from 'prop-types';
import AreaData from './areaData';
import AndroidPicker from './forAndroid';
import IOSPicker from './forIOS';

class ChinaAreaWheelPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      areaData: {},
      provinces: [],
      selectedProvince: this.props.selectedProvince,
      selectedCity: this.props.selectedCity,
      selectedArea: this.props.selectedArea,
    };
    this.handleChanged = this.handleChanged.bind(this);
  }

  formatAreaData() {
    let areaObj = {};
    for (let data in AreaData) {
      let dataArr = AreaData[data];
      let parentCode = dataArr[1] || '1';
      areaObj[data] = {
        name: dataArr[0],
        code: data,
        parentCode,
      };
      if (parentCode === '1' && !areaObj[parentCode]) {
        areaObj[parentCode] = {};
      }
      if (areaObj[parentCode] && !areaObj[parentCode]['children']) {
        areaObj[parentCode]['children'] = [];
      } else if (areaObj[parentCode]) {
        areaObj[parentCode]['children'].push(data);
      }
    }
    let provinceArr = areaObj[1]['children'];
    for (let index in provinceArr) {
      let childs = areaObj[provinceArr[index]]['children'];
      for (let two in childs) {
        let child = areaObj[childs[two]]['children'];
        if (!child) {
          areaObj[childs[two]]['children'] = [];
        }
        areaObj[childs[two]]['children'].push(areaObj[childs[two]]['code']);
      }
    }
    this.setState({
      areaData: areaObj,
    });
    return areaObj;
  }

  formatProvinces(areaData = {}) {
    let provinces = [];
    for (let pcode in areaData) {
      if (areaData[pcode].parentCode === '1') {
        provinces.push({
          id: pcode,
          name: areaData[pcode].name,
        });
      }
    }
    return provinces;
  }

  handleChanged(selectedAreasInfo) {
    if (this.props.handleChanged) {
      this.props.handleChanged(selectedAreasInfo);
    }
  }

  componentWillMount() {
    const areaData = this.formatAreaData();
    const provinces = this.formatProvinces(areaData);
    this.setState({
      areaData,
      provinces,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    });
  }

  render() {
    if (!this.state.provinces.length) {
      return;
    }
    const AddressPicker = Platform.OS === 'ios' ? IOSPicker : AndroidPicker;
    return (
      <AddressPicker
        visible={this.state.visible}
        areaData={this.state.areaData}
        provinces={this.state.provinces}
        selectedProvince={this.state.selectedProvince}
        selectedCity={this.state.selectedCity}
        selectedArea={this.state.selectedArea}
        handleChanged={this.handleChanged}
      />
    );
  }
}

ChinaAreaWheelPicker.propTypes = {
  visible: PropTypes.bool,
  selectedProvince: PropTypes.string,
  selectedCity: PropTypes.string,
  selectedArea: PropTypes.string,
  handleChanged: PropTypes.func,
};

ChinaAreaWheelPicker.defaultProps = {
  visible: false,
  selectedProvince: '110000',
  selectedCity: '110100',
  selectedArea: '110101',
  handleChanged: () => {},
};

export default ChinaAreaWheelPicker;
