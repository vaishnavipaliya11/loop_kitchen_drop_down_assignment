import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import Select from "react-select";
import "./styles.css";

export default function App() {
  const [hotelData, setHotelData] = useState([]);

  const [bName, setBName] = useState([]);
  const [vName, setVName] = useState([]);
  const [sNameData, setSName] = useState([]);

  const [optionBName, setOptionBname] = useState([]);
  const [optionSlugName, setOptionSlugname] = useState([]);
  const [optionVName, setOptionVname] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [options] = useState([
    { label: bName, value: bName },
    { label: sNameData, value: sNameData },
    { label: vName, value: vName }
  ]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(
          "https://us-central1-arboreal-vision-339901.cloudfunctions.net/get_filter_values"
        );
        setHotelData(data.data);

        setBName(_.uniq(data.data.map((data) => data.b_name)));
        setSName(_.uniq(data.data.map((data) => data.slug)));
        setVName(_.uniq(data.data.map((data) => data.vb_name)));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const filteredHotel = hotelData?.filter(
    (data) =>
      (optionBName.length
        ? !!optionBName.find((opt) => opt.value === data.b_name)
        : true) &&
      (optionSlugName.length
        ? !!optionSlugName.find((opt) => opt.value === data.slug)
        : true) &&
      (optionVName.length
        ? !!optionVName.find((opt) => opt.value === data.vb_name)
        : true)
  );
  // console.log(typeof((filteredHotel.map((data) => data.b_name)))
  const bNameFiltered = _.uniq(filteredHotel.map((data) => data.b_name));
  const sNameFiltered = _.uniq(filteredHotel.map((data) => data.slug));
  const vNameFiltered = _.uniq(filteredHotel.map((data) => data.vb_name));
  console.log(typeof bNameFiltered);

  return (
    <div className="App">
      <h1>Hotel data displayed</h1>
      <div className="options-row">
        <Select
          placeholder="b_name"
          isMulti
          value={optionBName}
          name="filters"
          options={bNameFiltered.map((item) => {
            return {
              value: item,
              label: item
            };
          })}
          onChange={(data) => setOptionBname(data)}
        />
        <Select
          placeholder="slug"
          isMulti
          value={optionSlugName}
          name="filters"
          options={sNameFiltered.map((item) => {
            return {
              value: item,
              label: item
            };
          })}
          onChange={(data) => setOptionSlugname(data)}
        />
        <Select
          placeholder="vb_name"
          isMulti
          value={optionVName}
          name="filters"
          options={vNameFiltered.map((item) => {
            return {
              value: item,
              label: item
            };
          })}
          onChange={(data) => setOptionVname(data)}
        />
      </div>
      <table>
        <tr className="table-data">
          <th>b_name</th>
          <th>slug</th>
          <th>vb_name</th>
        </tr>
      </table>

      {_.uniq(
        filteredHotel?.map((item) => {
          return (
            <div className="table-data">
              <td> {item.b_name} </td>
              <td> {item?.slug} </td>
              <td>{item?.vb_name} </td>
            </div>
          );
        })
      )}
    </div>
  );
}
