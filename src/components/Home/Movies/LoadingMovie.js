import React from "react";
import styled from "styled-components";

import { ClipLoader } from "react-spinners";
function LoadingMovie() {
  return (
    <Content>
      <div>
        <ClipLoader size={70} color={'white'} />
      </div>
    </Content>
  );
}
const Content = styled.div`

  z-index: 7;
  margin-right: 20px;
  position: relative;
  opacity: 0.3;
  div {

    width: 270px;
    height: 200px;
    border-radius: 20px;
    background-color: grey;
    display:flex;
    align-items:center;
    justify-content:center;
  }
`;
export default LoadingMovie;
