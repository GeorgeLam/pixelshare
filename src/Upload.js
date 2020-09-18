import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  console.log("up");
  const data = { hello: "here it is" };
  const [file, setFile] = useState();

  const upload = async (e) => {
    e.preventDefault();
    console.log("file uploading...");
    console.log(e.target);
    console.log(e.target.files);
    console.log(e.target.files[0].type.slice(0, 5));
    if (e.target.files[0].type.slice(0, 5) !== "image") {
      alert("Unacceptable file");
      e.target.files[0] = null;
    }
    setFile(e.target.files[0]);

    axios
      .post("http://localhost:5000/api", e.target.files[0])
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("uppp");
    console.log(file);

    var data = new FormData();
    data.append("imageUpload", file);

    axios
      .post("http://localhost:5000/api", data, {
        headers: {
          encType: "multipart/form-data",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => console.log(response.data))

      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form
              method="post"
              action="http://localhost:5000/api"
              encType="multipart/form-data"
              id="#"
              onSubmit={handleUpload}
            >
              <div className="form-group files">
                <label onClick={upload}>Upload Your File </label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  multiple=""
                  onChange={upload}
                  accept=".jpg, .jpeg, .png"
                ></input>
              </div>
              <button className="btn btn-success">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
