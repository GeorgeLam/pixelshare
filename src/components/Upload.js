import React, { useState, useEffect, useContext, useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";
import Layout from "../Layout";
import Uploader from "./Uploader";

const Upload = () => {
  return (
    <Layout>
      <div>
        <div className="container mt-3">
          <div className="">
            <Uploader />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
