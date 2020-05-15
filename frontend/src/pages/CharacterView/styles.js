import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 20px;
  }
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin-top: 20px;
  border-radius: 6px;
  padding: 10px;

  -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
`

export const Portrait = styled.div`
  height: 130px;
  width: 100px;

  img {
    width: 100%;
    height: 130px;
    object-fit: cover;
    border-radius: 6%;

    background: #eee;
    -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
  }
`
export const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const NameContaniner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;

    input {
      width: 200px;
      border: 2px solid #333;
      color: #6f0000;
      font-weight: 600;
      font-size: 15px;
      text-align: center;

      border-top: 0;
      border-left: 0;
      border-right: 0;
    }

    label {
      font-size: 14px;
    }
  }
`

export const FeatureContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;

    input {
      width: 130px;
      border: 2px solid #333;
      color: #6f0000;
      font-weight: 600;
      font-size: 15px;
      text-align: center;

      border-top: 0;
      border-left: 0;
      border-right: 0;
    }

    label {
      font-size: 14px;
    }
  }
`

export const InputShort = styled.input`
  width: 90px !important;
  border: 2px solid #333;
  color: #6f0000;
  font-weight: 600;
  font-size: 15px;
  text-align: center;

  border-top: 0;
  border-left: 0;
  border-right: 0;
`
