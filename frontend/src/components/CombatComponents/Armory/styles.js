import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 180px;
  width: 100%;

  -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.6);

  h2 {
    margin-top: 20px;
  }
`

export const AttackContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 40px;

  button {
    color: #6f0000;
    width: 100px !important;
    height: 35px !important;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    border-radius: 4px;
    margin-right: 8px;
    margin-left: 8px;
    border: 0;

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
  }
`

export const WeaponContainer = styled.div`
  display: flex;
`

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -10px;

  > div {
    display: flex;
    flex-direction: row;

    > div {
      display: flex;
      flex-direction: row;

      button {
        color: #6f0000;
        width: 100px;
        height: 35px !important;
        text-align: center;
        font-weight: 600;
        font-size: 14px;
        margin-right: 8px;
        margin-left: 8px;
        border-radius: 4px;
        border: 0;

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
      }
    }
  }
`
