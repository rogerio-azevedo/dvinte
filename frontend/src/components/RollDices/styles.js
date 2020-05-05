import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 600px;

  h1 {
  }
`

export const InputMulti = styled.input`
  margin-top: 30px;
  width: 80px;
  text-align: center;
  font-size: 1.5em;
  padding: 0.5em 0;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
  border: none;
  background: #fff;
  transition: background 0.3s;
  color: $black;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
`
export const InputResult = styled.input`
  margin-top: 30px;
  width: 420px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  padding: 0.5em 0;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.12);
  border: none;
  background: #fff;
  transition: background 0.3s;
  color: $black;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  }
`

export const DiceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`

export const Dice = styled.div`
  background: #200122;
  height: 60px;
  width: 60px;
  margin: 6px;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${darken(0.1, '#8e0e00')};

    -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.5);
  }

  strong {
    color: #fff;
    font-size: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`
