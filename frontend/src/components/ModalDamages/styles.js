import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  display: flex;
  align-items: center !important;
  justify-content: center !important;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between !important;
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center !important;
  justify-content: center !important;
`

export const InitContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center !important;
  justify-content: center !important;
  margin-top: 25px;

  input {
    color: #6f0000;
    width: 60px;
    height: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    margin: 2px;
    border-radius: 4px;

    border: 0;
    -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  }
`

export const InitBoardContainer = styled.div`
  align-items: center !important;
  justify-content: center !important;

  max-height: 400px;
  overflow: auto;
`

export const InitUser = styled.input`
  color: #6f0000;
  width: 350px !important;
  height: 28px !important;
  text-align: center;
  font-weight: 500 !important;
  font-size: 14px !important;
  margin: 2px;
  border-radius: 4px;

  border: 0;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
`

export const InitValue = styled.input`
  color: #6f0000;
  width: 50px !important;
  height: 28px !important;
  text-align: center;
  font-weight: 500 !important;
  font-size: 14px !important;
  margin: 2px;
  border-radius: 4px;

  border: 0;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
`
export const Button = styled.button`
  color: #6f0000;
  width: 90px;
  height: 40px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  margin-right: 8px;
  margin-left: 8px;
  border-radius: 4px;
  border: 0;
  margin-top: 20px;

  &:hover {
    background: ${darken(0.1, '#200122')};
    color: #fff;

    -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
  }

  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
`
