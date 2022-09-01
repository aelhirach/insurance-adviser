import styled from "styled-components";


  import Dialog from "@material-ui/core/Dialog";
  import CircularProgress from '@material-ui/core/CircularProgress';




  export const Heading = styled.h5`


  `;

  export const Content = styled.div`

  `;
  export const DialogText = styled.p`


    white-space: break-spaces;

  `;

  export const DialogFooter = styled.div`
    display: flex;
    justify-content: center;
  `;




export const CircularProgressStyle = styled(CircularProgress)`
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

export const Form = styled.form`
  width: 100%;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
`;

export const FormWrap = styled.div`
  position: relative;
  z-index: 1;

`;

export const BlockHeading = styled.h3`
  position: relative;

  &:before {
    content: "";
    left: 0;
    position: absolute;
  }
`;

export const InputFieldRow = styled.div`
  position: relative;
  display: flex;

  margin: 0 15px;
  margin-bottom: 15px;

`;

export const InputFieldCol = styled.div`
      margin: 0 15px;
      width: 50%;
      max-width: 350px;
`;

export const Label = styled.label`

  display: block;

`;

export const Input = styled.input`
  height: 30px;
  width: 100%;
  &:focus {
    border-color: black;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  &:focus {
    border-color: black;
  }
`;


export const Select = styled.select`
  width: 100%;
  height: 30px;
  -webkit-appearance: none;

  &:focus {
    border-color: black;
  }
`;

export const ErrorMessage = styled.div`
  color: red;

`;

export const RegisterFooter = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`

  cursor: pointer;
  user-select:none;
  border: 0;
  background: blue;
  color: white;
  padding: 10px 10px;
  ${props =>
           props.disabled ?
            ` opacity: 0.5;
              pointer-events: none;
              cursor: default;
              background: grey;
            `
            :
            ` opacity: 1.0;
              pointer-events: auto;
              cursor: pointer;
              background: blue;
           `};

`;

export const BlockGroup = styled.div`

`;
