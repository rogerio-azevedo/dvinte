import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const CharacterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

export const HealthContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

export const FuryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const InputHealth = styled.input`
  color: #6f0000;
  width: 80px;
  height: 36px;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  margin: 2px;
  border-radius: 4px;
  margin-right: 20px;
  border: 0;

  -webkit-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.6);
`

export const Button = styled.button`
  height: 40px;
  width: 120px;
  background: #8e0e00;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.3s;
  display: ${props => (props.loading ? 'none' : 'block')};
  margin: 0 10px;

  &:hover {
    background: ${darken(0.09, '#8e0e00')};
  }
`
