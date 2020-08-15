import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;

  ul {
    li {
      display: flex;
      flex-direction: row;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
          display: flex;
          justify-content: center;
          align-items: center;
          justify-items: center;
          width: 50px;
          height: 30px;
          margin-top: 3px;
          border: 0;
          -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
          -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
        }

        > label {
          margin-left: 10px !important;
        }
      }
    }
  }
`
export const InputLarge = styled.input`
  color: #6f0000;
  width: 280px !important;
  height: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  margin: 5px;

  border: 0;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
`

export const InputMed = styled.input`
  color: #6f0000;
  width: 100px !important;
  height: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  margin: 5px;

  border: 0;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
`

export const InputShort = styled.input`
  color: #6f0000;
  width: 75px !important;
  height: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  margin: 5px;

  border: 0;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
`
