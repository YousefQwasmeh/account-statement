import React, { useState } from "react";
import "./style.css";

const UploadFile = () => {
  const [year, setYear] = useState({
    2018: "",
    "2019+2020": "",
    2021: "checked",
  });
  const [message, setMessage] = useState(
    "Drag your excel file here or click in this area."
  );

  const changeRadio = ({ target: { checked, value } }) => {
    if (checked)
      setYear({ 2021: "", "2019+2020": "", 2018: "", [value]: "checked" });
    else setYear({ 2021: "", "2019+2020": "", 2018: "", [value]: "" });
  };

  document.title = `Upload File`;
  document.body.style.background = "rgba(0, 0, 0, 0.9)";
  return (
    <>
      <form
        className='upload-form'
        action='/api/upload'
        method='post'
        encType='multipart/form-data'
      >
        <div className='upload-div'>
          <input
            type='file'
            name='excelFile'
            id='fileInput'
            accept='.xlsm'
            onChange={({ target }) => {
              setMessage(target.files[0].name);
            }}
          />
          <div className='img-message'>
            <h3>{message}</h3>
            <img
              src='https://i.imgur.com/sv7NEsJ.png'
              alt=''
              className='excel-img'
            />
          </div>
        </div>
        <div className='upload-radio-buttons'>
          <label className={"upload-radio-label "}>
            {2021}
            <input
              type='radio'
              checked={year[2021]}
              name='year'
              value={2021}
              onChange={changeRadio}
            />
            <span className={`checkmark ${year[2021] ? "checked-label" : ""}`}>
              <span className='dot'></span>
            </span>
          </label>
          <label className={"upload-radio-label "}>
            {"2019+2020"}
            <input
              type='radio'
              checked={year["2019+2020"]}
              name='year'
              value={"2019+2020"}
              onChange={changeRadio}
            />
            <span
              className={`checkmark ${
                year["2019+2020"] ? "checked-label" : ""
              }`}
            >
              <span className='dot'></span>
            </span>
          </label>
          <label className={"upload-radio-label "}>
            {2018}
            <input
              type='radio'
              checked={year[2018]}
              name='year'
              value={2018}
              onChange={changeRadio}
            />
            <span className={`checkmark ${year[2018] ? "checked-label" : ""}`}>
              <span className='dot'></span>
            </span>
          </label>
        </div>
        <button type='submit'>Upload</button>
      </form>
    </>
  );
};

export default UploadFile;
