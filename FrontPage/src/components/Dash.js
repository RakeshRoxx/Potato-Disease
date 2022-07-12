import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
const axios = require("axios").default;
function Dash() {
  const [selectedFile, setSelectedFile] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/predict",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setData(response.data);
      } else {
        // var result = "hello";
        // console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };
  if (data) {
    var confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    var result = data.class;
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 align-self-center">
          <div className="input-group">
            <div className="custom-file">
              <form onSubmit={submitForm}>
                <input
                  type="file"
                  className="btn btn-success"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={handleFileSelect}
                />
                <input type="submit" className="btn btn-info" value="Submit" />
              </form>
              {data && (
                <div className="card content">
                  <div className="container">
                    <div className="image-style">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="file not found"
                      />
                    </div>
                    <h4>
                      <b>{confidence}</b>
                    </h4>
                    <p>{result}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
