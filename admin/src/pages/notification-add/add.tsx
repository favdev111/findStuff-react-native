import React, { useState, useEffect } from "react";
import { FormComponentProps } from "antd/es/form";
import { useForm } from "react-hook-form";
import "./index.scss";
import { addNotification } from "../../utils/api";

import { Select, Row, Col } from "antd";

import { provinceData, cityData } from "../../utils/regionJson";

const { Option } = Select;

interface TagsProps<T = any> extends FormComponentProps<T> {
  history?: any;
}

function AddContact(props: TagsProps) {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = async data => {
    console.log(data);

    const res = await addNotification(data);

    if (res.data.success) {
      props.history.push("/notifications");
    }
  };

  const [city, setCity] = useState("天山区");
  const [firstAddr, setFirstAddr] = useState("乌鲁木齐");
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);

  const handleProvinceChange = value => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
    setFirstAddr(value);
  };

  useEffect(() => {
    //setCity(firstAddr + " " + secondCity);
    setCity(secondCity);
  }, [secondCity, firstAddr]);

  return (
    <Row>
      <Col span={6}></Col>
      <Col span={12}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ borderRadius: 5, margin: 5, width: "50%" }}
        >
          <input
            name="city"
            type="hidden"
            placeholder="城市"
            ref={register}
            value={city}
          />
          {/* register an input */}
          <div style={{ margin: 5 }}>
            <Select
              defaultValue={provinceData[0]}
              style={{ width: 120 }}
              onChange={handleProvinceChange}
            >
              {provinceData.map(province => (
                <Option key={province}>{province}</Option>
              ))}
            </Select>
            <Select
              style={{ width: 120 }}
              value={secondCity}
              onChange={value => {
                setSecondCity(value);
              }}
            >
              {cities.map(city => (
                <Option key={city}>{city}</Option>
              ))}
            </Select>
          </div>
          <br />
          <input
            name="content"
            placeholder=""
            ref={register({ required: true })}
            style={{ borderRadius: 5, margin: 10, width: "100%" }}
          />
          {errors.content && "Content is required."}
          <br />
          <input
            type="submit"
            value="添加"
            style={{ borderRadius: 5, margin: 10, width: "100%" }}
          />
        </form>
      </Col>
      <Col span={6}></Col>
    </Row>
  );
}

export default AddContact;
