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

export const TableContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  max-height: 500px;
  overflow: auto;

  input {
    width: 60px;
    height: 30px;
    text-align: center;
  }

  button {
    height: 30px;
    width: 60px;
    background: #8e0e00;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    transition: background 0.3s;
    display: ${props => (props.loading ? 'none' : 'block')};
    margin: 0 10px;

    &:hover {
      background: ${darken(0.09, '#8e0e00')};
    }
  }
`

export const Portrait = styled.div`
  height: 35px;
  width: 35px;

  img {
    width: 100%;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
  }
`

export const MonsterContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`

export const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`

export const InputMonster = styled.input`
  height: 35px;
  width: 80px;
  border-radius: 4px;
  text-align: center;
  padding: 5px;
`

export const InputMonsterLarge = styled.input`
  height: 35px;
  width: 200px;
  border-radius: 4px;
  padding: 5px;
`

export const ButtonMonster = styled.button`
  height: 35px;
  width: 80px;
  background: #8e0e00;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  transition: background 0.3s;
  display: ${props => (props.loading ? 'none' : 'block')};
  margin-top: 16px;

  &:hover {
    background: ${darken(0.09, '#8e0e00')};
  }
`
