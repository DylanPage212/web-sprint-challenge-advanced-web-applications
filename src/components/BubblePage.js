import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import {axiosWithAuth} from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth().get("http://localhost:5000/api/colors")
    .then(res => {
      setColorList(res.data)
      console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    })
  },[])

  return (
    <div className="container">
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
