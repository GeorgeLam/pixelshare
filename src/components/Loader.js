import React from "react";
import { Container, Row, Col } from "react-bootstrap/";
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
  return (
    <div className="my-5 text-center">
      <div className="mb-2">Loading ...</div>
      <div>
        <div className="sweet-loading">
          <ScaleLoader
            style={{ display: "block", margin: "0 auto" }}
            size={150}
            color={"#123abc"}
            loading={1}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
