import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images} from 'src/Theme';
import Styles from './CategoryListStyle';
import Style from 'src/Style';
import Header from 'src/Components/Header/Header';
import {baseUrl} from 'src/config';
import axios from 'axios';

import SearchBox from './SearchBox';

import {Table, Row} from 'react-native-table-component';
import {reduceDataForScreenSize} from 'src/Components/Table/responsive/reduceDataForScreenSize';
import {useBreakpoint} from 'src/Components/Table/hooks/useBreakpoint';

import {store} from 'src/Store';

const smallScreenIndices = [0, 1, 2];
const mediumScreenIndices = [0, 1, 2];
const head = ['城市', '小区名', '电话号'];

export default function CategoryList(props) {
  const [state, dispatch] = useContext(store);

  console.log(state.region, 'state.region...');

  const breakpoint = useBreakpoint();
  const [data, setData] = useState<string[][]>();

  const [tmp, setTmp] = useState('');
  const [key, setKey] = useState(state.region);

  const handleSearch = () => {
    setKey(tmp);
  };

  useEffect(() => {
    console.log('region Key... .. ..', key);

    axios
      .get(baseUrl + 'api/contact', {
        params: {
          key,
        },
      })
      .then(function(response) {
        const items = response.data;
        let i = 0,
          result = [];

        //convert data to the table data format
        while (i < items.length) {
          result.push([]);
          for (let it in items[i]) {
            if (it === 'city' || it == 'district' || it === 'number') {
              result[result.length - 1].push(items[i][it]);
            }
          }
          i++;
        }

        setData(result);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, [key]);

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={Styles.CategoryListContainer}>
        <Header back={() => props.navigation.goBack()} label={'小区电话'} />

        <SearchBox inputProc={setTmp} handleSearch={handleSearch} />
      </View>
      <View>
        {data && (
          <Table borderStyle={Styles.border} style={Styles.table}>
            <Row
              flexArr={[1, 1, 1]}
              data={reduceDataForScreenSize(
                head,
                breakpoint,
                smallScreenIndices,
                mediumScreenIndices,
              )}
              style={Styles.head}
              textStyle={Styles.text}
            />
            {data.map((entry, index) => (
              <Row
                key={index}
                flexArr={[1, 1, 1]}
                data={reduceDataForScreenSize(
                  entry,
                  breakpoint,
                  smallScreenIndices,
                  mediumScreenIndices,
                )}
                style={[
                  Styles.dataRow,
                  index % 2 && {backgroundColor: '#effeee'},
                ]}
                textStyle={Styles.text}
              />
            ))}
          </Table>
        )}
      </View>
    </ScrollView>
  );
}
