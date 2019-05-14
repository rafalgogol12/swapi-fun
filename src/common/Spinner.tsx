import * as React from 'react';
import styled from 'styled-components';


export default class Spinner extends React.Component {
  render() {
    return (
      <SpinnerDiv>
        <StyledSpinner viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
          />
        </StyledSpinner>
      </SpinnerDiv>
    )
  }
}

const SpinnerDiv = styled.div`
  background-color: rgba(0,0,0,0.6);
  position: absolute;
  top: 0;
  left: 0;
  bottom:0;
  right: 0;
`;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  position: absolute;
  top:50%;
  left:50%;
  
  & .path {
    stroke: #ffffff;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
