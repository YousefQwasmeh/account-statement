import React from "react";
import axios from "axios";
const Records = () => {
  const records = [];
  axios
    .get("http://localhost:4000/api/records")
    .then(data => {
      console.log("000000000000", data, "00000000");
    })
    .catch(err => console.log(err, "1111111111111111111111111111111"));
  return (
    <div>
      <h1>im Records</h1>
    </div>
  );
};

export default Records;
