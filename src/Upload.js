import React, { useState, useEffect, useContext, useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";
import Layout from "./Layout";
import Uploader from "./components/Uploader";

const Upload = () => {
  return (
    <Layout pageTitle="Upload">
      <div>
        <div className="container mt-5 pt-1">
          <div className="">
            <Uploader />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
